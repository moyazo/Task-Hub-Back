// config/config.ts
import { config } from 'dotenv';
config();

export interface DBConfig {
    username: string;
    password: string | undefined;
    database: string;
    host: string;
    port: number;
    dialect: 'postgres';
    use_env_variable?: string; // <- esto es lo importante
}
export const configDB: Record<string, DBConfig> = {
    development: {
        username: process.env.POSTGRES_USER || 'admin',
        password: process.env.POSTGRES_PASSWORD || undefined,
        database: process.env.POSTGRES_DB || 'my_database',
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT) || 5432,
        dialect: 'postgres',
        // use_env_variable: 'DATABASE_URL', // opcional
    },
};
