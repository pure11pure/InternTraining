import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = "https://66f4d3fe77b5e889709a979c.mockapi.io/";

function Edit() {
  const navigate = useNavigate(); // ใช้ useNavigate เพื่อสร้างฟังก์ชันเปลี่ยนเส้นทาง

  const { id } = useParams();
  const [todo, setTodo] = useState({
    name: "",
  });

  async function fetchTodo(todoId) {
    try {
      const res = await axios.get(`${BASE_URL}/todo/${todoId}`);
      setTodo(res.data);
    } catch (error) {
      console.error("error", error);
    }
  }

  function handleNameChange(event) {
    setTodo((previousState) => ({
      ...previousState,
      name: event.target.value,
    }));
  }

  async function updateName() {
    try {
      const res = await axios.put(
        `https://66f4d3fe77b5e889709a979c.mockapi.io/todo/${id}`,
        { name: todo.name }
      );
      alert("update successful");
      navigate("/");
    } catch (error) {
      console.error("error", error);
    }
  }

  useEffect(() => {
    fetchTodo(id);
  }, [id]);

  return (
    <>
      <div>edit page {id}</div>
      <div>
        <input value={todo.name} onChange={handleNameChange} />
        {todo.status}
      </div>
      <button onClick={() => updateName()}>Edit</button>
    </>
  );
}

export default Edit;
