// controllers/userController.ts
import type { Request, Response } from "express";
import type { UserType } from "../types/User";
import { findUserByUsername, createNewUser } from "../helpers/userHelpers";

export const createUser = async (
	req: Request<{}, {}, UserType>,
	res: Response
) => {
	const { username, password, email } = req.body;
	if (!username || !password || !email) {
		return res.status(400).json({ error: "All fields are required" });
	}
	if (!email.includes("@")) {
		return res.status(400).json({ error: "Invalid email format" });
	}

	try{
		const existingUser = await findUserByUsername(username);
		if (existingUser) {
			return res.status(409).json({ error: "Username already exists" });
		}
		const newUserId = await createNewUser({ username, password, email });
		return res.status(201).json({ userId: newUserId });
	} 
	
	catch (error) {
		console.error("Error creating user:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
	
};