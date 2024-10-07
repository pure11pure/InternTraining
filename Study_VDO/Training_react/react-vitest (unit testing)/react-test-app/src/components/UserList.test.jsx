import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import UserList from "./UserList";

// Mock axios > axios หลังจากนี้จะไม่ได้ไปยิ่ง API จริงๆ
vi.mock("axios");

// TEST CASE
describe("Test UserList component", () => {
  const mockUsers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phoneNumber: "1234567890",
    },
    {
      id: "2",
      name: "Jane Doe",
      email: "jane@example.com",
      phoneNumber: "0987654321",
    },
  ];

  //   TODO: CASE 1 (render component ได้หรือไหม และได้ผลลัพท์จาก api จริงๆหรือไม่ )
  it("renders the table successfully when API call succeeds", async () => {
    // mockResolvedValue > mock data (เพราะตอน   setUsers(response.data); มันรับข้อมูลมาจาก data)
    axios.get.mockResolvedValue({ data: mockUsers });
    render(<UserList />);

    // *waitFor > จำลองการดึงข้อมูลจาก api แป๊ปนึง เพื่อให้มันใจว่าสามารถดึงข้อมูลได้
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    });
  });

  //   TODO: Search
  it("filters users based on search input", async () => {
    axios.get.mockResolvedValue({ data: mockUsers });
    render(<UserList />);

    await waitFor(() => {
      // placeholder="Search by name or email"
      fireEvent.change(screen.getByPlaceholderText("Search by name or email"), {
        target: { value: "John" },
      });
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.queryByText("Jane Doe")).not.toBeInTheDocument();

      /**
       * getByText >  no match = return 'throw'
       * queryByText > no match = return 'null'
       */
    });
  });

  //   case api error
  it("handles API failure without problems and still renders", async () => {
    axios.get.mockRejectedValue(new Error("API call failed"));
    // spyOn = mock function คือบางอย่างไม่สามารถ run ตอนทำ unit test ได้ เพราะมันไม่ได้ render หน้าจริงๆออกมา เช่น console, window, alert
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {}); //ป้องกัน error

    render(<UserList />);

    await waitFor(() => {
      /**
       * ตรวจสอบ 1 :  console.error เช็คว่าทำงานจริงรึป่าว
       * catch (error) {
       * console.error("Error fetching users:", error);
       * }
       */
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching users:",
        expect.any(Error)
      );

      /**
       * ตรวจสอบ 2 :  เช็คว่ายังสามารถ render ช่องsearch อยู่ ใช้งานได้เหมือนเดิม
       */
      expect(
        screen.getByPlaceholderText("Search by name or email")
      ).toBeInTheDocument();
    });

    consoleSpy.mockRestore(); //mock function บางทีมีใช้ซ้ำกันก็ควร re ด้วย
  });
});
