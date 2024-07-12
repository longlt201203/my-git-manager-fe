import RootLayout from "@/layouts/RootLayout";
import CreateProjectPage from "@/pages/CreateProjectPage";
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

				children: [
					{
						path: "create",
						element: <CreateProjectPage />,
					},
					{
						path: "",
						element: <ProjectsPage />,
					},
				],
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
