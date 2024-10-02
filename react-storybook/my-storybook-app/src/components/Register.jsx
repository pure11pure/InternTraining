import { useState } from "react";
import axios from "axios";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});

  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(values.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number, should be 10 digits";
    }
    return errors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validate(formData);
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          "https://65a25d5342ecd7d7f0a771bd.mockapi.io/users",
          formData
        );
        if (!response.data) throw new Error("Error in form submission");
        // Handle success here
        alert("Register successful!");
      } catch (error) {
        // Handle errors here
        console.log("error", error);
        alert("Register fail!");
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mx-auto my-8 max-w-sm">
        <h1 className="mb-2 text-3xl">Register Form</h1>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={formData.name}
            data-testid="name"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            data-testid="email"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="phoneNumber"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            onChange={handleChange}
            value={formData.phoneNumber}
            data-testid="phoneNumber"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.phoneNumber && (
            <p className="text-xs text-red-500">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
        >
          Submit
        </button>
      </form>
    </>
  );
}
