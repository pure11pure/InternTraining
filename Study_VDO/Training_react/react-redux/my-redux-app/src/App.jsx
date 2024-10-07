import { useRoutes } from "react-router-dom";
import UserEdit from "./page/UserEdit";
import UserList from "./page/UserList";

function App() {
  const element = useRoutes([
    { path: "/", element: <UserList /> },
    { path: "/create", element: <UserEdit /> },
    { path: "/edit/:id", element: <UserEdit /> },
  ]);
  return element;
}

export default App;