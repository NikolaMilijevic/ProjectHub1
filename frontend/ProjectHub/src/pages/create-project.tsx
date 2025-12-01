import BasicInfo from "@/components/new-project-form/basic-info";
import FinancialTimeline from "@/components/new-project-form/financial-timeline";
import FormActions from "@/components/new-project-form/form-actions";
import Header from "@/components/new-project-form/header";
import ProjectInformation from "@/components/new-project-form/project-information";
import StatusProgress from "@/components/new-project-form/status-progress";

import { validationSchema } from "@/types/validation-schema";
import { Form, Formik } from "formik";
import { initialValues, type ProjectCreateDto } from "@/types/project";
import { useCreateProject } from "@/api/querys/useCreateProject";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const CreateProject = () => {
	const { mutate } = useCreateProject();
	const navigate = useNavigate();

	const handleSubmit = (
		values: ProjectCreateDto,
		{
			setSubmitting,
			resetForm,
		}: { setSubmitting: (v: boolean) => void; resetForm: () => void }
	) => {
		try {
			const payload: ProjectCreateDto = {
				...values,
				startDate: values.startDate?.split("T")[0] ?? "",
				dueDate: values.dueDate
					? new Date(values.dueDate).toISOString().split("T")[0]
					: "",
			};

			mutate(payload, {
				onSuccess: () => {
					toast.success("Project created successfully!");
					navigate({ to: "/dashboard" });
					resetForm();
				},
				onError: (error: any) => {
					console.error("Create Project Error:", error);
					toast.error(
						error?.response?.data?.message ||
							"Failed to create project. Please try again."
					);
				},
			});
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className='min-h-screen relative bg-[var(--background)] text-[var(--foreground)] transition-colors'>
			{/* Header */}
			<Header headerText='Create New Project' />

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
					<ProjectInformation projectDescription='Fill in the project details to create a new project.' />

					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
						validateOnMount
					>
						<Form className='grid gap-4 mt-6'>
							<BasicInfo />
							<FinancialTimeline />
							<StatusProgress />
							<FormActions />
						</Form>
					</Formik>
				</motion.div>
			</div>
		</div>
	);
};

export default CreateProject;
