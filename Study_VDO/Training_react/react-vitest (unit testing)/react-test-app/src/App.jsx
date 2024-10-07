// import Counter from "./components/Counter";
// import UserList from "./components/UserList";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <>
      {/* <div>Component Counter</div>
      <Counter /> */}
      {/* <div>UserList Component</div>
      <UserList /> */}
      <div className="text-center">Register Component</div>
      <RegisterForm />
    </>
  );
}

export default App;

/**
 * TODO: เวลาจะ Test Counter
 * - component render ได้ไหม
 * - เพิ่มได้
 * - ลดได้
 *
 *  TODO: เวลาจะ Test UserList
 * - ดึงข้อมูล
 * - หาข้อมูลผ่านชื่อ และ email
 *
 * TODO: เวลาจะ Test Register
 * - component render ได้ไหม
 * - ไม่ได้กรอกอะไร สามารถแสดง error
 * - email ผิด format แสดง error ว่า format ผิด (+ check phoneNumber)
 * - กรอกข้อมูลถูกทุกอย่าง กด submit ต้องยิง api ได้ (+ check case api error)
 */
