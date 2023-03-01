const express = require('express');
const errorHandler = require('../middleware/error.middleware');
const userRouter = require('./Routes/user.router');

const app = express();

app.use(express.json());

app.use(userRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorHandler);

module.exports = app;
