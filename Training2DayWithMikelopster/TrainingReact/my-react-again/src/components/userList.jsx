import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    //  Function  async สำหรับการดึงข้อมูล
    async function fetchUsers() {
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
    }

    // เรียกใช้ Function  fetchUsers
    fetchUsers();
  }, []); // ทำงานเพียงครั้งเดียวเมื่อ component ถูก mount

  return (
    <div className="w-[30%] p-2 border">
      <div className="flex flex-row">
        <h2 className="text-2xl font-bold pb-2">User List</h2>
        <button className="px-2 bg-amber-700 text-white rounded font-bold m-2">
          <Link to="/userList">show</Link>
        </button>
      </div>
      <div>
        {users.map((user) => (
          <div key={user.id} className="py-1 pl-5">
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
