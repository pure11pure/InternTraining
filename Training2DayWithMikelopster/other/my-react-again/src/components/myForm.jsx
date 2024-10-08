import useForm from "../้hooks/useForm"; // นำเข้า Custom Hook ที่สร้างไว้

export default function MyForm() {
  // ใช้ Custom Hook useForm โดยกำหนดค่าเริ่มต้นของฟอร์ม
  const { values, handleChange, resetForm } = useForm({
    username: "",
    email: "",
    password: "",
  });

  //  Function สำหรับจัดการเมื่อฟอร์มถูก submit
  const handleSubmit = (event) => {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้าเว็บ
    console.log("Form Data:", values); // แสดงข้อมูลฟอร์มที่ถูกกรอก
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div>
        <label className="font-bold">Username: </label>
        <input
          type="text"
          name="username"
          value={values.username} // เชื่อมต่อค่ากับ state ของฟอร์ม
          className="border p-1 rounded my-2"
          onChange={handleChange} // เรียก handleChange เมื่อมีการเปลี่ยนแปลงค่า
        />
      </div>
      <div>
        <label className="font-bold">Email: </label>
        <input
          type="email"
          name="email"
          value={values.email} // เชื่อมต่อค่ากับ state ของฟอร์ม
          className="border p-1 rounded my-2"
          onChange={handleChange} // เรียก handleChange เมื่อมีการเปลี่ยนแปลงค่า
        />
      </div>
      <div>
        <label className="font-bold">Password: </label>
        <input
          type="password"
          name="password"
          value={values.password} // เชื่อมต่อค่ากับ state ของฟอร์ม
          className="border p-1 rounded my-2"
          onChange={handleChange} // เรียก handleChange เมื่อมีการเปลี่ยนแปลงค่า
        />
      </div>
      <div>
        <button
          type="submit"
          className="bg-sky-600 text-white p-2 rounded font-bold mx-3"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={resetForm}
          className="mx-3 bg-orange-400 text-white p-2 rounded font-bold"
        >
          Reset
        </button>{" "}
        {/* ปุ่มรีเซ็ตฟอร์ม */}
      </div>
    </form>
  );
}
