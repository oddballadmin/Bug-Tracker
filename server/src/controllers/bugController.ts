// controllers/userController.ts
import type { Request, Response } from "express";
import type { UserType } from "../types/User";

import { createNewBug,findBugById, getAllBugs } from "../helpers/bugsHelpers";
import { BugType } from "../types/Bug";


export const createBug = async (
    req: Request<{}, {}, BugType>,
    res: Response
) => {
    const { title, description } = req.body;

    if (!title || !description ) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const cookieData = req.cookies.auth || '{}';
    const reportedBy = cookieData.id;
    try {
        console.log(reportedBy)
        const newBugId = await createNewBug({
            title,
            description,
            reported_by: reportedBy
        });
        return res.status(201).json({ bugId: newBugId });
    } catch (error) {
        console.error("Error creating bug:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const getBugById = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    const { id } = req.params;

    try {
        const bug = await findBugById(id);
        if (!bug) {
            return res.status(404).json({ error: "Bug not found" });
        }
        return res.status(200).json(bug);
    } catch (error) {
        console.error("Error fetching bug:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const getBugs = async (
    req: Request,
    res: Response
) => {
    try {
        const bugs = await getAllBugs();
        if (!bugs || bugs.length === 0) {
            return res.status(404).json({ error: "No bugs found" });
        }
        return res.status(200).json(bugs) ;
    } catch (error) {
        console.error("Error fetching all bugs:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
