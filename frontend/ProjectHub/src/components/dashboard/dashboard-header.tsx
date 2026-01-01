import NavigationButton from "../ui-custom/navigation-button";
import violetFolder from "../../assets/violet-folder.png";
import { Button } from "../ui/button";
import { useNavigate } from "@tanstack/react-router";
import { getCurrentUser } from "@/types/auth";
import { ModeToggle } from "../ui-custom/mode-toggle";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const isAuthPage = !user; // true for login/register

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate({ to: "/login" });
  };

  return (
    <header
      className={`relative z-10 w-full border-b border-[var(--border)] bg-[var(--background)] py-4`}
    >
      {/* Container for spacing & max-width */}
      <div className="flex items-center justify-between w-full max-w-4xl mx-auto px-4 flex-wrap gap-4">
        {/* Left side: Logo + Title */}
        <div className="flex items-center gap-4 min-w-0 flex-shrink">
          <img
            src={violetFolder}
            alt="violet-folder"
            className="h-12 w-12 rounded-2xl flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="text-[var(--header-title)] text-xl sm:text-2xl font-bold truncate">
              ProjectHub
            </p>
            <p className="text-[var(--header-subtitle)] text-sm truncate">
              Manage your project efficiently
            </p>
          </div>
        </div>

        {/* Right side: Buttons (dashboard only) + ModeToggle */}
        <div className="flex items-center gap-3 flex-nowrap">
          {!isAuthPage && user && (
            <>
              {user.role === "Admin" && (
                <NavigationButton
                  buttonText="Statistics"
                  buttonRoute="/dashboard/stats"
                  className="bg-[var(--btn-statistics)] hover:bg-yellow-500 text-yellow-700"
                  icon=""
                />
              )}

              <NavigationButton
                buttonText="+ New Project"
                buttonRoute="/new-project"
                className="bg-[var(--btn-new-project)] hover:bg-violet-500 text-violet-700"
                icon=""
              />

              <Button
                onClick={handleLogout}
                className="bg-[var(--btn-logout)] hover:bg-red-500 text-red-700 px-6 py-3 rounded-md transition cursor-pointer"
              >
                Logout
              </Button>
            </>
          )}

          {/* ModeToggle always present, stays on same row */}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
