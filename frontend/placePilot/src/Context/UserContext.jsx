import React, { createContext, useEffect, useState, useContext } from 'react';
import { authDataContext } from './AuthContext';
import axios from 'axios';

export const userDataContext = createContext();

function UserContext({ children }) {
  const { serverUrl } = useContext(authDataContext);
  const [userData, setUserData] = useState(null);

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/currentuser`,
        { withCredentials: true }
      );
      setUserData(result.data);
    } catch (error) {
      console.error("getCurrentUser error:", error.response?.data || error);
      setUserData(null);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const value = {
    userData,
    setUserData,
    getCurrentUser,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;