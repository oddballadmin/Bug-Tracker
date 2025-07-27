export type UserContextType = {
    isUserLoggedIn: boolean;
    userName?: string;
    setIsUserLoggedIn: (isLoggedIn: boolean) => void;
    setUserName?: (name: string) => void;
    userId?: number;
    setUserId?: (id: number) => void;
    userEmail?: string;
    setUserEmail?: (email: string) => void;
    role?: string; // Optional, can be used to define user roles
    setRole?: (role: string) => void; // Optional, can be used to
};
export type UserInfo = {
  id: number;
  username: string;
  email: string;
  loggedIn: boolean;
  role: string;
  num_bugs_reported: number;
};