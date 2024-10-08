import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

// สร้าง Context
export const UserContext = createContext();

// สร้าง Component ที่ห่อหุ้มด้วย UserContext.Provider เพื่อแชร์ข้อมูล
export default function UserProvider({ children }) {
  const [user, setUser] = useState({ name: "Monkey", loggedIn: true });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

