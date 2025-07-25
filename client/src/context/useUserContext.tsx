import { useContext } from "react";


import { UserContext } from "./UserContext";

const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};

export default useUserContext;