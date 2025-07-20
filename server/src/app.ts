// app.ts
import express from "express";
import cors from "cors";
import userRoutes from "./routes/users/userRoutes";
import bugRoutes from "./routes/bugs/bugRoutes";
import { connectToDatabase } from "./db";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

const main = async () => {
	await connectToDatabase(); // ensure pool is initialized

	// Middleware setup
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	app.use(cookieParser());

	// CORS configuration
	const corsOptions = {
		credentials: true, // allow credentials (cookies, authorization headers, etc.)
		origin: "http://localhost:5173",

		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		allowedHeaders: "Content-Type,Authorization",
	};

	// Enable CORS with specific options
	app.use(cors(corsOptions));

	// Define routes
	app.use("/api/users", userRoutes);
	app.use("/api/bugs", bugRoutes);

	app.get("/", (_, res) => res.send("Welcome to the Bug Tracker API"));

	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
};

// catch any errors during server startup
main().catch((err) => {
	console.error("Failed to start server:", err);
	process.exit(1);
});
