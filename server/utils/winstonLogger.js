import winston from 'winston';

/**
 * Creates a Winston logger instance with dynamic configuration based on the environment:
 * Production: Errors and unhandled exceptions are logged to error.log
 * Development: Errors and unhandled exceptions are printed to the console
 *
 * @type {winston.Logger}
 */ const winstonLogger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [],
});

// Check the environment and configure the logger accordingly
if (process.env.NODE_ENV === 'production') {
  // In production, log errors to 'error.log' file using Winston
  winstonLogger.add(
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  );

  // Also log unhandled exceptions
  process.on('unhandledRejection', (ex) => {
    winstonLogger.error('Unhandled Rejection:', ex);
  });
} else {
  // In development, log errors to the console
  winstonLogger.add(new winston.transports.Console({ level: 'error' }));
  // Also log unhandled exceptions to the console
  process.on('unhandledRejection', (ex) => {
    console.error('Unhandled Rejection:', ex);
  });
}

export default winstonLogger;
