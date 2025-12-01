import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
	baseURL: `${BASE_URL}/api`,
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
        const refreshUrl =
          import.meta.env.NODE_ENV === "development"
            ? "http://localhost:5000/api/auth/refresh"
            : `${BASE_URL}/auth/refresh`;

        const refreshRes = await axios.post(refreshUrl, {
          token: localStorage.getItem("refreshToken"),
        });

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
