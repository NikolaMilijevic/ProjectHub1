import { useRouter } from "@tanstack/react-router";
import { useFormikContext } from "formik";
import type { ProjectCreateDto } from "@/types/project";
import ConfirmDialog from "./confirm-dialog";
import { Button } from "../../components/ui/button";

const FormActions = () => {
	const { isSubmitting, dirty, resetForm, values } =
		useFormikContext<ProjectCreateDto>();
	const router = useRouter();

	const handleCancel = () => {
		resetForm();
		router.navigate({ to: "/dashboard" });
	};

	const isEditMode = Boolean(values.id);

	return (
		<div className='grid grid-cols-[150px_1fr] gap-2 border-t-1 pt-10'>
			<ConfirmDialog
				triggerLabel='Cancel'
				triggerVariant='outline'
				className='bg-white-300 text-black-200 cursor-pointer'
				title={isEditMode ? "Discard Changes?" : "Cancel New Project?"}
				description={
					isEditMode
						? "Are you sure you want to discard your edits? Any unsaved changes will be lost."
						: "Are you sure you want to cancel creating this project? Your input will be lost."
				}
				onConfirm={handleCancel}
				disabled={!dirty || isSubmitting}
			/>
			<Button
				type='submit'
				className='bg-violet-400 hover:bg-violet-500 cursor-pointer'
				disabled={isSubmitting || (isEditMode && !dirty)}
			>
				{isSubmitting
					? isEditMode
						? "Updating..."
						: "Creating..."
					: isEditMode
					? "Update Project"
					: "+ Create Project"}
			</Button>
		</div>
	);
};

export default FormActions;
