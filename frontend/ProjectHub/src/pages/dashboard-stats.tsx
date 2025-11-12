import { useEffect, useState } from "react";
import { getDashboardStats, type DashboardStats } from "@/api/dashboardApi";
import Loading from "@/components/dashboard/view-projects/loading";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
	Legend,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const DashboardStatsComponent = () => {
	const [stats, setStats] = useState<DashboardStats | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const data = await getDashboardStats();
				setStats(data);
			} catch (err: any) {
				setError("Failed to load dashboard statistics");
			} finally {
				setLoading(false);
			}
		};
		fetchStats();
	}, []);

	if (loading) return <Loading />;
	if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

	const totalsData = [
		{ name: "Users", value: stats?.totalUsers || 0 },
		{ name: "Projects", value: stats?.totalProjects || 0 },
		{ name: "Visitors", value: stats?.totalVisitors || 0 },
	];

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
			<div className="bg-white w-full max-w-5xl p-8 rounded-lg shadow-md space-y-8">
				<h1 className="text-3xl font-bold mb-6 text-center">Dashboard Stats</h1>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{totalsData.map((item) => (
						<div
							key={item.name}
							className="bg-gray-50 shadow rounded-lg p-6 text-center"
						>
							<h2 className="text-xl font-semibold mb-2">{item.name}</h2>
							<p className="text-3xl font-bold">{item.value}</p>
						</div>
					))}
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="bg-gray-50 shadow rounded-lg p-6">
						<h2 className="text-xl font-semibold mb-4 text-center">
							Totals Overview
						</h2>
						<ResponsiveContainer width="100%" height={250}>
							<BarChart data={totalsData}>
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Bar dataKey="value" fill="#8884d8" />
							</BarChart>
						</ResponsiveContainer>
					</div>

					<div className="bg-gray-50 shadow rounded-lg p-6">
						<h2 className="text-xl font-semibold mb-4 text-center">
							Proportions
						</h2>
						<ResponsiveContainer width="100%" height={250}>
							<PieChart>
								<Pie
									data={totalsData}
									dataKey="value"
									nameKey="name"
									cx="50%"
									cy="50%"
									outerRadius={80}
									label
								>
									{totalsData.map((_, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Legend />
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardStatsComponent;
