import Loading from "@/components/dashboard/view-projects/loading";
import NavigationButton from "@/components/ui-custom/navigation-button";
import { motion } from "framer-motion";
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
import { useDashboardStats } from "@/api/querys/useCreateProject";
import { ModeToggle } from "@/components/ui-custom/mode-toggle";
import { useTheme } from "@/components/ui-custom/theme-provider";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const fadeUp = {
	hidden: { opacity: 0, y: 20 },
	visible: (i = 1) => ({
		opacity: 1,
		y: 0,
		transition: { delay: i * 0.1, duration: 0.6 },
	}),
};

const DashboardStatsComponent = () => {
	const { data: stats, isLoading, isError, error } = useDashboardStats();
	const { theme } = useTheme();

	if (isLoading) return <Loading />;
	if (isError)
		return (
			<p className='text-red-500 text-center mt-10'>
				{error?.message || "Failed to load dashboard stats"}
			</p>
		);

	if (!stats) return null;

	const totalsData = [
		{ name: "Users", value: stats.totalUsers || 0 },
		{ name: "Projects", value: stats.totalProjects || 0 },
		{ name: "Visitors", value: stats.totalVisitors || 0 },
	];

	return (
		<div className='relative min-h-screen text-[var(--foreground)] transition-colors'>
			{/* Background Glow */}
			<div className='absolute inset-0 pointer-events-none z-0 overflow-hidden'>
				<div
					className='absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-full max-w-[200vw]
            rounded-3xl bg-gradient-to-br from-purple-400/20 via-purple-200/10 to-transparent
            blur-5xl dark:from-purple-800/20 dark:via-transparent'
				/>
				<div
					className='absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-full max-w-[200vw]
            rounded-3xl bg-gradient-to-tl from-pink-400/20 via-pink-200/10 to-transparent
            blur-5xl dark:from-pink-900/20 dark:via-transparent'
				/>
			</div>

			<div className='max-w-7xl mx-auto p-4 space-y-8 relative z-10'>
				{/* Header */}
				<motion.div
					initial='hidden'
					animate='visible'
					variants={fadeUp}
					className='flex justify-between items-center'
				>
					<h1 className='text-3xl font-bold text-center text-header-title'>
						Dashboard Stats
					</h1>
					<ModeToggle />
				</motion.div>

				{/* Totals cards */}
				<div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
					{totalsData.map((item, index) => (
						<motion.div
							key={item.name}
							custom={index}
							initial='hidden'
							animate='visible'
							variants={fadeUp}
							className='bg-white/20 dark:bg-neutral-900/50 backdrop-blur-md border border-white/30 dark:border-neutral-700 rounded-2xl shadow-md p-6 text-center'
						>
							<h2 className='text-xl font-semibold text-card-foreground mb-2'>
								{item.name}
							</h2>
							<p className='text-3xl font-bold text-card-foreground'>
								{item.value}
							</p>
						</motion.div>
					))}
				</div>

				{/* Charts */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<motion.div
						initial='hidden'
						animate='visible'
						variants={fadeUp}
						custom={4}
						className='bg-white/20 dark:bg-neutral-900/50 backdrop-blur-md border border-white/30 dark:border-neutral-700 rounded-2xl shadow-md p-6'
					>
						<h2 className='text-xl font-semibold mb-4 text-center text-card-foreground'>
							Totals Overview
						</h2>
						<ResponsiveContainer
							width='100%'
							height={250}
						>
							<BarChart data={totalsData}>
								<XAxis
									dataKey='name'
									stroke='var(--card-foreground)'
								/>
								<YAxis stroke='var(--card-foreground)' />
								<Tooltip
									contentStyle={{
										backgroundColor: "var(--card)",
										color: "var(--card-foreground)",
									}}
								/>
								<Bar
									dataKey='value'
									fill={COLORS[0]}
								/>
							</BarChart>
						</ResponsiveContainer>
					</motion.div>

					<motion.div
						initial='hidden'
						animate='visible'
						variants={fadeUp}
						custom={5}
						className='bg-white/20 dark:bg-neutral-900/50 backdrop-blur-md border border-white/30 dark:border-neutral-700 rounded-2xl shadow-md p-6'
					>
						<h2 className='text-xl font-semibold mb-4 text-center text-card-foreground'>
							Proportions
						</h2>
						<ResponsiveContainer
							width='100%'
							height={250}
						>
							<PieChart>
								<Pie
									data={totalsData}
									dataKey='value'
									nameKey='name'
									cx='50%'
									cy='50%'
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
								<Legend wrapperStyle={{ color: "var(--card-foreground)" }} />
								<Tooltip
									contentStyle={{
										backgroundColor: "var(--card)",
										color: theme === "dark" ? "white" : "black",
									}}
									labelStyle={{ color: theme === "dark" ? "white" : "black" }}
									itemStyle={{ color: theme === "dark" ? "white" : "black" }}
								/>
							</PieChart>
						</ResponsiveContainer>
					</motion.div>
				</div>

				{/* Users Table */}
				{stats.users && stats.users.length > 0 && (
					<motion.div
						initial='hidden'
						animate='visible'
						variants={fadeUp}
						custom={6}
						className='overflow-x-auto'
					>
						<div className='bg-white/20 dark:bg-neutral-900/50 backdrop-blur-md border border-white/30 dark:border-neutral-700 rounded-2xl shadow-md p-6'>
							<h2 className='text-xl font-semibold mb-4 text-center text-card-foreground'>
								Users
							</h2>
							<table className='min-w-full table-auto border-collapse'>
								<thead className='bg-muted'>
									<tr>
										{["ID", "First Name", "Last Name", "Email", "Role"].map(
											(heading) => (
												<th
													key={heading}
													className='border-b p-3 text-left text-muted-foreground uppercase text-sm'
												>
													{heading}
												</th>
											)
										)}
									</tr>
								</thead>
								<tbody>
									{stats.users.map((user, index) => (
										<tr
											key={user.id}
											className={`${
												index % 2 === 0 ? "bg-white/10" : "bg-muted/20"
											} hover:bg-accent/10 transition-colors`}
										>
											<td className='border-b p-3 text-card-foreground'>
												{user.id}
											</td>
											<td className='border-b p-3 text-card-foreground'>
												{user.firstName}
											</td>
											<td className='border-b p-3 text-card-foreground'>
												{user.lastName}
											</td>
											<td
												className='border-b p-3 truncate max-w-xs text-card-foreground'
												title={user.email}
											>
												{user.email}
											</td>
											<td className='border-b p-3 text-card-foreground'>
												{user.role}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</motion.div>
				)}

				<motion.div
					initial='hidden'
					animate='visible'
					variants={fadeUp}
					custom={7}
					className='flex justify-center'
				>
					<NavigationButton
						buttonText='Go back to dashboard'
						buttonRoute='/dashboard'
						className='bg-violet-400 text-white hover:bg-violet-500 font-semibold py-3 px-6 rounded-md shadow-md hover:shadow-lg transition'
					/>
				</motion.div>
			</div>
		</div>
	);
};

export default DashboardStatsComponent;
