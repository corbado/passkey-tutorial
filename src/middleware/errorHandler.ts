import { Request, Response, NextFunction } from 'express';
import { CustomError } from './customError';
interface ErrorWithStatus extends Error {
    statusCode?: number;
}

export const handleError = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    console.log(message)
    res.status(statusCode).send({ error: message });
};
