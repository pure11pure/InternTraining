import PropTypes from "prop-types";

// Component ลูกที่ใช้ Props เพื่อแสดงข้อมูล
export default function Greeting({ name, age, index }) {
  return (
    <div className={index % 2 == 0 ? "p-4 bg-sky-50" : "p-4 bg-sky-100"}>
      <h1>
        Hello, <b>{name}!</b>
      </h1>
      <p>
        You are <b>{age}</b> years old.
      </p>
    </div>
  );
}

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
};
