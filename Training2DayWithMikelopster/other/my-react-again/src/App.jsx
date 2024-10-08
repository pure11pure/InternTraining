/**
 * TODO: Case1
 */
import React, { useState, useEffect } from "react"; // Ensure useState is imported

import "./App.css";
import { Link } from "react-router-dom";
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
import CounterComponent from "./components/counterComponent";

function App() {
  const { data, loading, error } = useFetchData(
    "https://66f4d3fe77b5e889709a979c.mockapi.io/people"
  );

  const [users, setUsers] = useState([]);

  // ฟังก์ชันสำหรับดึงข้อมูลใหม่จาก API
  const refreshUserList = async () => {
    try {
      const response = await fetch(
        "https://66f4d3fe77b5e889709a979c.mockapi.io/people"
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setUsers([]);
    }
  };

  // ดึงข้อมูลครั้งแรกเมื่อ component ถูก mount
  useEffect(() => {
    refreshUserList();
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-3">
        <div className="flex flex-row">
          <p className="text-2xl font-bold py-1">Register</p>
          <button className="px-2 bg-amber-700 text-white rounded font-bold m-2">
            <Link to="/regis">show</Link>
          </button>
        </div>
        <RegisterForm onRegisterSuccess={refreshUserList} />
      </div>
      <div className="flex flex-row p-5 w-full">
        <UserList users={users} />
        <SearchComponent />
      </div>
      <div className="flex flex-row p-5 w-full h-[400px]">
        <UserSearch />
        <GreetAllPage />
      </div>
      <Layout>
        <Home />
        <div className="flex flex-row">
          <p className="text-2xl font-bold py-1">Register</p>
          <button className="px-2 bg-amber-700 text-white rounded font-bold m-2">
            <Link to="/regis">show</Link>
          </button>
        </div>
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
        <div className="flex flex-row">
          <h2 className="text-2xl font-bold">Fetched Data:</h2>
          <button className="px-2 bg-amber-700 text-white rounded font-bold m-2">
            <Link to="/fetch">show</Link>
          </button>
        </div>
        <MyForm />
      </div>

      <div className="flex flex-col w-full justify-center items-center border p-5">
        <div className="flex flex-row">
          <h2 className="text-2xl font-bold mb-3">use Context Data:</h2>
        </div>
        <UserProvider>
          <UserProfile />
        </UserProvider>
      </div>

      <div className="flex flex-col w-full justify-center items-center border p-5">
        <div className="flex flex-row">
          <h2 className="text-2xl font-bold mb-3">use Reducer Data:</h2>
          <button className="px-2 bg-amber-700 text-white rounded font-bold m-2">
            <Link to="/counter">show</Link>
          </button>
        </div>
        <CounterComponent />
      </div>
    </div>
  );
}

export default App;

/**
 * TODO: Case2
 */

// // Import createSlice และ configureStore จาก Redux Toolkit
// import { createSlice, configureStore } from "@reduxjs/toolkit";
// import { Provider, useDispatch, useSelector } from "react-redux";

// // สร้าง slice ซึ่งจะรวม action และ reducer ไว้ในตัว
// const counterSlice = createSlice({
//   name: "counter",
//   initialState: { count: 0 },
//   reducers: {
//     increment: (state) => {
//       state.count += 1;
//     },
//     decrement: (state) => {
//       state.count -= 1;
//     },
//   },
// });

// // Extract reducer และ action จาก slice
// const { increment, decrement } = counterSlice.actions;
// const store = configureStore({
//   reducer: {
//     counter: counterSlice.reducer,
//   },
// });

// function Counter() {
//   const count = useSelector((state) => state.counter.count);
//   const dispatch = useDispatch();

//   return (
//     <div>
//       <p className="text-xl text-white font-bold text-center p-3 bg-pink-500 m-3 rounded">
//         Count: {count}
//       </p>
//       <div className="flex justify-between p-3">
//         <button
//           onClick={() => dispatch(decrement())}
//           className="bg-sky-600 p-2 text-white font-bold rounded"
//         >
//           {" "}
//           &lt; Decrement
//         </button>
//         <button
//           onClick={() => dispatch(increment())}
//           className="bg-sky-600 p-2 text-white font-bold rounded"
//         >
//           Increment &gt;
//         </button>
//       </div>
//     </div>
//   );
// }

// // ใช้ Provider เพื่อให้ store สามารถถูกใช้งานได้ทั่วทั้งแอป
// function App() {
//   return (
//     <Provider store={store}>
//       <Counter />
//     </Provider>
//   );
// }

// export default App;

/**
 * TODO: Case3
 */

// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchPosts } from "./slices/postSlice";

// export default function PostsList() {
//   const dispatch = useDispatch();
//   // ดึงข้อมูลจาก store
//   const posts = useSelector((state) => state.posts.items);
//   const postStatus = useSelector((state) => state.posts.status);
//   const error = useSelector((state) => state.posts.error);

//   useEffect(() => {
//     if (postStatus === "idle") {
//       // ดึงข้อมูลจาก API
//       dispatch(fetchPosts());
//     }
//   }, [postStatus, dispatch]);

//   let content;

//   if (postStatus === "loading") {
//     content = <div>กำลังโหลด...</div>;
//   } else if (postStatus === "succeeded") {
//     content = (
//       <ul>
//         {posts.map((post) => (
//           <li key={post.id}>{post.title}</li>
//         ))}
//       </ul>
//     );
//   } else if (postStatus === "failed") {
//     content = <div>{error}</div>;
//   }

//   return (
//     <div>
//       <h1>โพสต์ทั้งหมด</h1>
//       {content}
//     </div>
//   );
// }
