import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

export default function UserProfile() {
  const { user, setUser } = useContext(UserContext); // ดึงข้อมูลจาก UserContext

  const handleChange = () => {
    if (user.name != "Urangotan") {
      setUser({ name: "Urangotan", loggedIn: false });
    } else {
      setUser({ name: "Monkey", loggedIn: true });
    }
  };

  return (
    <div>
      <h1 className="font-bold">User Profile</h1>
      <p>
        <b>Name:</b> {user.name}
      </p>
      <p>
        <b>Status:</b> {user.loggedIn ? "Logged In" : "Logged Out"}
      </p>
      <button onClick={handleChange} className="bg-sky-600 text-white font-bold p-2 rounded">change</button>
    </div>
  );
}
