import { useContext } from "react";


import { BugContext } from "./BugContext";

const useBugContext = () => {
    const context = useContext(BugContext);
    if (!context) {
        throw new Error("useBugContext must be used within a BugProvider");
    }
    return context;
};

export default useBugContext;