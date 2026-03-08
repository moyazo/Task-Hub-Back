import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
dotenv.config();

import db from './models';
import { ensureAuthentication } from './src/middleware/auth';
import logger from './src/utils/logger';
import path from 'path';
import fs from 'fs';
import { PUBLIC_ROUTES } from './src/common/constants';

const userModel = db.sequelize.models.User;

const startApp = async () => {
    const app: Express = express();
    const port = process.env.PORT || '8000';

    // Enable Cross-Origin requests from the frontend with credentials (cookies)
    app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

    // Parse JSON and URL-encoded request bodies
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Apply security-related HTTP headers to protect against common attacks
    app.use(helmet());

    // Compress HTTP responses to reduce payload size and improve performance
    app.use(compression());

    // Parse cookies from incoming requests
    app.use(cookieParser());

    app.use((req, res, next) => {
    // Skip authentication for public routes
    if (PUBLIC_ROUTES.some((route) => req.path.startsWith(route))) {
        return next();
    }
    // Apply authentication middleware for all other routes
    return ensureAuthentication(userModel)(req, res, next);
    });


    // Dynamically load all route files in the routes directory
    // Register each route with its base name as the path
    const routesPath = path.join(__dirname, 'src/routes');
    fs.readdirSync(routesPath).forEach((file) => {
        if (file.endsWith('.ts') || file.endsWith('.js')) {
            const routeModule = require(path.join(routesPath, file));
            const route = routeModule.default || routeModule;
            const baseName = path.basename(file, path.extname(file));

            app.use(`/${baseName}`, route);
            logger.info(`Ruta /${baseName} registrada`);
        }
    });

    try {
        // Start the Express server and log the port
        app.listen(port, () => {
            logger.info(`App listening on port ${port}`);
        });
    } catch (error: unknown) {
        // Log startup errors with details, exit process if necessary
        if (error instanceof Error) {
            logger.error('Error at startup: ' + error.message);
        } else {
            logger.error('Unknown error at startup', { error });
        }
        process.exit(1);
    }
};

startApp();
