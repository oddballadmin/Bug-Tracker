// controllers/userController.ts
import type { Request, Response } from "express";
import type { UserType } from "../types/User";
import { findUserByUsername, createNewUser } from "../helpers/userHelpers";
import { setCookieAuth } from "../helpers/setCookieAuth";

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
		setCookieAuth({ username, email, id: newUserId });

		return res.status(201).json({ userId: newUserId });
	} 
	
	catch (error) {
		console.error("Error creating user:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
	
};

export const signIn = async (
	req: Request<{}, {}, { username: string; password: string }>,
	res: Response
) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ error: "Username and password are required" });
	}

	try {
		const user = await findUserByUsername(username);
		if (!user || user.password !== password) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		const cookieData = setCookieAuth({ username: user.username, email: user.email, id: user.id });
		res.cookie("auth", cookieData.user, cookieData.options);

		return res.status(200).json({ message: "Login successful", userId: user.id });
	} catch (error) {
		console.error("Error signing in:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}