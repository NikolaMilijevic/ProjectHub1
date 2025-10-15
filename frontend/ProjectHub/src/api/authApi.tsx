import axiosInstance from "./axiosInstance";

export const register = async (data: any) => {
	try {
		const res = await axiosInstance.post("/auth/register", data);
		return res.data.data;
	} catch (error: any) {
		const message = error.response?.data?.message || "Registration failed";
		throw new Error(message);
	}
};

export const login = async (credentials: {
	email: string;
	password: string;
}) => {
	try {
		const res = await axiosInstance.post("/auth/login", credentials);
		return res.data.data;
	} catch (error: any) {
		const message =
			error.response?.data?.message || "Invalid email or password";
		throw new Error(message);
	}
};
