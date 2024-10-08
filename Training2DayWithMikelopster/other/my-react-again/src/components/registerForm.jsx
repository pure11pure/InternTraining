// components/RegisterForm.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

function RegisterForm({ onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    try {
      const response = await fetch(
        "https://66f4d3fe77b5e889709a979c.mockapi.io/people",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("ส่งข้อมูลสำเร็จ:", result);

        // เรียกฟังก์ชัน refreshUserList หลังจากส่งข้อมูลสำเร็จ
        onRegisterSuccess();
        // ทำการรีเซ็ตฟอร์มหรือแสดงข้อความสำเร็จตามต้องการ
        setFormData({ name: "", email: "", password: "" });
      } else {
        console.error("เกิดข้อผิดพลาดในการส่งข้อมูล");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-[50%] rounded border-2 border-gray-300 p-4 gap-y-2"
    >
      <div className="flex flex-row gap-x-5">
        <label htmlFor="name" className="content-center w-[20%]">
          Username:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="border border-1 rounded border-gray-500 w-[80%] py-2 px-2"
          required
        />
      </div>

      <div className="flex flex-row gap-x-5">
        <label htmlFor="email" className="content-center w-[20%]">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="border border-1 rounded border-gray-500 w-[80%] py-2 px-2"
          required
        />
      </div>

      <div className="flex flex-row gap-x-5">
        <label htmlFor="password" className="content-center w-[20%]">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="border border-1 rounded border-gray-500 w-[80%] py-2 px-2"
          required
        />
      </div>

      <button
        id="submit-regis1"
        type="submit"
        className="bg-sky-600 rounded p-2 text-white font-bold hover:bg-sky-700 active:bg-sky-800"
      >
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
