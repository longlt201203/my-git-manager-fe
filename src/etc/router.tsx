import RootLayout from "@/layouts/RootLayout";
import CredentialsPage from "@/pages/CredentialsPage";
import DashboardPage from "@/pages/HomePage";
import ProjectsPage from "@/pages/ProjectsPage";
import SettingsPage from "@/pages/SettingsPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				path: "",
				element: <DashboardPage />,
			},
			{
				path: "/projects",
				element: <ProjectsPage />,
			},
			{
				path: "/credentials",
				element: <CredentialsPage />,
			},
			{
				path: "/settings",
				element: <SettingsPage />,
			},
		],
	},
]);

export default router;
