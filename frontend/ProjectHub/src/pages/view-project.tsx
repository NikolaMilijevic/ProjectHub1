import { useNavigate } from "@tanstack/react-router";
import { Formik, Form, type FormikHelpers } from "formik";

import Header from "@/components/new-project-form/header";
import ProjectInformation from "@/components/new-project-form/project-information";
import BasicInfo from "@/components/new-project-form/basic-info";
import FinancialTimeline from "@/components/new-project-form/financial-timeline";
import StatusProgress from "@/components/new-project-form/status-progress";
import FormActions from "@/components/new-project-form/form-actions";

import { validationSchema } from "@/types/validation-schema";
import type { ProjectDto, ProjectUpdateDto } from "@/types/project";

import {
	useDeleteProject,
	useUpdateProject,
	useProjectById,
} from "@/api/querys/useCreateProject";
import Loading from "@/components/dashboard/view-projects/loading";
import ConfirmDialog from "@/components/new-project-form/confirm-dialog";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useState, useRef, useMemo } from "react";
import { Button } from "../components/ui/button";
import { InitialStatus, PriorityLevel } from "@/types/enums";
import { motion } from "framer-motion";
import { dashboardRoute, viewProjectRoute } from "@/App";

const ViewProject = () => {
	const { projectId } = viewProjectRoute.useParams();
	const navigate = useNavigate();
	const hasShownInvalidToast = useRef(false);
	const [isEditing, setIsEditing] = useState(false);
	const search = viewProjectRoute.useSearch();
	const page = search.page ?? 1;

	const numericId = Number(projectId);
	const isInvalidId = isNaN(numericId) || numericId <= 0;

	if (isInvalidId) {
		if (!hasShownInvalidToast.current) {
			toast.error("Invalid project id", {
				duration: 4000,
				style: {
					background: "var(--destructive-bg, #fee2e2)",
					color: "var(--destructive-foreground, #991b1b)",
					border: "1px solid var(--destructive-border, #f87171)",
				},
			});
			hasShownInvalidToast.current = true;
		}
		navigate({ to: dashboardRoute.to, search: { page } });

		return null;
	}

	const { data, isLoading, isError } = useProjectById(numericId);
	const { mutate: updateProject } = useUpdateProject();
	const { mutate: deleteProject } = useDeleteProject();

	const initialValues = useMemo<ProjectDto>(
		() =>
			data
				? {
						id: data.id,
						title: data.title ?? "",
						clientId: data.clientId ?? 0,
						clientName: data.clientName ?? "",
						description: data.description ?? "",
						budget: data.budget ?? 0,
						initialStatus: Object.values(InitialStatus).includes(
							data.initialStatus as InitialStatus
						)
							? data.initialStatus
							: InitialStatus.Planning,
						priorityLevel: Object.values(PriorityLevel).includes(
							data.priorityLevel as PriorityLevel
						)
							? data.priorityLevel
							: PriorityLevel.Low,
						startDate: data.startDate.split("T")[0],
						dueDate: data.dueDate.split("T")[0],
						progress: data.progress ?? 0,
						createdAt: data.createdAt ?? new Date().toISOString(),
						updatedAt: data.updatedAt ?? new Date().toISOString(),
				  }
				: {
						id: 0,
						title: "",
						clientId: 0,
						clientName: "",
						description: "",
						budget: 0,
						initialStatus: InitialStatus.Planning,
						priorityLevel: PriorityLevel.Low,
						startDate: new Date().toISOString().split("T")[0],
						dueDate: new Date().toISOString().split("T")[0],
						progress: 0,
						createdAt: new Date().toISOString(),
						updatedAt: new Date().toISOString(),
				  },
		[data]
	);

	const handleSubmit = (
		values: ProjectDto,
		{ setSubmitting }: FormikHelpers<ProjectDto>
	) => {
		if (!data) return;

		const updated: ProjectUpdateDto = {
			title: values.title,
			description: values.description,
			budget: values.budget,
			startDate: values.startDate,
			dueDate: values.dueDate,
			initialStatus:
				InitialStatus[values.initialStatus as keyof typeof InitialStatus],
			priorityLevel:
				PriorityLevel[values.priorityLevel as keyof typeof PriorityLevel],
			progress: values.progress,
			clientName: values.clientName,
		};

		updateProject(
			{ id: values.id.toString(), dto: updated },
			{
				onSuccess: () => {
					toast.success("Project successfully updated!");
					navigate({ to: dashboardRoute.to, search: { page } });

				},
				onError: () => {
					toast.error("Failed to update project!");
				},
				onSettled: () => setSubmitting(false),
			}
		);
	};

	const handleDelete = () => {
		if (!data) return;
		deleteProject(data.id.toString(), {
			onSuccess: () => {
				toast.success("Project deleted successfully");
				navigate({ to: dashboardRoute.to, search: { page } });

			},
			onError: () => toast.error("Failed to delete project"),
		});
	};

	if (isLoading) return <Loading />;
	if (isError || !data)
		return (
			<p className='flex justify-center items-center h-screen text-muted-foreground'>
				Failed to load project.
			</p>
		);

	return (
		<div className='min-h-screen relative bg-[var(--background)] text-[var(--foreground)] transition-colors'>
			{/* Header */}
			<Header headerText='View Project' />

			{/* Background Glow */}
			<div className='absolute inset-x-0 top-17 bottom-0 pointer-events-none overflow-hidden z-0'>
				<div
					className='absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] rounded-3xl
          bg-gradient-to-br from-purple-500 via-purple-200/20 to-transparent
          opacity-20 blur-3xl dark:from-purple-800 dark:via-transparent'
				/>
				<div
					className='absolute bottom-0 right-1/2 translate-x-1/2 w-[120%] h-[120%] rounded-3xl
          bg-gradient-to-tl from-pink-400 via-pink-200/20 to-transparent
          opacity-15 blur-3xl dark:from-pink-900 dark:via-transparent'
				/>
			</div>

			{/* Main Card */}
			<div className='relative z-10 flex justify-center px-4 mt-6'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='w-full max-w-4xl p-8 bg-[var(--background)]/60 dark:bg-neutral-900/50 border border-[var(--border)] backdrop-blur-lg rounded-2xl shadow-xl transition-colors'
				>
					<ProjectInformation
						projectDescription='View, edit and delete project information.'
						deleteDialog={
							<div className='flex'>
								<Button
									type='button'
									onClick={() => setIsEditing((prev) => !prev)}
									className={`group px-3 py-1 mr-2 cursor-pointer ${
										isEditing
											? "bg-yellow-200 hover:bg-yellow-500 dark:bg-yellow-600 dark:hover:bg-yellow-500"
											: "bg-gray-50 hover:bg-yellow-500 dark:bg-gray-700 dark:hover:bg-yellow-500"
									}`}
								>
									<Pencil
										className={`w-4 h-4 transition-colors ${
											isEditing
												? "text-yellow-600 group-hover:text-white dark:text-yellow-300"
												: "text-yellow-500 group-hover:text-white dark:text-yellow-300"
										}`}
									/>
								</Button>
								<ConfirmDialog
									triggerLabel='Delete'
									triggerIcon={
										<Trash2 className='w-4 h-4 transition-colors text-red-500 group-hover:text-white dark:text-red-400 dark:group-hover:text-white' />
									}
									triggerVariant='destructive'
									className='group bg-gray-100/50 dark:bg-gray-700 text-red-500 ml-2 dark:hover:bg-red-500 cursor-pointer'
									title='Are you sure?'
									description='This action cannot be undone. This will permanently delete the project.'
									onConfirm={handleDelete}
								/>
							</div>
						}
					/>

					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
						enableReinitialize
					>
						<Form className='grid gap-4 mt-6'>
							<BasicInfo disabled={!isEditing} />
							<FinancialTimeline disabled={!isEditing} />
							<StatusProgress disabled={!isEditing} />
							<FormActions />
						</Form>
					</Formik>
				</motion.div>
			</div>
		</div>
	);
};

export default ViewProject;
