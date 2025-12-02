import { User, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import BadgeList from "./badge/badge-list";
import { formatDate } from "./date-utils";
import type { ProjectDto } from "@/types/project";
import { Link } from "@tanstack/react-router";
import { dashboardRoute, viewProjectRoute } from "@/App";

interface ProjectCardProps {
	project: ProjectDto;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
	const search = dashboardRoute.useSearch();
	return (
		<Link
			to={viewProjectRoute.to}
			params={{ projectId: project.id }}
			search={{ ...search }}
			className='transition duration-200 ease-in-out transform'
		>
			<div
				className='border border-gray-200/30 dark:border-gray-700/30
			border-l-4 rounded-xl shadow p-4 min-h-70 flex flex-col justify-between
			border-l-violet-500/20 dark:border-l-violet-400/40
			bg-white dark:bg-neutral-800/30
			hover:bg-violet-50 dark:hover:bg-violet-900/30
			hover:shadow-lg hover:scale-[1.01]
			transition duration-200 ease-in-out'
			>
				<div className='flex justify-between'>
					<p className='text-base sm:text-lg font-bold'>{project.title}</p>
				</div>

				<p className='text-xs sm:text-sm text-gray-400'>
					{project.description}
				</p>

				<div className='mt-auto'>
					<div className='text-sm text-gray-400 mb-0 mt-0 flex items-center min-h-12'>
						<User className='w-4 h-4 mr-1' />
						{project.clientName || "No client."}
					</div>

					<div className='flex justify-between'>
						<p className='text-gray-400'>Progress</p>
						<p className='text-violet-600'>{project.progress}%</p>
					</div>
					<Progress
						className='bg-gray-100'
						progressColor='bg-violet-600'
						value={project.progress}
					/>

					<BadgeList
						status={project.initialStatus}
						priority={project.priorityLevel}
					/>

					<div className='flex flex-col sm:flex-row justify-between mt-5 text-sm text-gray-400 gap-2'>
						<div className='flex items-center gap-1'>
							<Calendar className='w-4 h-4 text-green-600' />
							<p className='font-bold'>Created</p>
							<p className='truncate max-w-[120px]'>
								{formatDate(project.createdAt, true)}
							</p>
						</div>
						<div className='flex items-center gap-1'>
							<Calendar className='w-4 h-4 text-violet-600' />
							<p className='font-bold'>Modified</p>
							<p className='truncate max-w-[120px]'>
								{formatDate(project.updatedAt)}
							</p>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default ProjectCard;
