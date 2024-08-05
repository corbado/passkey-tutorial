import {promisePool} from '../database';
import type {AuthenticatorDevice} from '@simplewebauthn/typescript-types';


export const credentialService = {
    async saveNewCredential(userId: string, credentialId: string, publicKey: string, counter: number, transports: string) {
        try {
            await promisePool.query(
                'INSERT INTO credentials (user_id, credential_id, public_key, counter, transports) VALUES (?, ?, ?, ?, ?)',
                [userId, credentialId, publicKey, counter, transports]
            );
        } catch (error) {
            console.error('Error saving new credential:', error);
            throw error;
        }
    },

    async getCredentialByCredentialId(credentialId: string, userId: string): Promise<AuthenticatorDevice | null> {
        try {
            const [rows] = await promisePool.query( "SELECT * FROM credentials WHERE credential_id = ? AND user_id = ? LIMIT 1", [credentialId, userId] )
            // @ts-ignore
            if (rows.length === 0) return null;
            // @ts-ignore
            const row = rows[0];
            return {
                userID: row.user_id,
                credentialID: row.credential_id,
                credentialPublicKey: row.public_key,
                counter: row.counter,
                transports: row.transports ? row.transports.split(',') : [],
            } as AuthenticatorDevice;
        } catch (error) {
            console.error('Error retrieving credential:', error);
            throw error;
        }
    },

    async updateCredentialCounter(credentialId: string, newCounter: number) {
        try {
            await promisePool.query(
                'UPDATE credentials SET counter = ? WHERE credential_id = ?',
                [newCounter, credentialId]
            );
        } catch (error) {
            console.error('Error updating credential counter:', error);
            throw error;
        }
    }
};