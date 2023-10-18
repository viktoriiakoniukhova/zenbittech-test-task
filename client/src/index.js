import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Home from "./views/Home";
import Auth from "./views/Auth";
import NotFound from "./views/NotFound";
/*Redux */
import { Provider } from "react-redux";
import store from "./store";

/*Router */
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/notfound" replace />,
  },
  {
    path: "notfound",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Auth type="login" />,
      },
      {
        path: "/signup",
        element: <Auth type="signup" />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
