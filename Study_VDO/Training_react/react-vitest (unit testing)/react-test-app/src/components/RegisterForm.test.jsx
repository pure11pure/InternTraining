import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/react";
import RegisterForm from "./RegisterForm";
import axios from "axios";

// Mock axios to avoid real API calls
vi.mock("axios");

describe("App component", () => {
  beforeAll(() => {
    // Mock window.alert > run / setting รอบเดียว
    global.window.alert = vi.fn();
  });

  // TODO : Case 1
  it("renders the form", () => {
    // การสร้างตัวแปรขึ้นมาเก็บเพื่อ focus เฉพาะ dom ในการ render เท่านั้น โดยในการเช็คไม่ต้องไปใช้ screen
    // '/i' คือเป็น case ที่ไม่สนใจตัวพมพ์เล็กและตัวพิมพ์ใหญ่
    const { getByLabelText, getByText } = render(<RegisterForm />);
    expect(getByLabelText(/name/i)).toBeInTheDocument();
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(getByText(/submit/i)).toBeInTheDocument();
  });

  // TODO : Case 2
  it("shows validation errors", () => {
    const { getByText } = render(<RegisterForm />);

    fireEvent.click(getByText(/submit/i));

    expect(getByText(/name is required/i)).toBeInTheDocument();
    expect(getByText(/email is required/i)).toBeInTheDocument();
    expect(getByText(/phone number is required/i)).toBeInTheDocument();
  });

  // TODO : Case 3
  it("shows validation email format errors", () => {
    const { getByLabelText, getByText } = render(<RegisterForm />);

    /**
     * <label htmlFor="name"> Name </label>
     * <input type="text" id="name" name="name"/>
     *
     * *'htmlFor' จะเชื่อมกับ 'id'
     *
     * วิธีการในการ select
     * 1. placeholder=""
     * 2. ผ่าน label htmlFor
     * 3. Testid
     */
    fireEvent.change(getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: "johndoe@example" },
    });
    fireEvent.change(getByLabelText(/phone number/i), {
      target: { value: "1234567890" },
    });

    fireEvent.click(getByText(/submit/i));

    expect(getByText(/email is invalid/i)).toBeInTheDocument();
  });

  // TODO : Case 4
  it("submits form successfully", async () => {
    const { getByLabelText, getByText } = render(<RegisterForm />);
    const mockResponse = {
      data: {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        phoneNumber: "1234567890",
      },
    };

    axios.post.mockResolvedValue(mockResponse);

    fireEvent.change(getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.change(getByLabelText(/phone number/i), {
      target: { value: "1234567890" },
    });

    fireEvent.click(getByText(/submit/i));

    await waitFor(() => {
      // เป็นการเช็คว่า ยิง api แล้วส่งข้อมูลแบบนี้จริงไหม
      expect(axios.post).toHaveBeenCalledWith(
        "https://66f4d3fe77b5e889709a979c.mockapi.io/users",
        {
          name: "John Doe",
          email: "johndoe@example.com",
          phoneNumber: "1234567890",
        }
      );
    });
  });
});
