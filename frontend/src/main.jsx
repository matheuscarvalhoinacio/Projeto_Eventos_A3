import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./components/pages/Home/HomePage";
import Login from "./components/pages/auth/Login";
import App from "./App.jsx";
import Register from "./components/pages/auth/Register.jsx";
import Report from "./components/pages/Report/Report.jsx";
import CreateReport from "./components/layout/createRoport/CreateReport.jsx";
import PrivateRoute from "./util/PrivateRoute.jsx";
import ReportPage from "./components/layout/ReportPage/ReportPage.JSX";
import MyAppointments from "./components/layout/MyAppointments/MyAppointments.jsx";
import Profile from "./components/layout/Profile/Profile.jsx";
import Suggestion from "./components/layout/Suggestion/Suggestion.jsx";
import SolutionDetail from "./components/layout/Solutions/SolutionDetail.jsx";
import SolutionDetailPage from "./components/layout/Solutions/SolutionDetailPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        element: <PrivateRoute />,
        children: [
          { path: "/createReport", element: <CreateReport /> },
          { path: "/report", element: <Report /> },
          { path: "/myAppointments", element: <MyAppointments /> },
          { path: "/profile", element: <Profile /> },
          { path: "/suggestion/:id", element: <Suggestion /> },
          { path: "/solutions/:id", element: <SolutionDetail /> },
          { path: "/solution/:id", element: <SolutionDetailPage /> },
        ],
      },
      { path: "/details/:id", element: <ReportPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
