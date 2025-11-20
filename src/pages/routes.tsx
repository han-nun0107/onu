import { createBrowserRouter, Outlet } from "react-router";
import { LandingPage, Login, MyPage, Privacy } from "@/pages";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import Layout from "@/components/common/Layout";

export const router = createBrowserRouter([
  {
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/my-page",
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/privacy",
        element: <Privacy />,
      },
    ],
  },
]);
