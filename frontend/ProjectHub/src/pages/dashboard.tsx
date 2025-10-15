import DashboardHeader from "@/components/dashboard/dashboard-header";
import ProjectsContainer from "@/components/dashboard/view-projects/project-container";

const Dashboard = () => {
	return (
		<div className='h-screen'>
			<DashboardHeader />
			<ProjectsContainer />
		</div>
	);
};

export default Dashboard;
