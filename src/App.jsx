import { Navigate, Outlet, useRoutes } from "react-router-dom";
import "./App.css";
import LoginForm from "./pages/Login/LoginForm";
import SignupForm from "./pages/Login/SignupForm";
import Home from "./pages/Home";
import { useLocalStorage } from "@uidotdev/usehooks";

function App() {
  const [token] = useLocalStorage("token", null);
  const routes = (isLoggedIn) => [
    {
      path: "/home",
      element: isLoggedIn ? <Home /> : <Navigate to="/login" />,
      children: [
        // { path: '/dashboard', element: <Dashboard /> },
        // { path: '/account', element: <Account /> },
        // { path: '/', element: <Navigate to="/app/dashboard" /> },
        // {
        //   path: 'member',
        //   element: <Outlet />,
        //   children: [
        //     { path: '/', element: <MemberGrid /> },
        //     { path: '/add', element: <AddMember /> },
        //   ],
        // },
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
