import NavigationButton from "../ui-custom/navigation-button";
import violetFolder from "../../assets/violet-folder.png";
import { Button } from "../ui/button";
import { useNavigate } from "@tanstack/react-router";
import { getCurrentUser } from "@/types/auth";
import { ModeToggle } from "../ui-custom/mode-toggle";

const DashboardHeader = () => {
	const navigate = useNavigate();
	const user = getCurrentUser();

	const handleLogout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		navigate({ to: "/login" });
	};

	return (
		<header className='flex flex-col sm:flex-row items-center justify-evenly w-full p-4 border-b border-[var(--border)] bg-[var(--background)]'>
			{/* Logo + Title */}
			<div className='flex items-center space-x-4 mb-4 sm:mb-0 max-w-full px-4 sm:px-0'>
				<img
					src={violetFolder}
					alt='violet-folder'
					className='h-12 w-12 rounded-2xl flex-shrink-0'
				/>
				<div className='min-w-0'>
					<p className='text-[var(--header-title)] text-2xl font-bold truncate'>
						ProjectHub
					</p>
					<p className='text-[var(--header-subtitle)] truncate'>
						Manage your project efficiently
					</p>
				</div>
			</div>

			{/* Buttons */}
			<div className='flex items-center space-x-4'>
				{user && (
					<>
						{user?.role === "Admin" && (
							<NavigationButton
								buttonText='Statistics'
								buttonRoute='/dashboard/stats'
								icon=''
								className='bg-[var(--btn-statistics)] hover:bg-yellow-500 text-yellow-700 p-4'
							/>
						)}
						<NavigationButton
							buttonText='+ New Project'
							buttonRoute='/new-project'
							icon=''
							className='bg-[var(--btn-new-project)] hover:bg-violet-500 text-violet-700 p-4'
						/>
						<Button
							onClick={handleLogout}
							className='bg-[var(--btn-logout)] hover:bg-red-500 text-red-700 px-6 py-3 rounded-md transition cursor-pointer'
						>
							Logout
						</Button>
					</>
				)}
				<ModeToggle />
			</div>
		</header>
	);
};

export default DashboardHeader;
