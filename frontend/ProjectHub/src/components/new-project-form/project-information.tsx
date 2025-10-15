import type { ReactNode } from "react";
import violetPlus from "../../assets/violet-plus.svg";

interface ProjectInformationProps {
	projectDescription?: string;
	deleteDialog?: ReactNode;
}

const ProjectInformation = ({
	projectDescription = "Fill in the details for your new project",
	deleteDialog,
}: ProjectInformationProps) => {
	return (
		<div className='flex justify-between items-center'>
			<div className='flex items-center gap-4 mb-6'>
				<img
					src={violetPlus}
					alt='violet-plus'
					className='w-15 h-15 object-cover rounded-lg shadow'
				/>
				<div>
					<p className='text-xl font-bold'>Project Information</p>
					<p className='text-sm text-gray-500 mt-2 mb-4'>
						{projectDescription}
					</p>
				</div>
			</div>
			<div>{deleteDialog && <div>{deleteDialog}</div>}</div>
		</div>
	);
};

export default ProjectInformation;
