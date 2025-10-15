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
		<div>
			<Header />
			<div className='w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 lg:my-6 py-6 shadow rounded-xl mt-10 bg-white'>
				<ProjectInformation />
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
					validateOnMount={true}
				>
					<Form className='grid gap-4'>
						<BasicInfo />
						<FinancialTimeline />
						<StatusProgress />
						<FormActions />
					</Form>
				</Formik>
			</div>
		</div>
	);
};

export default CreateProject;
