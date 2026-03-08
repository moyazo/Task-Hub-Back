import { Request, Response, NextFunction } from 'express';
import { Model } from 'sequelize-typescript';
import jwt, {
    JwtPayload,
    TokenExpiredError,
    JsonWebTokenError,
} from 'jsonwebtoken';
import logger from '../utils/logger';
import {
    NOT_FOUND_MESSAGE,
    INTERNAL_SERVER_ERROR,
    UNAUTHORIZED,
    UNAUTHENTICATED,
    INVALID_TOKEN,
    TOKEN_EXPIRED,
    INTERNAL_SERVER_ERROR_MESSAGE,
} from '../common/constants';

declare global {
    namespace Express {
        interface Request {
            user?: { id: string; email: string };
        }
    }
}

export const ensureAuthentication = (userModel: typeof Model) => {
    const TOKEN_SECRET = process.env.TOKEN_SECRET;
    if (!TOKEN_SECRET) {
        // Fail fast: que la app no arranque si falta SECRET
        throw new Error('TOKEN_SECRET is not defined in environment variables');
    }

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token =
                (req.headers.authorization?.startsWith('Bearer ')
                    ? req.headers.authorization.slice(7)
                    : req.cookies?.token) || null;

            if (!token)
                return res
                    .status(UNAUTHORIZED)
                    .json({ error: UNAUTHENTICATED });

            const payload = jwt.verify(token, TOKEN_SECRET) as JwtPayload;

            const email = payload.email as string | undefined;
            const sub = payload.sub as string | undefined;

            if (!email && !sub)
                return res.status(UNAUTHORIZED).json({ error: INVALID_TOKEN });

            const userQuery = email
                ? { where: { email } }
                : { where: { id: sub } };
            const userFound = await (userModel as any).findOne({
                ...userQuery,
                attributes: ['id', 'email'],
            });

            if (!userFound)
                return res
                    .status(UNAUTHORIZED)
                    .json({ error: NOT_FOUND_MESSAGE });

            req.user = {
                id: String(userFound.get('id')),
                email: String(userFound.get('email')),
            };
            logger.info('Authenticated request', {
                path: req.path,
                userId: req.user.id,
            });

            next();
        } catch (err: any) {
            if (err instanceof TokenExpiredError)
                return res.status(UNAUTHORIZED).json({ error: TOKEN_EXPIRED });
            if (err instanceof JsonWebTokenError)
                return res.status(UNAUTHORIZED).json({ error: INVALID_TOKEN });

            logger.error('Auth middleware unexpected error', {
                path: req.path,
                err,
            });
            return res
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        }
    };
};

export default ensureAuthentication;
