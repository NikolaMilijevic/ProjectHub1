export const InitialStatus = {
	Planning: "Planning",
	InProgress: "InProgress",
	Completed: "Completed",
} as const;

export const PriorityLevel = {
	Low: "Low",
	Medium: "Medium",
	High: "High",
} as const;

export type InitialStatus = (typeof InitialStatus)[keyof typeof InitialStatus];
export type PriorityLevel = (typeof PriorityLevel)[keyof typeof PriorityLevel];

export const InitialStatusMap: Record<string, number> = {
	Planning: 0,
	InProgress: 1,
	Completed: 2,
};

export const PriorityLevelMap: Record<string, number> = {
	Low: 0,
	Medium: 1,
	High: 2,
};

// ProjectsContainer.tsx

export const STATUS_MAP: Record<string, number | undefined> = {
	Planning: 0,
	InProgress: 1,
	Completed: 2,
	"All Status": undefined,
};

export const PRIORITY_MAP: Record<string, number | undefined> = {
	Low: 0,
	Medium: 1,
	High: 2,
	"All Priority": undefined,
};
