import { Request, Response, NextFunction } from 'express';
import { Model } from 'sequelize-typescript';
import jwt, {
    JwtPayload,
    TokenExpiredError,
    JsonWebTokenError,
    NotBeforeError,
} from 'jsonwebtoken';
import logger from '../utils/logger';
import {
    INTERNAL_SERVER_ERROR,
    UNAUTHORIZED,
    UNAUTHENTICATED,
    INVALID_TOKEN,
    TOKEN_EXPIRED,
    INTERNAL_SERVER_ERROR_MESSAGE,
} from '../common/constants';
import User from '../models/user';

declare global {
    namespace Express {
        interface Request {
            user?: { id: string; email: string };
        }
    }
}

type AuthenticatedUser = {
    id: string;
    email: string;
};

type JwtAuthPayload = JwtPayload & {
    sub?: string;
    email?: string;
};

export const ensureAuthentication = (userModel: typeof Model) => {
    const tokenSecret = process.env.TOKEN_SECRET;
    const jwtAlgorithms = (process.env.JWT_ALGORITHMS || 'HS256')
        .split(',')
        .map((alg) => alg.trim())
        .filter(Boolean) as jwt.Algorithm[];

    if (!tokenSecret) {
        throw new Error('TOKEN_SECRET is not defined in environment variables');
    }

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const bearerToken = req.headers.authorization?.startsWith('Bearer ')
                ? req.headers.authorization.slice(7).trim()
                : null;

            const cookieToken =
                typeof req.cookies?.token === 'string'
                    ? req.cookies.token.trim()
                    : null;

            const token = bearerToken || cookieToken;

            if (!token) {
                return res
                    .status(UNAUTHORIZED)
                    .json({ error: UNAUTHENTICATED });
            }

            const payload = jwt.verify(token, tokenSecret, {
                algorithms: jwtAlgorithms,
            }) as JwtAuthPayload;

            const userId =
                typeof payload.sub === 'string' ? payload.sub : undefined;
            const userEmail =
                typeof payload.email === 'string' ? payload.email : undefined;

            logger.info('Auth middleware hit', {
                method: req.method,
                path: req.path,
                originalUrl: req.originalUrl,
                authorizationHeader: req.headers.authorization ?? null,
                cookieTokenPresent:
                    typeof req.cookies?.token === 'string' &&
                    !!req.cookies.token,
            });
            if (!userId) {
                return res.status(UNAUTHORIZED).json({ error: INVALID_TOKEN });
            }

            const userFound = await User.findOne({
                where: { id: userId },
                attributes: ['id', 'email'],
            });

            if (!userFound) {
                return res.status(UNAUTHORIZED).json({ error: INVALID_TOKEN });
            }

            const authenticatedUser: AuthenticatedUser = {
                id: String(userFound.get('id')),
                email: String(userFound.get('email') ?? userEmail ?? ''),
            };

            req.user = authenticatedUser;

            logger.info('Auth middleware passed', {
                userId: authenticatedUser.id,
                path: req.path,
            });
            return next();
        } catch (err: unknown) {
            if (err instanceof TokenExpiredError) {
                return res.status(UNAUTHORIZED).json({ error: TOKEN_EXPIRED });
            }

            if (
                err instanceof NotBeforeError ||
                err instanceof JsonWebTokenError
            ) {
                return res.status(UNAUTHORIZED).json({ error: INVALID_TOKEN });
            }

            logger.error('Auth middleware unexpected error', {
                path: req.path,
                message: err instanceof Error ? err.message : err,
            });

            return res
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        }
    };
};

export default ensureAuthentication;
