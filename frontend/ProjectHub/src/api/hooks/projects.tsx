import axiosInstance from "../axiosInstance";
import type {
	ProjectCreateDto,
	ProjectDto,
	ProjectQueryDto,
	ProjectPagedResponse,
	ProjectUpdateDto,
} from "@/types/project";

export async function createProject(
	dto: ProjectCreateDto
): Promise<ProjectDto> {
	try {
		const res = await axiosInstance.post("/projects", dto);
		return res.data;
	} catch (error: any) {
		const message = error.response?.data?.message || "Failed to create project";
		throw new Error(message);
	}
}

export async function fetchProjects(
	filters: Record<string, any>
): Promise<ProjectDto[]> {
	try {
		const res = await axiosInstance.get("/projects", filters);
		return res.data;
	} catch (error: any) {
		const message = error.response?.data?.message || "Failed to fetch projects";
		throw new Error(message);
	}
}

export async function getProjectsPaged(
	query: ProjectQueryDto
): Promise<ProjectPagedResponse> {
	try {
		const res = await axiosInstance.get("/projects/paged", { params: query });
		return res.data;
	} catch (error: any) {
		const message = error.response?.data?.message || "Failed to fetch projects";
		throw new Error(message);
	}
}

export async function getProjectById(id: number | string): Promise<ProjectDto> {
	try {
		const res = await axiosInstance.get(`/projects/${id}`);
		return res.data;
	} catch (error: any) {
		const message = error.response?.data?.message || "Failed to fetch projects";
		throw new Error(message);
	}
}

export async function deleteProject(id: string): Promise<void> {
	try {
		await axiosInstance.delete(`/projects/${id}`);
	} catch (error: any) {
		const message = error.response?.data?.message || "Failed to delete project";
		throw new Error(message);
	}
}

export async function updateProject(
	id: string,
	dto: ProjectUpdateDto
): Promise<ProjectDto> {
	try {
		const res = await axiosInstance.put(`/projects/${id}`, dto);
		return res.data;
	} catch (error: any) {
		const message = error.response?.data?.message || "Failed to update project";
		throw new Error(message);
	}
}
