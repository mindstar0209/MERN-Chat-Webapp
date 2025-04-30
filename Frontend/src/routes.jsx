import { lazy } from "react";
import { Fragment } from "react";
import { Navigate } from "react-router-dom";
import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";
import MainLayout from "./layouts/MainLayout";

export const routes = [
  {
    path: "/auth/*",
    guard: GuestGuard,
    element: Fragment,
    routes: [
      {
        path: "login",
        element: lazy(() => import("./pages/auth/Login")),
      },
      {
        path: "signup",
        element: lazy(() => import("./pages/auth/Signup")),
      },
    ],
  },
  {
    path: "/*",
    guard: AuthGuard,
    element: Fragment,
    routes: [
      {
        path: "",
        guard: MainLayout,
      },
      {
        path: "message",
        element: lazy(() => import("./pages/Message")),
      },
      {
        path: "*",
        element: () => <Navigate to="/" />,
      },
    ],
  },
];
