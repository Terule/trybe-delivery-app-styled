const express = require('express');
const errorHandler = require('../middleware/error.middleware');
const router = require('./Routes/router')
const app = express();

app.use(express.json())

app.use(router)

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorHandler)



module.exports = app;
