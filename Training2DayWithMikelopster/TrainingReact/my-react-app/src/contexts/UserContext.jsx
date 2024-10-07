import { createContext, useState } from "react";
import PropTypes from "prop-types";

// Create Context
export const UserContext = createContext();

// UserProvider Component
export default function UserProvider({ children }) {
  const [user, setUser] = useState({ name: "punnaporn", email: "pure@gmail.com" });

  const updateUser = (name, email) => {
    setUser({ name, email });
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
