import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Todo from "./components/Todo/Todo";
import Tasks from "./components/Tasks/Tasks";
import Home from "./components/Home/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import ErrorPage from "./components/Home/ErrorPage";
import RootLayout from "./components/Home/RootLayout";
import ConfirmationPage from "./components/Home/ConfirmationPage";
import { AnimatePresence } from "framer-motion";

/**
 * Sets up the routing for different pages of the application using the `react-router-dom` library.
 * Uses other components such as `Todo`, `Tasks`, `Home`, `Register`, `Login`, `ErrorPage`, `RootLayout`, and `ConfirmationPage` to render the content for each page.
 */
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: "tasks", element: <Tasks /> },
        { path: "todos", element: <Todo /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
    { path: "/confirmation-page", element: <ConfirmationPage /> },
  ]);

  return (
    <AnimatePresence>
      <RouterProvider router={router} />
    </AnimatePresence>
  );
}

export default App;
