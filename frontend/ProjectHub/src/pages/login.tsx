import { useNavigate } from "@tanstack/react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { login } from "../api/authApi";
import toast from "react-hot-toast";
import { loginValidationSchema } from "@/types/validation-schema";

const Login = () => {
	const navigate = useNavigate();

	const handleSubmit = async (values: { email: string; password: string }) => {
		try {
			const data = await login(values);
			if (data.accessToken && data.refreshToken) {
				localStorage.setItem("accessToken", data.accessToken);
				localStorage.setItem("refreshToken", data.refreshToken);
				toast.success("Login successful!");
				navigate({ to: "/dashboard" });
			} else {
				toast.error(data.message || "Invalid email or password");
			}
		} catch (err) {
			toast.error("Login failed. Please try again.");
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
				<h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>

				<Formik
					initialValues={{ email: "", password: "" }}
					validationSchema={loginValidationSchema}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting }) => (
						<Form className='space-y-4'>
							<div>
								<Field
									name='email'
									type='email'
									placeholder='Email'
									className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400'
								/>
								<ErrorMessage
									name='email'
									component='p'
									className='text-red-500 text-sm mt-1'
								/>
							</div>

							<div>
								<Field
									name='password'
									type='password'
									placeholder='Password'
									className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400'
								/>
								<ErrorMessage
									name='password'
									component='p'
									className='text-red-500 text-sm mt-1'
								/>
							</div>

							<button
								type='submit'
								disabled={isSubmitting}
								className='w-full bg-violet-400 text-white p-3 rounded-md hover:bg-violet-500 transition disabled:opacity-50'
							>
								{isSubmitting ? "Logging in..." : "Login"}
							</button>
						</Form>
					)}
				</Formik>

				<p className='mt-4 text-center text-gray-600'>
					Don’t have an account?{" "}
					<a
						href='/register'
						className='text-violet-500 hover:underline'
					>
						Register
					</a>
				</p>
			</div>
		</div>
	);
};

export default Login;
