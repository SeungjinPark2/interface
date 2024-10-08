import { Navigate, Outlet, useRoutes } from "react-router-dom";
import "./App.css";
import { useAuthStore } from "./hooks/authStore";
import User from "./pages/User";
import Login from "./pages/Login";

function App() {
  const { token } = useAuthStore();
  const routes = (isLoggedIn) => [
    {
      path: "/app",
      element: isLoggedIn ? <User /> : <Navigate to="/login" />,
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
      element: !isLoggedIn ? <Outlet /> : <Navigate to="/app" />,
      children: [
        { path: "login", element: <Login /> },
        { path: "/", element: <Navigate to="/login" /> },
      ],
    },
  ];

  return useRoutes(routes(token != null));
}

export default App;
