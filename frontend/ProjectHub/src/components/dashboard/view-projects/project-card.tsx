import { User, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import BadgeList from "./badge/badge-list";
import { formatDate } from "./date-utils";
import type { ProjectDto } from "@/types/project";
import { Link } from "@tanstack/react-router";
import { viewProjectRoute } from "@/App";

interface ProjectCardProps {
	project: ProjectDto;
}

const ProjectCard = ({ project }: ProjectCardProps) => (
	<Link
		to={viewProjectRoute.to}
		params={{ projectId: project.id }}
		className='hover:bg-violet-50 hover:shadow-lg hover:scale-[1.01] transition duration-200 ease-in-out transform'
	>
		<div className='border-l-4 border-l-violet-500/20 rounded-lg shadow p-4 min-h-70 flex flex-col justify-between'>
			<div className='flex justify-between'>
				<p className='text-base sm:text-lg font-bold'>{project.title}</p>
			</div>

			<p className='text-xs sm:text-sm text-gray-400'>{project.description}</p>

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

				<div className='mt-5 flex justify-between text-sm text-gray-400'>
					<div className='flex items-center'>
						<Calendar className='w-4 h-4 text-green-600 mr-1' />
						<p className='font-bold mr-1'>Created</p>
						<p>{formatDate(project.createdAt, true)}</p>
					</div>
					<div className='flex items-center'>
						<Calendar className='w-4 h-4 text-violet-600 mr-1' />
						<p className='font-bold mr-1'>Modified</p>
						<p>{formatDate(project.updatedAt)}</p>
					</div>
				</div>
			</div>
		</div>
	</Link>
);

export default ProjectCard;
