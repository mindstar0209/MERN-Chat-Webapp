import { lazy } from "react";
import { Fragment } from "react";
import { Navigate } from "react-router-dom";
import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

export const routes = [
  {
    path: "/auth/*",
    guard: GuestGuard,
    layout: AuthLayout,
    element: Fragment,
    routes: [
      {
        path: "login",
        element: lazy(() => import("./pages/Auth/Login")),
      },
      {
        path: "signup",
        element: lazy(() => import("./pages/Auth/Signup")),
      },
    ],
  },
  {
    path: "/*",
    guard: AuthGuard,
    layout: MainLayout,
    element: Fragment,
    routes: [
      {
        path: "",
        element: lazy(() => import("./pages/Home")),
      },
      {
        path: "message",
        element: lazy(() => import("./pages/Message")),
      },
      {
        path: "profile",
        element: lazy(() => import("./pages/Profile")),
      },
      {
        path: "profile/:username",
        element: lazy(() => import("./pages/UserProfile")),
      },
      {
        path: "*",
        element: () => <Navigate to="/" />,
      },
    ],
  },
];
