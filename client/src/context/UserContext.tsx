import { createContext } from "react";
import type { UserContextType } from "./../types/UserTypes";

export const UserContext = createContext<UserContextType>({
  isUserLoggedIn: false,
  userName: undefined,
  userId: undefined,
  userEmail: undefined,
  role: undefined,
  setIsUserLoggedIn: () => {},
  setUserName: () => {},
  setUserId: () => {},
  setUserEmail: () => {},
  setRole: () => {},
});








