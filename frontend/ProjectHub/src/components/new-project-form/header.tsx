import { ModeToggle } from "../ui-custom/mode-toggle";
import NavigationButton from "../ui-custom/navigation-button";

interface HeaderProps {
  headerText?: string;
}

const Header = ({ headerText = "Create New Project" }: HeaderProps) => {
  return (
    <div className="border-b bg-background border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <NavigationButton buttonText="Back To Projects" className="dark:bg-violet-400" />
          <p className="text-lg sm:text-xl font-bold border-l pl-3 border-border text-header-title">
            {headerText}
          </p>
        </div>
				<ModeToggle />
      </div>
    </div>
  );
};

export default Header;
