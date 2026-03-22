import express, { Express, Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import 'reflect-metadata';
import db from './src/models';
import { ensureAuthentication } from './src/middlewares/auth';
import logger from './src/utils/logger';
import path from 'path';
import fs from 'fs';
import { PUBLIC_ROUTES } from './src/common/constants';

dotenv.config();

const userModel = db.sequelize.models.User;

const getRequiredEnv = (name: string): string => {
    const value = process.env[name]?.trim();
    if (!value) {
        throw new Error(`Missing required env var: ${name}`);
    }
    return value;
};

const parseAllowedOrigins = (): string[] => {
    const raw =
        process.env.CORS_ORIGINS ||
        process.env.URLFRONTEND ||
        'http://localhost:3000';
    return raw
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);
};

const isPublicRoute = (requestPath: string): boolean => {
    return PUBLIC_ROUTES.some((route) => {
        const normalized = route.endsWith('/') ? route.slice(0, -1) : route;
        return (
            requestPath === normalized ||
            requestPath.startsWith(`${normalized}/`)
        );
    });
};

const startApp = async () => {
    getRequiredEnv('TOKEN_SECRET');

    const app: Express = express();
    const port = Number(process.env.PORT || 8000);
    const allowedOrigins = parseAllowedOrigins();

    if (Number.isNaN(port) || port <= 0) {
        throw new Error('Invalid PORT value');
    }

    if (process.env.NODE_ENV === 'production') {
        app.set('trust proxy', 1);
    }

    app.disable('x-powered-by');

    app.use(
        helmet({
            contentSecurityPolicy: false,
            crossOriginEmbedderPolicy: false,
        })
    );

    app.use(
        cors({
            origin: (origin, callback) => {
                if (!origin) {
                    return callback(null, true);
                }

                if (allowedOrigins.includes(origin)) {
                    return callback(null, true);
                }

                logger.warn('Blocked by CORS', { origin });
                return callback(new Error('CORS not allowed'));
            },
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        })
    );

    app.use(express.json({ limit: '100kb' }));
    app.use(express.urlencoded({ extended: false, limit: '100kb' }));
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use(compression());

    const globalLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 200,
        standardHeaders: true,
        legacyHeaders: false,
    });

    const authLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 20,
        standardHeaders: true,
        legacyHeaders: false,
    });

    app.use(globalLimiter);
    app.use('/auth', authLimiter);

    app.use((req, res, next) => {
        if (isPublicRoute(req.path)) {
            return next();
        }

        return ensureAuthentication(userModel)(req, res, next);
    });

    const routesPath = path.join(__dirname, 'src/routes');

    fs.readdirSync(routesPath).forEach((file) => {
        const isRouteFile =
            (file.endsWith('.js') || file.endsWith('.ts')) &&
            !file.endsWith('.d.ts');
        if (!isRouteFile) {
            return;
        }

        const routeModule = require(path.join(routesPath, file));
        const route = routeModule.default || routeModule;
        const baseName = path.basename(file, path.extname(file)).split('.')[0];
        app.use(`/${baseName}`, route);
        logger.info(`Ruta /${baseName} registrada desde archivo ${file}`);
    });

    app.use((req: Request, res: Response) => {
        return res.status(404).json({ error: 'Route not found' });
    });

    app.use(
        (err: unknown, req: Request, res: Response, _next: NextFunction) => {
            const message =
                err instanceof Error ? err.message : 'Unknown error';

            logger.error('Unhandled error', {
                method: req.method,
                path: req.originalUrl,
                message,
                stack:
                    process.env.NODE_ENV === 'development' &&
                    err instanceof Error
                        ? err.stack
                        : undefined,
            });

            return res.status(500).json({
                error:
                    process.env.NODE_ENV === 'production'
                        ? 'Internal server error'
                        : message,
            });
        }
    );

    await db.sequelize.authenticate();
    logger.info('Database connected');

    const server = app.listen(port, () => {
        logger.info(`App listening on port ${port}`);
    });

    server.on('error', (error) => {
        logger.error('Server startup error', {
            error: error instanceof Error ? error.message : error,
        });
        process.exit(1);
    });
};

startApp().catch((error: unknown) => {
    logger.error('Fatal startup error', {
        error: error instanceof Error ? error.message : error,
    });
    process.exit(1);
});
