import type { ReactNode } from "react";
import { useState, useMemo, useEffect } from "react";
import { useCookies } from "react-cookie";
import { UserContext } from "./UserContext";
import type { UserContextType, UserInfo } from "../types/UserTypes";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [cookies] = useCookies(["auth"]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string>();
  const [userId, setUserId] = useState<string>();
  const [userEmail, setUserEmail] = useState<string>();
  const [role, setRole] = useState<string>();

  // Sync context state with the "auth" cookie
  useEffect(() => {
    const raw = cookies.auth;

    if (!raw) {
      setIsUserLoggedIn(false);
      setUserName(undefined);
      setUserId(undefined);
      setUserEmail(undefined);
      setRole(undefined);
      return;
    }

    try {
      // Handle both string and object cookie values
      const data: UserInfo = typeof raw === "string"
        ? JSON.parse(raw)
        : raw;

      console.log("🔑 [UserProvider] Parsed user data:", data);

      setIsUserLoggedIn(data.loggedIn);
      setUserName(data.username);
      setUserId(data.id.toString());
      setUserEmail(data.email);
      setRole(data.role);

      console.log("User data loaded from cookie:", {
        isUserLoggedIn: data.loggedIn,
        userName: data.username,
        userId: data.id,
        userEmail: data.email,
        role: data.role,
      });
    } catch (err) {
      console.error("Failed to parse auth cookie:", err, "raw:", raw);
      setIsUserLoggedIn(false);
      setUserName(undefined);
      setUserId(undefined);
      setUserEmail(undefined);
      setRole(undefined);
    }
  }, [cookies.auth]);

  const value = useMemo<UserContextType>(
    () => ({
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
    }),
    [isUserLoggedIn, userName, userId, userEmail, role]
  );

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
