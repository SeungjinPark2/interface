import { Navigate, Outlet, useRoutes } from "react-router-dom";
import "./App.css";
import LoginForm from "./pages/Login/LoginForm";
import SignupForm from "./pages/Login/SignupForm";
import Home from "./pages/Home";
import { useLocalStorage } from "@uidotdev/usehooks";
import Overview from "./pages/Home/Overview";
import Sender from "./pages/Home/Remittance/Sender";
import History from "./pages/Home/Remittance/History";
import Track from "./pages/Home/Remittance/Track";

function App() {
  const [token] = useLocalStorage("token", null);
  const routes = (isLoggedIn) => [
    {
      path: "/home",
      element: isLoggedIn ? <Home /> : <Navigate to="/login" />,
      children: [
        { path: "overview", element: <Overview /> },
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
