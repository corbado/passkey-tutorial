import {generateRegistrationOptions, verifyRegistrationResponse} from '@simplewebauthn/server';
import {uint8ArrayToBase64} from '../utils/utils';
import {rpName, rpID, origin} from '../utils/constants';
import {credentialService} from '../services/credentialService';
import {userService} from '../services/userService'
import {RegistrationResponseJSON} from "@simplewebauthn/typescript-types";
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../middleware/customError';


export const handleRegisterStart = async (req: Request, res: Response, next: NextFunction) => {
    const {username} = req.body;

    if (!username) {
        return next(new CustomError('Username empty', 400));
    }

    try {
        let user = await userService.getUserByUsername(username);
        if (user) {
            return next(new CustomError('User already exists', 400));
        } else {
            user = await userService.createUser(username);
        }

        const options = await generateRegistrationOptions({
            rpName,
            rpID,
            userID: user.id,
            userName: user.username,
            timeout: 60000,
            attestationType: 'direct',
            excludeCredentials: [],
            authenticatorSelection: {
                residentKey: 'preferred',
            },
            // Support for the two most common algorithms: ES256, and RS256
            supportedAlgorithmIDs: [-7, -257],
        });
        req.session.loggedInUserId = user.id;
        req.session.currentChallenge = options.challenge;
        res.send(options);
    } catch (error) {
        next(error instanceof CustomError ? error : new CustomError('Internal Server Error', 500));
    }
};

export const handleRegisterFinish = async (req: Request, res: Response, next: NextFunction) => {
    const {body} = req;
    const {currentChallenge, loggedInUserId} = req.session;

    if (!loggedInUserId) {
        return next(new CustomError('User ID is missing', 400));
    }

    if (!currentChallenge) {
        return next(new CustomError('Current challenge is missing', 400));
    }

    try {
        const verification = await verifyRegistrationResponse({
            response: body as RegistrationResponseJSON,
            expectedChallenge: currentChallenge,
            expectedOrigin: origin,
            expectedRPID: rpID,
            requireUserVerification: true,
        });

        if (verification.verified && verification.registrationInfo) {
            const {credentialPublicKey, credentialID, counter} = verification.registrationInfo;

            const transportsString = JSON.stringify(body.response.transports)

            await credentialService.saveNewCredential(
                loggedInUserId,
                uint8ArrayToBase64(credentialID),
                uint8ArrayToBase64(credentialPublicKey),
                counter,
                transportsString);
            res.send({verified: true});
        } else {
            next(new CustomError('Verification failed', 400));
        }
    } catch (error) {
        next(error instanceof CustomError ? error : new CustomError('Internal Server Error', 500));
    } finally {
        req.session.loggedInUserId = undefined;
        req.session.currentChallenge = undefined;
    }
};