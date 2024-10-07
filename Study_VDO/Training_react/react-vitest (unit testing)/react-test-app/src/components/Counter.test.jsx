import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import Counter from "./Counter";

// *describe > ระบุสิ่งที่ต้องการเทส, ระบุชื่อ set test
describe("Test Counter Component", () => {
  // *beforeEach ทำก่อนในการ run test !!! โดยจะมีการ render ใหม่ทุกครั้งในแต่ละ CASE
  beforeEach(() => {
    render(<Counter />);
  });

  /**
   *  TODO: Case 1
   *  > โดยจะเช็คว่ามีคำว่า counter หรือไม่
   */

  //*it > พูดถึงชื่อของ test case
  //*expect > ตรวจสอบผลลัพท์ของการ test เช่น เท่ากับ, มีค่านี้ไหม, ค่านี้ไม่มีอยู่จริงใช่ป่าว
  it("should render counter", () => {
    //*screen หา dom ที่มีคำว่า 'Counter:'
    expect(screen.getByText(/Counter:/)).toBeInTheDocument(); //toBeInTheDocument (=เป็นอยู่จริง)
  });

  /**
   *  TODO: Case 2
   *  > โดยจะเช็คว่าเมื่อมีการกด 'Increment' แล้วเจอ 'Counter: 1' ไหม
   */

  //*fireEvent > การทำ event ต่างๆ ที่สามารถทำบน dom ได้
  it("increments counter", () => {
    fireEvent.click(screen.getByText("Increment"));
    expect(screen.getByText("Counter: 1")).toBeInTheDocument();
  });

  /**
   *  TODO: Case 3
   *  > โดยจะเช็คว่าเมื่อมีการกด 'Decrement' แล้วเจอ 'Counter: -1' ไหม
   */

  it("decrements counter", () => {
    fireEvent.click(screen.getByText("Decrement"));
    expect(screen.getByText("Counter: -1")).toBeInTheDocument();
  });
});
