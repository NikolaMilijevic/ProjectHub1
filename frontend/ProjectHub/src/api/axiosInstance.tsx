import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://localhost:7072/api",
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: false,
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			localStorage.getItem("refreshToken")
		) {
			originalRequest._retry = true;
			try {
				const refreshRes = await axios.post(
					"http://localhost:5000/api/auth/refresh",
					{ token: localStorage.getItem("refreshToken") }
				);
				const { accessToken } = refreshRes.data;
				localStorage.setItem("accessToken", accessToken);
				originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
				return axiosInstance(originalRequest);
			} catch (err) {
				localStorage.removeItem("accessToken");
				localStorage.removeItem("refreshToken");
				window.location.href = "/login";
				return Promise.reject(err);
			}
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
