import { Route as rootRoute } from "./routes/__root"
import { Route as AuthImport } from "./routes/_auth"
import { Route as AppImport } from "./routes/_app"
import { Route as IndexImport } from "./routes/index"
import { Route as AuthLoginImport } from "./routes/_auth/login"
import { Route as AppGettingStartedImport } from "./routes/_app/getting-started"
import { Route as AppWorkspaceIndexImport } from "./routes/_app/$workspace/index"

const AuthRoute = AuthImport.update({
  id: "/_auth",
  getParentRoute: () => rootRoute,
} as any)

const AppRoute = AppImport.update({
  id: "/_app",
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: "/",
  getParentRoute: () => rootRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  path: "/login",
  getParentRoute: () => AuthRoute,
} as any)

const AppGettingStartedRoute = AppGettingStartedImport.update({
  path: "/getting-started",
  getParentRoute: () => AppRoute,
} as any)

const AppWorkspaceIndexRoute = AppWorkspaceIndexImport.update({
  path: "/$workspace/",
  getParentRoute: () => AppRoute,
} as any)

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    "/_app": {
      preLoaderRoute: typeof AppImport
      parentRoute: typeof rootRoute
    }
    "/_auth": {
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    "/_app/getting-started": {
      preLoaderRoute: typeof AppGettingStartedImport
      parentRoute: typeof AppRoute
    }
    "/_auth/login": {
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof AuthRoute
    }
    "/_app/$workspace/": {
      preLoaderRoute: typeof AppWorkspaceIndexImport
      parentRoute: typeof AppRoute
    }
  }
}

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  AppRoute.addChildren([AppGettingStartedRoute, AppWorkspaceIndexRoute]),
  AuthRoute.addChildren([AuthLoginRoute]),
])
