import "./App.css";
import RegisterForm from "./components/RegisterForm";
import SearchComponent from "./components/searchComponent";
import UserList from "./components/userList";
import UserSearch from "./components/searchApiComponent";
import GreetAllPage from "./pages/greetAllPage";
import Home from "./pages/Home";
import Layout from "./pages/layout";
import useFetchData from "./้hooks/useFetchData";
import MyForm from "./components/myForm";
import UserProvider from "./contexts/userContext";
import UserProfile from "./components/userProfile";

function App() {
  const { data, loading, error } = useFetchData(
    "https://66f4d3fe77b5e889709a979c.mockapi.io/people"
  );

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

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
        <GreetAllPage />
      </div>
      <Layout>
        <Home />
        <p className="text-2xl font-bold py-1">Register</p>
        <RegisterForm />
      </Layout>
      <div className="flex flex-col w-full justify-center items-center border p-5">
        <h2 className="text-2xl font-bold">Fetched Data:</h2>
        {data ? (
          data.map((post) => <div key={post.id}>{post.name}</div>)
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <p>Error: {error.message}</p>
        )}
      </div>
      <div className="flex flex-col w-full justify-center items-center border p-5">
        <h2 className="text-2xl font-bold">Fetched Data:</h2>
        <MyForm />
      </div>

      <div className="flex flex-col w-full justify-center items-center border p-5">
        <h2 className="text-2xl font-bold mb-3">use Context Data:</h2>
        <UserProvider>
          <UserProfile />
        </UserProvider>
      </div>
    </div>
  );
}

export default App;
