import { useState, useEffect } from "react";

function UserSearch() {
  // State สำหรับเก็บค่าที่ผู้ใช้พิมพ์ และข้อมูลที่ได้จาก API
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // แก้ไข Effect สำหรับหน่วงเวลาการค้นหา
  useEffect(() => {
    setUsers([]);
    setLoading(true); // แสดง Loading ทันทีที่เริ่มพิมพ์
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // แก้ไข Effect สำหรับดึงข้อมูลจาก API โดยใช้ async/await
  useEffect(() => {
    const fetchUsers = async () => {
      if (debouncedSearchTerm) {
        try {
          const response = await fetch(
            `https://66f4d3fe77b5e889709a979c.mockapi.io/people?name=${debouncedSearchTerm}`
          );
          const data = await response.json();
          console.log(data);
          if (data == "Not found") {
            setUsers([]);
          } else {
            setUsers(data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setUsers([]);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedSearchTerm]);

  return (
    <div className="w-[50%] p-2 border">
      <h1 className="text-2xl font-bold pb-2">User Search</h1>
      {/* Input สำหรับพิมพ์ search term */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border border-1 border-gray-300 w-[40%] mb-2"
      />

      <div className="h-[250px] overflow-auto">
        {/* แสดงข้อความ Loading ระหว่างดึงข้อมูล */}
        {loading && <p>Loading...</p>}

        {/* แสดงผลลัพธ์การค้นหาผู้ใช้ */}
        {users.length > 0 ? (
          <div>
            {users.map((user, index) => (
              //   <div key={user.id} className="bg-gray-100" >
              <div
                key={user.id}
                className={
                  index % 2 == 0 ? "bg-gray-200 p-2" : "bg-gray-100 p-2"
                }
              >
                <p>
                  <b>Name:</b> {user.name}
                </p>
                <p className="pl-2">
                  <b>Email:</b> {user.email}
                </p>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p>No users found.</p>
        )}
      </div>
    </div>
  );
}

export default UserSearch;
