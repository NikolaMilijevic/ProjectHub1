import { useNavigate } from "@tanstack/react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { login } from "../api/authApi";
import toast from "react-hot-toast";
import { loginValidationSchema } from "@/types/validation-schema";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

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
		<div className='min-h-screen flex flex-col relative bg-[var(--background)] text-[var(--foreground)] transition-colors'>
			{/* Header */}
			<DashboardHeader />

			{/* Soft Gradient / Glow Background */}
			<div className="absolute inset-x-0 top-22 bottom-0 pointer-events-none overflow-hidden z-0">
  <div
    className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] rounded-3xl
      bg-gradient-to-br from-purple-500 via-purple-200/20 to-transparent
      opacity-20 blur-3xl dark:from-purple-800 dark:via-transparent"
  />
  <div
    className="absolute bottom-0 right-1/2 translate-x-1/2 w-[120%] h-[120%] rounded-3xl
      bg-gradient-to-tl from-pink-400 via-pink-200/20 to-transparent
      opacity-15 blur-3xl dark:from-pink-900 dark:via-transparent"
  />
</div>

			{/* Main Content */}
			<div className='flex flex-1 items-center justify-center px-4 relative z-10'>
				<div className='absolute inset-0 flex items-center justify-center pointer-events-none z-0'>
					<div className='w-[500px] h-[500px] bg-violet-200/20 dark:bg-violet-700/25 rounded-full blur-3xl' />
				</div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='w-full max-w-md p-10 bg-[var(--background)]/60 dark:bg-neutral-900/50 border border-[var(--border)] backdrop-blur-lg rounded-2xl shadow-xl transition-colors'
				>
					{/* Back to Landing Page */}
					<Link
						to='/landing'
						className='text-sm text-violet-500 hover:text-violet-400 mb-4 inline-block'
					>
						← Back to Home
					</Link>

					{/* Page Title */}
					<motion.h2
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className='text-3xl font-extrabold mb-6 text-center'
					>
						Login
					</motion.h2>

					{/* Form */}
					<Formik
						initialValues={{ email: "", password: "" }}
						validationSchema={loginValidationSchema}
						onSubmit={handleSubmit}
					>
						{({ isSubmitting }) => (
							<Form className='space-y-5'>
								{["email", "password"].map((field) => (
									<motion.div
										key={field}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: 0.1 }}
									>
										<Field
											name={field}
											type={field === "email" ? "email" : "password"}
											placeholder={
												field.charAt(0).toUpperCase() + field.slice(1)
											}
											className='w-full p-3 border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-violet-400 bg-[var(--background)] text-[var(--foreground)] transition-colors'
										/>
										<ErrorMessage
											name={field}
											component='p'
											className='text-red-500 text-sm mt-1'
										/>
									</motion.div>
								))}

								<motion.button
									type='submit'
									disabled={isSubmitting}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.5, delay: 0.2 }}
									className='w-full px-6 py-3 rounded-xl bg-violet-400 dark:bg-violet-600 text-white font-semibold hover:bg-violet-500 dark:hover:bg-violet-500 transition disabled:opacity-50'
								>
									{isSubmitting ? "Logging in..." : "Login"}
								</motion.button>
							</Form>
						)}
					</Formik>

					{/* Register Link */}
					<p className='mt-4 text-center text-[var(--foreground)]'>
						Don’t have an account?{" "}
						<Link
							to='/register'
							className='text-violet-500 hover:text-violet-400 font-semibold'
						>
							Register
						</Link>
					</p>
				</motion.div>
			</div>
		</div>
	);
};

export default Login;
