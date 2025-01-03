import { logger } from '../application/logging.js';
import { JoiError } from '../error/joi-error.js';
import { ResponseError } from '../error/response-error.js';

export const errorMiddleware = (err, _, res, next) => {
  if (!err) {
    return next();
  }

  if (err?.type === 'entity.parse.failed' && err?.body) {
    logger.traceFail(JSON.stringify(err));
    const error = { message: `Invalid body request`, body: err?.body, path: ['body request'] };
    return res.status(400).json({
      success: false,
      errors: [error],
    });
  } else if (err instanceof ResponseError) {
    logger.traceFail(JSON.stringify(err));
    const error = { message: err.message };
    if (err?.path) {
      error.path = err.path;
    }
    return res.status(err.status).json({
      success: false,
      errors: [error],
    });
  } else if (err instanceof JoiError) {
    logger.traceFail(JSON.stringify(err));
    return res.status(400).json({
      success: false,
      errors: JSON.parse(err.message),
    });
  } else {
    logger.error(JSON.stringify(err));
    return res.status(500).json({
      success: false,
      errors: [
        {
          message: 'Internal server error',
        },
        err,
      ],
    });
  }
};
