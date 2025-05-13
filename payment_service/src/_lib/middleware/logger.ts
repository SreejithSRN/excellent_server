import { createLogger, format, transports } from'winston'
const { combine, timestamp, printf } = format;
import 'winston-daily-rotate-file' 

// Define the custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Create a logger instance with daily rotation
export const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(), 
    logFormat 
  ),
  transports: [
    new transports.Console(), 
    new transports.DailyRotateFile({
      filename: 'logs/application-%DATE%.log', 
      datePattern: 'YYYY-MM-DD', 
      maxFiles: '7d', 
      zippedArchive: true, 
    })
  ]
});