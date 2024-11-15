import winston, { LoggerOptions, transports } from "winston";

const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}]: ${message}`;
  })
);

const loggerOptions: LoggerOptions = {
  level: "info",
  format: logFormat,
  transports: [new winston.transports.Console()]
};

const logger = winston.createLogger(loggerOptions);

export default logger;
