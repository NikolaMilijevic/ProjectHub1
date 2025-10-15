import NavigationButton from "@/components/ui-custom/navigation-button";

const NotFoundPage = () => {
	return (
		<div className='flex flex-col justify-center items-center h-screen bg-gradient-to-br from-violet-300 via-violet-600 to-indigo-900 space-y-4'>
			<p className='text-4xl font-bold text-white'>
				Error 404 - Page not found
			</p>
			<p className='text-lg text-white/80 mb-15'>
				The page you are looking for doesn't exist.
			</p>
			<NavigationButton className='bg-violet-300 hover:bg-violet-400' />
		</div>
	);
};

export default NotFoundPage;
