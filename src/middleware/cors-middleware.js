import cors from 'cors';

// Cors whitelist
const whitelist = ['http://localhost:3000', 'http://localhost:3001'];
const corsOptions = {
  origin: function (origin, callback) {
    const isOriginWhitelist = (origin && whitelist.includes(origin)) || false;
    callback(null, isOriginWhitelist);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
