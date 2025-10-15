export type ProjectFilters = {
	term: string;
	status: string;
	priority: string;
	sortBy: string;
	sortOrder: "asc" | "desc";
};

export const defaultProjectFilters: ProjectFilters = {
	term: "",
	status: "All Status",
	priority: "All Priority",
	sortBy: "createdAt",
	sortOrder: "desc",
};
