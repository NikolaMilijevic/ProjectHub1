import axiosInstance from "./axiosInstance";

export interface DashboardStats {
	totalUsers: number;
	totalProjects: number;
	totalVisitors: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
	const res = await axiosInstance.get("/dashboard/stats");
	return res.data;
};
