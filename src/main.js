import { web } from './application/web.js';
import { logger } from './application/logging.js';

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

web.listen(PORT, () => {
  logger.info({
    message: `server run on port ${PORT}`,
    localhost: `http://locahost:${PORT}`,
    'api-docs': `/api-docs`,
    'local:api-docs': `http://localhost:${PORT}/api-docs/`,
  });
});
