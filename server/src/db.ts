import mysql, { ConnectionOptions } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const pool = mysql.createPool({
	host: process.env.HOST || "localhost",
	user: process.env.USER || "root",
	database: process.env.DB || "bugtracker",
	password: process.env.PASSWORD || "",
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
	maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
	idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
	enableKeepAlive: true,
	keepAliveInitialDelay: 0,
});

export const connectToDatabase = async () => {
	try {
		const connection = await pool.getConnection();
		console.log("Connected to the database successfully.");
		connection.release();
	} catch (error) {
		console.error("Error connecting to the database:", error);
		throw error;
	}
}