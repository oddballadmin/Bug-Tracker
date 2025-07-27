import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../db";
import { BugType } from "../types/Bug";

export const findBugById = async (id: string): Promise<BugType | null> => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [rows] = await conn.query<RowDataPacket[]>(
            "SELECT * FROM bugs WHERE id = ?",
            [id]
        );
        return rows.length > 0 ? rows[0] as BugType : null;
    } catch (error) {
        console.error("Error finding bug by ID:", error);
        throw new Error("Internal server error");
    } finally {
        if (conn) conn.release();
    }
}

export const createNewBug = async (bug: BugType): Promise<number> => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [insertResult] = await conn.query<ResultSetHeader>(
            "INSERT INTO bugs (title, description, reported_by) VALUES (?, ?, ?)",
            [bug.title, bug.description, bug.reported_by]
        );
        return insertResult.insertId;
    } catch (error) {
        console.error("Error creating bug:", error);
        throw new Error("Internal server error");
    } finally {
        if (conn) conn.release();
    }
};
export const getAllBugs = async () => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [rows] = await conn.query<RowDataPacket[]>(
            "SELECT * FROM bugs"
        );
        return rows as BugType[];
    } catch (error) {
        console.error("Error fetching all bugs:", error);
        throw new Error("Internal server error");
    } finally {
        if (conn) conn.release();
    }
}

