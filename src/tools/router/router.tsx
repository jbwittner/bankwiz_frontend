import App from "@/App";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { PropsWithChildren } from "react";
import {
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        Component: PublicPage,
      },
    ]
  },
]);

function PublicPage() {
  return <h3>Public</h3>;
}

const AuthenticationGuard = ({ children: JSX.Element }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <PageLoader />
      </div>
    ),
  });

  return <Component />;
};

export default router;

