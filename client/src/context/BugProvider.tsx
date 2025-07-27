import type { ReactNode } from "react";
import { useState, useMemo, useEffect } from "react";
import { BugContext } from "./BugContext";
import type { BugType } from "../types/BugType";
import { getAllBugs } from "../dataHelpers/bugs";

interface BugProviderProps { children: ReactNode; }

export interface BugContextType {
  bugList: BugType[];
  setBugList: (bugs: BugType[]) => void;
}

export const BugProvider = ({ children }: BugProviderProps) => {
  const [bugList, setBugList] = useState<BugType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bugs = await getAllBugs();
        console.log("Fetched bugs:", bugs);
        setBugList(bugs);
      } catch (err) {
        console.error("Error fetching bugs:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("bugList updated:", bugList);
  }, [bugList]);

  const value = useMemo<BugContextType>(
    () => ({ bugList, setBugList }),
    [bugList]
  );

  return (
    <BugContext.Provider value={value}>
      {children}
    </BugContext.Provider>
  );
};
