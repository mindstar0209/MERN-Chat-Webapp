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
        element: lazy(() => import("./components/Login")),
      },
      {
        path: "signup",
        element: lazy(() => import("./components/Signup")),
      },
    ],
  },
  {
    path: "/*",
    guard: AuthGuard,
    layout: MainLayout,
    routes: [
      {
        path: "",
        element: lazy(() => import("./pages/Message")),
      },
      {
        path: "chat",
        element: lazy(() => import("./pages/Message")),
      },
      {
        path: "hub",
        element: lazy(() => import("./pages/Message")),
      },
      {
        path: "*",
        element: () => <Navigate to="/" />,
      },
    ],
  },
];
