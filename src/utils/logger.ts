import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

// Formato personalizado
const logFormat = printf(({ level, message, timestamp, ...meta }) => {
    const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
    return `${timestamp} [${level}]: ${message} ${metaString}`;
});

const logger = createLogger({
    level: 'debug', // niveles: error < warn < info < debug
    format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports: [
        new transports.Console(), // salida a consola
        // new transports.File({ filename: 'logs/error.log', level: 'error' }),
    ],
});

export default logger;
