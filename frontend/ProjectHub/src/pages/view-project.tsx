import { useNavigate, useParams } from "@tanstack/react-router";
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

const ViewProject = () => {
	const { projectId } = useParams({ from: "/view-project/$projectId" });
	const navigate = useNavigate();
	const hasShownInvalidToast = useRef(false);
	const [isEditing, setIsEditing] = useState(false);

	const numericId = Number(projectId);
	const isInvalidId = isNaN(numericId) || numericId <= 0;

	if (isInvalidId) {
		if (!hasShownInvalidToast.current) {
			toast.error("Invalid project id", {
				duration: 4000,
				style: {
					background: "#fee2e2",
					color: "#991b1b",
					border: "1px solid #f87171",
				},
			});
			hasShownInvalidToast.current = true;
		}
		navigate({ to: "/dashboard" });
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
							: InitialStatus.Planning, // "Planning"
						priorityLevel: Object.values(PriorityLevel).includes(
							data.priorityLevel as PriorityLevel
						)
							? data.priorityLevel
							: PriorityLevel.Low, //"Low"
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
					navigate({ to: "/dashboard" });
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
				navigate({ to: "/dashboard" });
			},
			onError: () => toast.error("Failed to delete project"),
		});
	};

	if (isLoading) return <Loading />;
	if (isError || !data)
		return (
			<p className='flex justify-center items-center h-screen text-gray-500'>
				Failed to load project.
			</p>
		);

	return (
		<div>
			<Header headerText='View Project' />
			<div className='w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 lg:my-6 py-6 shadow rounded-xl mt-10 bg-white'>
				<ProjectInformation
					projectDescription='View, edit and delete project information.'
					deleteDialog={
						<div>
							<Button
								type='button'
								onClick={() => setIsEditing((prev) => !prev)}
								className={`group px-3 py-1 mr-2 ${
									isEditing
										? "bg-yellow-200 hover:bg-yellow-600"
										: "bg-gray-50 hover:bg-yellow-500"
								}`}
							>
								<Pencil
									className={`w-4 h-4 transition-colors ${
										isEditing
											? "text-yellow-600 group-hover:text-white"
											: "text-yellow-500 group-hover:text-white"
									}`}
								/>
							</Button>
							<ConfirmDialog
								triggerLabel='Delete'
								triggerIcon={
									<Trash2 className='w-4 h-4 transition-colors text-red-500 group-hover:text-white' />
								}
								triggerVariant='destructive'
								className='group bg-gray-100/50 text-red-500 ml-2'
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
					<Form className='grid gap-4'>
						<BasicInfo disabled={!isEditing} />
						<FinancialTimeline disabled={!isEditing} />
						<StatusProgress disabled={!isEditing} />
						<FormActions />
					</Form>
				</Formik>
			</div>
		</div>
	);
};

export default ViewProject;
