import NavigationButton from "../ui-custom/navigation-button";

interface HeaderProps {
	headerText?: string;
}

const Header = ({ headerText = "Create New Project" }: HeaderProps) => {
	return (
		<div className='border-b border-gray-200 bg-white'>
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2'>
				<div className='flex items-center gap-3'>
					<NavigationButton buttonText='Back To Projects' />
					<p className='text-lg sm:text-xl font-bold border-l border-gray-200 pl-3'>
						{headerText}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Header;
