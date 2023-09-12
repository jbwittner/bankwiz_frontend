import pino, { Logger } from 'pino';

const loggerOptions: pino.LoggerOptions = {
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  browser: { asObject: true },
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  redact: ['token.id_token', 'token.accessToken'],
};

const baseLogger: Logger = pino(loggerOptions);

const applogger = {
  base: baseLogger,

  childPageLogger: (pageName: string): Logger => {
    return baseLogger.child({ page: pageName });
  },

  childComponentLogger: (componentName: string): Logger => {
    return baseLogger.child({ component: componentName });
  },

  childApiLogger: (endpointName: string): Logger => {
    return baseLogger.child({ apiEndpoint: endpointName });
  },
};

export default applogger;
