export type UserContextType = {
    isUserLoggedIn: boolean;
    userName?: string;
    setIsUserLoggedIn: (isLoggedIn: boolean) => void;
    setUserName?: (name: string) => void;
    userId?: string;
    setUserId?: (id: string) => void;
    userEmail?: string;
    setUserEmail?: (email: string) => void;
    role?: string; // Optional, can be used to define user roles
    setRole?: (role: string) => void; // Optional, can be used to
};