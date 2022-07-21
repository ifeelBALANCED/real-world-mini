import { lazy } from "react";
import { Route } from "react-router";

import PrivateRoute from "@/components/ui/private-route/private-route";

import routes from "../routes";

const HomePage = lazy(() => import("@/components/screens/home/home"));
const UsersPage = lazy(() => import("@/components/screens/users/users"));
const DogsPage = lazy(() => import("@/components/screens/dogs/dogs"));
const NotFound = lazy(() => import("@/components/screens/not-found/not-found"));
const DogPage = lazy(() => import("@/components/screens/dog/dog"));
const CreateDogPage = lazy(
  () => import("@/components/screens/create-dog/create-dog")
);
const ProfilePage = lazy(() => import("@/components/screens/profile/profile"));
const EditorPage = lazy(() => import("@/components/screens/editor/editor"));
const ArticlePage = lazy(() => import("@/components/screens/article/article"));
const EditArticlePage = lazy(
  () => import("@/components/screens/edit-article/edit-article")
);

export const generateRoutes = [
  <Route
    key={routes.HOME}
    path={routes.HOME}
    element={
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    }
  />,
  <Route
    key={routes.USERS}
    path={routes.USERS}
    element={
      <PrivateRoute>
        <UsersPage />
      </PrivateRoute>
    }
  />,
  <Route
    key={routes.DOGS}
    path={routes.DOGS}
    element={
      <PrivateRoute>
        <DogsPage />
      </PrivateRoute>
    }
  />,
  <Route
    key={routes.DOG}
    path={routes.DOG}
    element={
      <PrivateRoute>
        <DogPage />
      </PrivateRoute>
    }
  />,
  <Route
    key={routes.CREATE_DOG}
    path={routes.CREATE_DOG}
    element={
      <PrivateRoute>
        <CreateDogPage />
      </PrivateRoute>
    }
  />,
  <Route
    key={routes.PROFILE}
    path={routes.PROFILE}
    element={
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    }
  />,
  <Route
    key={routes.NOT_FOUND}
    path={routes.NOT_FOUND}
    element={<NotFound />}
  />,
  <Route key={routes.EDITOR} path={routes.EDITOR} element={<EditorPage />} />,
  <Route
    key={routes.ARTICLE}
    path={routes.ARTICLE}
    element={<ArticlePage />}
  />,
  <Route
    key={routes.EDITOR_EDIT}
    path={routes.EDITOR_EDIT}
    element={<EditArticlePage />}
  />,
];
