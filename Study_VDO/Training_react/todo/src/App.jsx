import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchTodo();
    };
    fetchData();
  }, []); // fetch ครั้งเดียว

  async function fetchTodo() {
    try {
      const res = await axios.get(
        "https://66f4d3fe77b5e889709a979c.mockapi.io/todo"
      );
      setTodos(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error("error", error);
    }
  }

  async function deleteTodo(id) {
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `https://66f4d3fe77b5e889709a979c.mockapi.io/todo/${id}`
      );
      setIsLoading(false);
      await fetchTodo();
    } catch (error) {
      console.error("error", error);
    }
  }

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div>
          {todos.map((todo, index) => (
            <div key={index}>
              {todo.id} {todo.name} {todo.status}
              <Link to={`/todo/${todo.id}`}>
              <button>Edit</button>
              </Link>
              <button
                onClick={async () => {
                  await deleteTodo(todo.id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
