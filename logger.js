import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
const { createLogger, format, transports } = winston;
import fs from 'fs'

const logDirectory = 'logs';  // Specify your log directory here
// Create the log directory if it does not exist
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }
  
// Define the log format
const logFormat = format.combine(
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

// Create a new instance of the daily rotate file transport
const dailyRotateFileTransport = new DailyRotateFile({
  filename: `${logDirectory}/%DATE%-results.log`,
  datePattern: 'YYYY-MM-DD',
  level: 'info',
  handleExceptions: true,
  json: false,
  maxSize: '20m',
  maxFiles: '14d',  // Keep logs for 14 days
  format: logFormat
});

// Create the logger instance
const logger = createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    dailyRotateFileTransport,
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    })
  ],
  exitOnError: false
});

// Stream for morgan (if needed)
logger.stream = {
  write: function(message, encoding) {
    logger.info(message.trim());
  },
};

// module.exports = logger;
export default logger;
