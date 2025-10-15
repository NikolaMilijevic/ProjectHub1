import { useNavigate } from "@tanstack/react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { register } from "../api/authApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { registerValidationSchema } from "@/types/validation-schema";

const Register = () => {
	const navigate = useNavigate();
	const [serverError, setServerError] = useState("");

	const handleSubmit = async (values: any, { setSubmitting }: any) => {
		setServerError("");
		try {
			const data = await register(values);
			if (data.token) {
				localStorage.setItem("token", data.token);
				toast.success("Registration successful!");
				navigate({ to: "/dashboard" });
			} else {
				setServerError("Registration failed. Please try again.");
			}
		} catch (err: any) {
			if (err.message.includes("exists")) {
				setServerError("Email already exists. Try logging in.");
			} else {
				setServerError(err.message || "Registration failed.");
			}
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
				<h2 className='text-2xl font-bold mb-6 text-center'>
					Create an Account
				</h2>

				{serverError && (
					<p className='text-red-500 text-center mb-4'>{serverError}</p>
				)}

				<Formik
					initialValues={{
						firstName: "",
						lastName: "",
						email: "",
						password: "",
					}}
					validationSchema={registerValidationSchema}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting }) => (
						<Form className='space-y-4'>
							<div>
								<Field
									name='firstName'
									placeholder='First Name'
									className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-400'
								/>
								<ErrorMessage
									name='firstName'
									component='div'
									className='text-red-500 text-sm mt-1'
								/>
							</div>

							<div>
								<Field
									name='lastName'
									placeholder='Last Name'
									className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-400'
								/>
								<ErrorMessage
									name='lastName'
									component='div'
									className='text-red-500 text-sm mt-1'
								/>
							</div>

							<div>
								<Field
									name='email'
									type='email'
									placeholder='Email'
									className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-400'
								/>
								<ErrorMessage
									name='email'
									component='div'
									className='text-red-500 text-sm mt-1'
								/>
							</div>

							<div>
								<Field
									name='password'
									type='password'
									placeholder='Password'
									className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-400'
								/>
								<ErrorMessage
									name='password'
									component='div'
									className='text-red-500 text-sm mt-1'
								/>
							</div>

							<button
								type='submit'
								disabled={isSubmitting}
								className='w-full bg-violet-400 hover:bg-violet-500 text-white p-3 rounded-md transition disabled:opacity-50'
							>
								{isSubmitting ? "Registering..." : "Register"}
							</button>
						</Form>
					)}
				</Formik>

				<p className='mt-4 text-center text-gray-600'>
					Already have an account?{" "}
					<a
						href='/login'
						className='text-violet-500 hover:underline'
					>
						Login
					</a>
				</p>
			</div>
		</div>
	);
};

export default Register;
