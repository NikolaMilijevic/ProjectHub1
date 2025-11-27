import axiosInstance from "./axiosInstance";

export interface DashboardStats {
	totalUsers: number;
	totalProjects: number;
	totalVisitors: number;
	users: {
		id: string,
		firstName: string;
		lastName: string;
		email: string;
		role: string;
	}[];
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
	try {
		const res = await axiosInstance.get("/dashboard/stats");
		return res.data;
	} catch (error: any) {
		const message =
			error.response?.data?.message || "Failed to fetch dashboard statistics";
		throw new Error(message);
	}
};
