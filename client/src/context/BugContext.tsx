import { createContext } from "react";
import type { BugContextType } from "./BugProvider";

export const BugContext = createContext<BugContextType>({
  bugList: [],
  setBugList: () => {},
});
