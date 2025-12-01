import {
	createRootRoute,
	createRoute,
	createRouter,
	Outlet,
	RouterProvider,
} from "@tanstack/react-router";

import CreateProject from "./pages/create-project";
import Dashboard from "./pages/dashboard";
import ViewProject from "./pages/view-project";
import Login from "./pages/login";
import Register from "./pages/register";
import DashboardStatsComponent from "./pages/dashboard-stats";
import NotFoundPage from "./pages/not-found";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { requireAdmin } from "./routes/routeGuards";
import { ThemeProvider } from "./components/ui-custom/theme-provider";
import LandingPage from "./pages/landing";

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
	component: () => <Outlet />,
	notFoundComponent: () => <NotFoundPage />,
});

const authRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: () => {
		const token = localStorage.getItem("accessToken");
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

const dashboardRoute = createRoute({
	getParentRoute: () => authRoute,
	path: "/dashboard",
	component: Dashboard,
});

const newProjectRoute = createRoute({
	getParentRoute: () => authRoute,
	path: "/new-project",
	component: CreateProject,
});

export const viewProjectRoute = createRoute({
	getParentRoute: () => authRoute,
	path: "/view-project/$projectId",
	component: ViewProject,
});

export const dashboardStatsRoute = createRoute({
	getParentRoute: () => authRoute,
	path: "/dashboard/stats",
	beforeLoad: () => {
		requireAdmin();
	},
	component: DashboardStatsComponent,
});

export const landingRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/landing",
	component: LandingPage,
});

const routeTree = rootRoute.addChildren({
	loginRoute,
	registerRoute,
	landingRoute,
	authRoute: authRoute.addChildren({
		dashboardRoute,
		newProjectRoute,
		viewProjectRoute,
		dashboardStatsRoute,
	}),
});

const router = createRouter({ routeTree });

const App = () => (
	<ThemeProvider>
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools />
			<RouterProvider router={router} />
			<Toaster
				position='top-center'
				toastOptions={{
					duration: 2000,
					style: {
						backdropFilter: "blur(12px)",
						background: "var(--background)/80",
						color: "var(--foreground)",
						border: "1px solid rgba(255,255,255,0.1)",
						borderRadius: "12px",
						padding: "16px",
					},
				}}
			/>
		</QueryClientProvider>
	</ThemeProvider>
);

export default App;
