import { lazy } from "react";
import { ROUTES_PATH } from "./constants";
import { IRoute } from "./types";

const HomePage = lazy(() => import("../web/pages/home"));

export const protectedRoutes: IRoute[] = [
  {
    path: ROUTES_PATH.HOME,
    element: <HomePage />,
  },
];
