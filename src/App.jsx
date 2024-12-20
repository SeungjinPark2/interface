import { Navigate, Outlet, useRoutes } from "react-router-dom";
import "./App.css";
import LoginForm from "./pages/Login/LoginForm";
import SignupForm from "./pages/Login/SignupForm";
import Home from "./pages/Home";
import Overview from "./pages/Home/Overview";
import Sender from "./pages/Home/Remittance/Sender";
import History from "./pages/Home/Remittance/History";
import Track from "./pages/Home/Remittance/Track";
import { useSessionStorage } from "@uidotdev/usehooks";
import AdminSetting from "./pages/Home/AdminSetting";

function App() {
  const [token] = useSessionStorage("token", null);
  const routes = (isLoggedIn) => [
    {
      path: "/home",
      element: isLoggedIn ? <Home /> : <Navigate to="/login" />,
      children: [
        { path: "overview", element: <Overview /> },
        { path: "admin-setting", element: <AdminSetting /> },
        {
          path: "remittance",
          element: <Outlet />,
          children: [
            { path: "sender", element: <Sender /> },
            { path: "history", element: <History /> },
            { path: "track", element: <Track /> },
          ],
        },
        { path: "", element: <Navigate to="overview" /> },
      ],
    },
    {
      path: "/",
      element: !isLoggedIn ? <Outlet /> : <Navigate to="/home" />,
      children: [
        { path: "login", element: <LoginForm /> },
        { path: "signup", element: <SignupForm /> },
        { path: "/", element: <Navigate to="/login" /> },
      ],
    },
  ];

  return useRoutes(routes(token != null));
}

export default App;
