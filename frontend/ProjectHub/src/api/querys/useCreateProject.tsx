import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createProject,
	deleteProject,
	getProjectById,
	getProjectsPaged,
	updateProject,
} from "../hooks/projects";
import type {
	NormalizedPagedResponse,
	ProjectCreateDto,
	ProjectDto,
	ProjectPagedResponse,
	ProjectQueryDto,
	ProjectUpdateDto,
} from "../../types/project";
import { getDashboardStats, type DashboardStats } from "../dashboardApi";

export function useCreateProject(currentQuery?: ProjectQueryDto) {
	const queryClient = useQueryClient();

	return useMutation<ProjectDto, Error, ProjectCreateDto>({
		mutationFn: createProject,
		onSuccess: (newProject) => {
			// Invalidate all paged project queries to refetch with current filters
			queryClient.invalidateQueries({ queryKey: ["projects"], exact: false });

			// Optionally, update the currently cached page to include the new project at the top
			const cachedData = queryClient.getQueryData<NormalizedPagedResponse>([
				"projects",
				currentQuery,
			]);
			if (cachedData) {
				queryClient.setQueryData(["projects", currentQuery], {
					...cachedData,
					items: [newProject, ...cachedData.items],
					totalItems: cachedData.totalItems + 1,
				});
			}
		},
	});
}

export function useProjectsPaged(query: ProjectQueryDto) {
	return useQuery<ProjectPagedResponse, Error>({
		queryKey: ["projects", query],
		queryFn: () => getProjectsPaged(query),
		// keepPreviousData: true, // smooth pagination
	});
}

export function useProjectById(id: string | number, enabled: boolean = true) {
	return useQuery<ProjectDto, Error>({
		queryKey: ["projects", id],
		queryFn: () => getProjectById(id),
		enabled,
		staleTime: 1000 * 60,
		retry: 1,
	});
}

export function useDeleteProject() {
	const queryClient = useQueryClient();

	return useMutation<void, Error, string>({
		mutationFn: deleteProject,
		onSuccess: (_, deletedProjectId) => {
			// Invalidate all project queries to reflect deletion
			queryClient.invalidateQueries({ queryKey: ["projects"], exact: false });

			// Remove the deleted project from cached pages immediately
			const cachedData = queryClient.getQueryData<any>(["projects"]);
			if (cachedData?.items) {
				queryClient.setQueryData(["projects"], {
					...cachedData,
					items: cachedData.items.filter((p: any) => p.id !== deletedProjectId),
					totalItems: cachedData.totalItems - 1,
				});
			}
		},
	});
}

export function useUpdateProject() {
	const queryClient = useQueryClient();

	return useMutation<ProjectDto, Error, { id: string; dto: ProjectUpdateDto }>({
		mutationFn: ({ id, dto }) => updateProject(id, dto),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"], exact: false });
		},
	});
}

export function useDashboardStats() {
	return useQuery<DashboardStats, Error>({
		queryKey: ["dashboardStats"],
		queryFn: getDashboardStats,
		retry: 1,
		staleTime: 1000 * 60,
	});
}
