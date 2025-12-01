import type { ProjectDto } from "@/types/project";
import ProjectCard from "./project-card";

interface ProjectListProps {
	projects: ProjectDto[];
	view: "grid" | "list";
}

const ProjectList = ({ projects, view }: ProjectListProps) => {
	if (projects.length === 0) {
		return (
			<p className='text-gray-400 text-center max-w-md mx-auto mt-20'>
				No projects yet
			</p>
		);
	}

	const containerClass =
		view === "grid"
			? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
			: "flex flex-col gap-4 mt-4";

	return (
		<div className='w-full max-w-6xl mx-auto p-4'>
			<div className={containerClass}>
				{projects.map((project: ProjectDto) => (
					<ProjectCard
						key={project.id}
						project={project}
					/>
				))}
			</div>
		</div>
	);
};

export default ProjectList;
