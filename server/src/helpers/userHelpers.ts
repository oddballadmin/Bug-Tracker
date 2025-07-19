import type { ResultSetHeader } from "mysql2";
import { pool } from "../db";
import type { UserType } from "../types/User";

export const findUserByUsername = async (username: string): Promise<UserType | null> => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [rows] = await conn.query<any[]>(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );` `
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error("Error finding user by username:", error);
        throw new Error("Internal server error");
    } finally {
        if (conn) conn.release();
    }
}

export const createNewUser = async (user: UserType): Promise<number> => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [insertResult] = await conn.query<ResultSetHeader>(
            "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
            [user.username, user.password, user.email]
        );
        return insertResult.insertId;
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Internal server error");
    } finally {
        if (conn) conn.release();
    }
};
