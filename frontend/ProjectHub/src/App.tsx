import {
	createRootRoute,
	createRoute,
	createRouter,
	Outlet,
	RouterProvider,
} from "@tanstack/react-router";
import CreateProject from "./pages/create-project";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/not-found";
import Dashboard from "./pages/dashboard";
import ViewProject from "./pages/view-project";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Login from "./pages/login";
import Register from "./pages/register";
import DashboardStats from "./pages/dashboard-stats";

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
	component: () => <Outlet />,
	notFoundComponent: () => <NotFoundPage />,
});

const dashboardRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/dashboard",
	component: Dashboard,
});

const newProjectRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/new-project",
	component: CreateProject,
});

export const viewProjectRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/view-project/$projectId",
	component: ViewProject,
});

export const dashboardStatsRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/dashboard-stats",
	component: DashboardStats,
});

export const authRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: () => {
		const token = localStorage.getItem("token");
		if (!token) {
			window.location.href = "/login";
			return null;
		}
		return <Outlet />;
	},
});

const loginRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/login",
	component: Login,
});

const registerRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/register",
	component: Register,
});

const routeTree = rootRoute.addChildren({
	loginRoute,
	registerRoute,
	authRoute: authRoute.addChildren({
		dashboardRoute,
		newProjectRoute,
		viewProjectRoute,
		dashboardStatsRoute
	}),
});

const router = createRouter({ routeTree });

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools />
			<RouterProvider router={router} />
			<Toaster position='top-center' />
		</QueryClientProvider>
	);
};

export default App;
