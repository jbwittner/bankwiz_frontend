import pino, { Logger, LoggerOptions } from 'pino';

const loggerOptions: LoggerOptions = {
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
};

const logger: Logger = pino(loggerOptions);

export default logger;
