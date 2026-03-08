// src/db.ts
import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import { configDB } from '../config/config';

config();

type Env = keyof typeof configDB;
const env = (process.env.NODE_ENV as Env) || 'development';

const cfg = configDB[env];

export const sequelize = cfg.use_env_variable
    ? new Sequelize(process.env[cfg.use_env_variable] as string, cfg)
    : new Sequelize(cfg.database, cfg.username, cfg.password!, cfg);

export default sequelize;
