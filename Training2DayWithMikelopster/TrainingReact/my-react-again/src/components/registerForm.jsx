// components/RegisterForm.js
import React, { useState } from "react";

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-[50%] rounded border-2 border-gray-300 p-4 gap-y-2"
    >
      <div className="flex flex-row gap-x-5">
        <label htmlFor="username" className="content-center w-[20%]">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
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
        type="submit"
        className="bg-sky-600 rounded p-2 text-white font-bold hover:bg-sky-700 active:bg-sky-800"
      >
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
