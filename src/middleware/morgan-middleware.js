import dayjs from 'dayjs';
import morgan from 'morgan';
import chalk from 'chalk';
import { logger } from '../application/logging.js';

const customFormat = (tokens, req, res) => {
  const methodColor = chalk.green;
  const urlColor = chalk.cyan;
  const statusColor = chalk.red;
  const responseTimeColor = chalk.magenta;

  const statusCode = tokens.status(req, res);
  const time = dayjs(tokens.date(req, res, 'iso')).format('HH:mm:ss DD/MM/YY');
  const method = tokens.method(req, res);
  const url = tokens.url(req, res);
  const responseTime = tokens['response-time'](req, res);
  const contentLength = tokens.res(req, res, 'content-length') || 'unknown';

  const logMessage = {
    code: statusCode,
    time,
    method,
    url,
    RT: responseTime,
    CL: contentLength,
  };

  if (statusCode >= 200 && statusCode < 300) {
    logger.traceGood(logMessage);
  } else if (statusCode >= 300) {
    logger.traceFail(logMessage);
  }

  const message = [
    `Time: ${chalk.blue(time)}`,
    `Method: ${methodColor(method)}`,
    `URL: ${urlColor(url)}`,
    `Status: ${statusColor(statusCode)}`,
    `RT: ${responseTimeColor(responseTime)} ms`,
    `CL: ${chalk.yellow(contentLength)}`,
  ].join(' | ');

  return message;
};

export default morgan(customFormat);
