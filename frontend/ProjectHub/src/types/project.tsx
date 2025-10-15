// Enums (should match backend enums)
export type PriorityLevel = "Low" | "Medium" | "High";
export type InitialStatus = "Planning" | "InProgress" | "Completed";

// DTO for creating a project
export interface ProjectCreateDto {
	id?: string;
	title: string;
	description: string;
	budget: number;
	startDate: string; // ISO date string
	dueDate: string; // ISO date string
	initialStatus: InitialStatus;
	priorityLevel: PriorityLevel;
	progress: number;
	//   clientId?: number | null;   // if selecting existing client
	clientName?: string; // if creating by client name
}

// DTO returned by backend
export interface ProjectDto {
	id: number;
	title: string;
	description: string;
	budget: number;
	startDate: string;
	dueDate: string;
	initialStatus: InitialStatus;
	priorityLevel: PriorityLevel;
	clientId: number;
	clientName: string;
	createdAt: string;
	updatedAt: string;
	progress: number;
}

export const initialValues: ProjectCreateDto = {
	title: "",
	description: "",
	clientName: "",
	budget: 0,
	startDate: "",
	dueDate: "",
	initialStatus: "Planning",
	priorityLevel: "Low",
	progress: 0,
};

export interface ProjectQueryDto {
	pageNumber: number;
	pageSize: number;
	search?: string;
	priority?: number;
	initialStatus?: number;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
}

export interface ProjectPagedResponse {
	totalCount: number;
	pageNumber: number;
	pageSize: number;
	items: ProjectDto[];
}

export interface NormalizedPagedResponse {
	items: ProjectDto[];
	totalItems: number;
	pageNumber: number;
	totalPages: number;
}

export interface ProjectUpdateDto {
	title: string;
	description: string;
	budget: number;
	startDate: string; // ISO string (e.g. new Date().toISOString())
	dueDate: string; // ISO string
	initialStatus: InitialStatus; // enum/int from backend
	priorityLevel: PriorityLevel; // enum/int from backend
	progress: number; // percentage 0-100
	clientName: string; // backend resolves to ClientId
}
