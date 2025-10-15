interface ErrorMessageProps {
	message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => (
	<div className='text-red-600 text-center mt-4'>
		Error loading projects: {message}
	</div>
);

export default ErrorMessage;
