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
      className="transition-transform duration-200 ease-in-out hover:scale-[1.01]"
    >
      <div
        className="
          border border-gray-200/30 dark:border-gray-700/30
          border-l-4 rounded-xl shadow p-4 flex flex-col justify-between
          min-h-70
          border-l-violet-500/20 dark:border-l-violet-400/40
          bg-white dark:bg-neutral-800/30
          hover:bg-violet-50 dark:hover:bg-violet-900/30
          hover:shadow-lg
          transition-colors duration-200 ease-in-out
        "
      >
        {/* Title */}
        <p className="text-base sm:text-lg font-bold truncate">{project.title}</p>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-400 mt-1 truncate">{project.description}</p>

        {/* Client */}
        <div className="mt-2 flex items-center text-sm text-gray-400 gap-1 min-w-0">
          <User className="w-4 h-4 flex-shrink-0" />
          <p className="truncate">{project.clientName || "No client."}</p>
        </div>

        {/* Progress */}
        <div className="mt-3">
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>Progress</span>
            <span className="text-violet-600">{project.progress}%</span>
          </div>
          <Progress
            className="bg-gray-100"
            progressColor="bg-violet-600"
            value={project.progress}
          />
        </div>

        {/* Badges */}
        <div className="mt-2">
          <BadgeList status={project.initialStatus} priority={project.priorityLevel} />
        </div>

        {/* Created / Modified Dates */}
        <div className="mt-4 flex flex-col sm:flex-row sm:justify-between gap-2 text-sm text-gray-400">
          {/* Created */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-green-600 flex-shrink-0" />
              <p className="font-bold flex-shrink-0">Created</p>
            </div>
            <p>{formatDate(project.createdAt, true)}</p>
          </div>

          {/* Modified */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-violet-600 flex-shrink-0" />
              <p className="font-bold flex-shrink-0">Modified</p>
            </div>
            <p>{formatDate(project.updatedAt)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
