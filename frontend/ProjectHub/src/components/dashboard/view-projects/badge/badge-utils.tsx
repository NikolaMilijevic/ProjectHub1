interface BadgeInfo {
	className: string;
	label: string;
}

export const getBadgeClass = (
	type: "status" | "priority",
	value: string
): BadgeInfo => {
	const statusMap: Record<string, BadgeInfo> = {
		planning: {
			className: "bg-yellow-300 text-yellow-700 mr-3 rounded-2xl",
			label: "Planning",
		},
		inProgress: {
			className: "bg-blue-300 text-blue-700 mr-3 rounded-2xl",
			label: "In Progress",
		},
		completed: {
			className: "bg-green-300 text-green-700 mr-3 rounded-2xl",
			label: "Completed",
		},
	};

	const priorityMap: Record<string, BadgeInfo> = {
		low: { className: "bg-green-300 text-green-700 rounded-2xl", label: "Low" },
		medium: {
			className: "bg-orange-300 text-orange-700 rounded-2xl",
			label: "Medium",
		},
		high: { className: "bg-red-300 text-red-700 rounded-2xl", label: "High" },
	};

	if (type === "status") {
		return statusMap[value] ?? { className: "", label: value };
	}
	return priorityMap[value] ?? { className: "", label: value };
};
