import { promisePool } from '../database'; // Adjust the import path as necessary
import { v4 as uuidv4 } from 'uuid';


export const userService = {
    async getUserById(userId: string) {
        const [rows] = await promisePool.query('SELECT * FROM users WHERE id = ?', [userId]);
        // @ts-ignore
        return rows[0];
    },

    async getUserByUsername(username: string) {
        try {
            const [rows] = await promisePool.query('SELECT * FROM users WHERE username = ?', [username]);
            // @ts-ignore
            return rows[0];
        } catch (error) {
            return null;
        }
    },

    async createUser(username: string) {
        const id = uuidv4();
        await promisePool.query('INSERT INTO users (id, username) VALUES (?, ?)', [id, username]);
        return { id, username };

    }
};