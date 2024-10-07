import "./App.css";
import RegisterForm from "./components/RegisterForm";
import SearchComponent from "./components/searchComponent";
import UserList from "./components/userList";
import UserSearch from "./components/searchApiComponent";
import GreetAllPage from "./pages/greetAllPage";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-3">
        <p className="text-2xl font-bold py-1">Register</p>
        <RegisterForm />
      </div>
      <div className="flex flex-row p-5 w-full">
        <UserList />
        <SearchComponent />
      </div>
      <div className="flex flex-row p-5 w-full h-[400px]">
        <UserSearch />
        <GreetAllPage/>
      </div>
      <div className="flex flex-row w-full">
        <Home/>
      </div>
    </div>
  );
}

export default App;
