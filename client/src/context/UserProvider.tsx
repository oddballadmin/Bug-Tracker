

import type { ReactNode } from "react";
import { useState, useMemo } from "react";
import { UserContext } from "./UserContext";
import type { UserContextType } from "../types/UserTypes";

interface UserProviderProps {
    children: ReactNode;
}





interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userName, setUserName]         = useState<string>();
  const [userId, setUserId]             = useState<string>();
  const [userEmail, setUserEmail]       = useState<string>();
  const [role, setRole]                 = useState<string>();

  // Memoize the context value so that consumers only re-render
  // when one of these dependencies actually changes.
  const value = useMemo<UserContextType>(() => ({
    isUserLoggedIn,
    userName,
    userId,
    userEmail,
    role,
    setIsUserLoggedIn,
    setUserName,
    setUserId,
    setUserEmail,
    setRole,
  }), [
    isUserLoggedIn,
    userName,
    userId,
    userEmail,
    role,
  ]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};