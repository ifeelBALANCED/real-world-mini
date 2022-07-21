import { authRoutes } from "@/navigation/routes/authRoutes";
import { generateRoutes } from "@/navigation/routes/generateRoutes";

export const routesList = [...generateRoutes, ...authRoutes];
