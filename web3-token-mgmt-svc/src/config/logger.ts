/**
 * Standard logger (to console for 12factor)
 */
import { createLogger, format, transports } from 'winston';

/* Production log format functions */
/**
 * replaceError
 * @param { label, level, message, stack }
 */
const replaceError = ({ label, level, message, stack }: any) => ({
    label,
    level,
    message,
    stack,
});
/**
 * replacer
 * @param {string} _key
 * @param {*} value
 */
const replacer = (_key: string, value: any) => (value instanceof Error ? replaceError(value) : value);

/**
 * prodFormat
 */
const prodFormat = () => format.combine(format.json({ replacer }));

/**
 * formatMessage
 * @description Development log format functions 
 * @param {*} info
 */
const formatMessage = (info: any) => `${info.level} ${info.message}`;
/**
 * formatError
 * @param {*} info
 */
const formatError = (info: any) => `${info.level} ${info.message}\n\n${info.stack}\n`;
/**
 * fmt
 * @param {*} info
 */
const fmt = (info: any) => (info instanceof Error ? formatError(info) : formatMessage(info));

/**
 * devFormat
 */
const devFormat = () => format.combine(format.colorize(), format.printf(fmt));

/**
 * logger
 *  @type {*} 
*/
const logger = createLogger({
    exitOnError: false,
    format: process.env.NODE_ENV === 'production' ? prodFormat() : devFormat(),
    level: 'info',
    transports: [
        new transports.Console(),
        // new winston.transports.File({ filename: "errors.log" }),
    ],
});

// eslint-disable-next-line import/no-default-export
export default logger;
