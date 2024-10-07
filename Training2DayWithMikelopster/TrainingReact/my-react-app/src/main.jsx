import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import UserDetail from "./page/UserDetail.jsx";
import UserForm from "./page/UserForm.jsx";
// import { UserProvider } from "./contexts/UserContext";
import { UserProvider } from './contexts/UserContext'; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserForm />,
  },
  {
    path: "/user/:id",
    element: <UserDetail />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
