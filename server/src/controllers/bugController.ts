// controllers/userController.ts
import type { Request, Response } from "express";
import type { UserType } from "../types/User";

import { createNewBug,findBugById } from "../helpers/bugsHelpers";
import { BugType } from "../types/Bug";


export const createBug = async (
    req: Request<{}, {}, BugType>,
    res: Response
) => {
    const { title, description, status, reported_by, assigned_to } = req.body;

    if (!title || !description || !status || !reported_by) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const newBugId = await createNewBug({
            title,
            description,
            status,
            reported_by,
            assigned_to
        });
        return res.status(201).json({ bugId: newBugId });
    } catch (error) {
        console.error("Error creating bug:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};