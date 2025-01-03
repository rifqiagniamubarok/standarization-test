import winston from 'winston';

const levelColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
  traceFail: 'red',
  traceGood: 'green',
  trace: 'blue',
};

const logLevels = {
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  traceFail: 5,
  traceGood: 6,
  trace: 7,
};

const colorizeFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.printf(({ level, message, ...rest }) => {
    const json = JSON.stringify({ message, ...rest });
    return `${level}: ${json}`;
  })
);

export const logger = winston.createLogger({
  levels: logLevels,
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: colorizeFormat,
    }),
  ],
});

winston.addColors(levelColors);
