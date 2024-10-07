import React, { createContext, useState } from 'react';

// Create Context
export const UserContext = createContext();

// UserProvider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'จอห์น โด',
    email: 'john@example.com',
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
