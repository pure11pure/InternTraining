import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function UserForm() {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState(user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formData);
    navigate("/user/1");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">แก้ไขข้อมูลผู้ใช้</h1>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              ชื่อ:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              อีเมล:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
