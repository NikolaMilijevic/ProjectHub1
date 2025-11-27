import NavigationButton from "../ui-custom/navigation-button";
import violetFolder from "../../assets/violet-folder.png";
import { Button } from "../ui/button";
import { useNavigate } from "@tanstack/react-router";
import { getCurrentUser } from "@/types/auth";

const DashboardHeader = () => {
	const navigate = useNavigate();
	const user = getCurrentUser();

	const handleLogout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		navigate({ to: "/login" });
	};

	return (
		<header className='flex flex-col sm:flex-row items-center justify-evenly w-full p-4 border-b border-gray-200'>
			<div className='flex items-center space-x-4 mb-4 sm:mb-0 max-w-full px-4 sm:px-0'>
				<img
					src={violetFolder}
					alt='violet-folder'
					className='h-12 w-12 rounded-2xl flex-shrink-0'
				/>
				<div className='min-w-0'>
					<p className='text-2xl font-bold truncate'>ProjectHub</p>
					<p className='text-gray-500 truncate'>
						Manage your project efficiently
					</p>
				</div>
			</div>
			<div className='flex items-center space-x-4'>
				{user?.role === "Admin" && (
					<NavigationButton
						buttonText="Statistics"
						buttonRoute="/dashboard/stats"
						icon=''
						className="bg-yellow-400 hover:bg-yellow-500 text-white hover:text-white p-4"
					/>
				)}
				<NavigationButton
					buttonText='+ New Project'
					buttonRoute='/new-project'
					icon=''
					className='bg-violet-400 hover:bg-violet-500 text-white hover:text-white p-4'
				/>
				<Button
					onClick={handleLogout}
					className='bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition cursor-pointer'
				>
					Logout
				</Button>
			</div>
		</header>
	);
};

export default DashboardHeader;
