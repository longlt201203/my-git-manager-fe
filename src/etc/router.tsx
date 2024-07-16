import RootLayout from "@/layouts/RootLayout";
import CreateProjectPage from "@/pages/CreateProjectPage";
import CredentialsPage from "@/pages/CredentialsPage";
import DashboardPage from "@/pages/HomePage";
import ProjectsPage from "@/pages/ProjectsPage";
import SettingsPage from "@/pages/SettingsPage";
import ShowProjectPage from "@/pages/ShowProjectPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				path: "dashboard",
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
						path: ":id",
						element: <ShowProjectPage />,
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
