# Express Prisma Starter

This project was created to be a template when starting a new [express.js](https://github.com/expressjs/express) project.

## Features

1. ES6+ features with babel (including **es6 import/export** feature).
2. ORM Database implementation with **[Prisma](https://www.prisma.io/)**.
3. Including authentication system with rest api endpoints.
4. Linting with **[Eslint](https://eslint.org/)**.
5. Running server development with **[Nodemon](https://nodemon.io/)**.
6. Testing with **[Jest](https://jestjs.io/)**.
7. Api docs use **[Swagger](https://swagger.io/)**.
8. Logger use **[Winston](https://github.com/winstonjs/winston)**.
9. Logger middlewre use **[Morgan](https://www.npmjs.com/package/morgan)**.
10. Password encryption use **[Bcryptjs](https://www.npmjs.com/package/bcryptjs)**.
11. Auth token use **[JWT](https://www.npmjs.com/package/jsonwebtoken)**.

## Server

### Setup

```
npm install
```

### Test

```
npm run test
```

### Lint

```
npm run lint
```

### Development

include (lint & env)

```
npm run dev
```

## Format

### Handle Error

For handle error

```javascript
import { ResponseError } from '../error/response-error.js';

throw new ResponseError(400, 'Username or password wrong', ['username', 'password']);
```

parameter:

- Status code you want (number).
- Errror messsage (string).
- Path error that you get error (array string).
