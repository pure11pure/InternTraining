import Button1 from "../components/btn1";
import { Link } from "react-router-dom";

export default function Home() {
  const alertMessage = () => {
    alert("Button clicked!");
  };

  return (
    <div className="flex p-5">
      <Button1 handleClick={alertMessage} />
      <button className="px-2 bg-amber-700 text-white rounded font-bold m-2">
        <Link to="/home">show</Link>
      </button>
    </div>
  );
}
