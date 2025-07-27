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
		setCookieAuth({ username, email, id: newUserId, role: "user", num_bugs_reported: 0 });

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
	

	try {
		const user = await findUserByUsername(username);
		
		if (!user || user.password !== password) {
			return res.status(401).json({ error: "Invalid username or password" });
		}
		const cookieData = setCookieAuth({ username: user.username, email: user.email, id: user.id, role: user.role, num_bugs_reported: user.num_bugs_reported });
		res.cookie(
			"auth",
			cookieData.user
		);

		return res.status(200).json({ message: "Login successful", userId: user.id });
	} catch (error) {
		console.error("Error signing in:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}

export const getUserByID = async (
	req: Request<{ id: string }>,
	res: Response
) => {
	const userId = parseInt(req.params.id, 10);
	if (isNaN(userId)) {
		return res.status(400).json({ error: "Invalid user ID" });
	}

	try {
		let user;
		if (req.cookies.auth) {
			const cookieData = JSON.parse(req.cookies.auth);
			if (cookieData.id === userId) {
				user = { username: cookieData.username, email: cookieData.email, id: cookieData.id };
			} else {
				user = await findUserByUsername(cookieData.username);
			}
		} else {
			user = await findUserByUsername(req.query.username as string);
		}
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		return res.status(200).json(user);
	} catch (error) {
		console.error("Error fetching user:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}