import App from "@/App";
import LoginPage from "@/pages/LoginPage";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { PropsWithChildren } from "react";
import {
  createBrowserRouter,
} from "react-router-dom";

interface ParentCompProps {
  component: React.ComponentType<object>;
}

const AuthenticationGuard: React.FC<ParentCompProps> = ({component}) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <loading/>
  });

  return <Component />;
};

function loading() {
  return <div>Redirecting you to the login...</div>
}


const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <AuthenticationGuard component={HomePage} />,
  }
]);

function HomePage() {
  return <h3>HomePage</h3>;
}


export default router;

