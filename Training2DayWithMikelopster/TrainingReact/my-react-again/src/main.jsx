import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css"; // เพิ่มการนำเข้า Tailwind CSS
import RegisterForm from "./components/RegisterForm.jsx";
import UserList from "./components/userList.jsx";
import SearchComponent from "./components/searchComponent.jsx";
import UserSearch from "./components/searchApiComponent.jsx";
import GreetAllPage from "./pages/greetAllPage.jsx";
import Home from "./pages/Home.jsx";
import MyForm from "./components/myForm.jsx";
import UserProvider from "./contexts/userContext.jsx";
import CounterComponent from "./components/counterComponent.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/regis",
    element: <RegisterForm />,
  },
  {
    path: "/userList",
    element: <UserList />,
  },
  {
    path: "/search",
    element: <SearchComponent />,
  },
  {
    path: "/userSearch",
    element: <UserSearch />,
  },
  {
    path: "/greet",
    element: <GreetAllPage />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/fetch",
    element: <MyForm />,
  },
  {
    path: "/counter",
    element: <CounterComponent />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
