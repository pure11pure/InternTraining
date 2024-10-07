import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

function UserDetail() {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">รายละเอียดผู้ใช้</h1>
          <div className="mb-4">
            <span className="block text-gray-700 text-sm font-bold mb-2">ชื่อ:</span>
            <span className="block text-gray-600">{user.name}</span>
          </div>
          <div className="mb-6">
            <span className="block text-gray-700 text-sm font-bold mb-2">อีเมล:</span>
            <span className="block text-gray-600">{user.email}</span>
          </div>
          <div className="flex items-center justify-center">
            <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              แก้ไขข้อมูล
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
