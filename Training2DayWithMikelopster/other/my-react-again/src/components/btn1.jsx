import PropTypes from "prop-types";

// Component ลูกที่รับ Function เป็น Props
export default function Button1({ handleClick }) {
  return <button onClick={handleClick} className="bg-sky-600 hover:bg-sky-700 active:bg-sky-800 p-2 rounded text-white font-bold">Click Me</button>;
}

Button1.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
