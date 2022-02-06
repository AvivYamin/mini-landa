const express = require('express');
const cors = require('cors')
const mainRouter = require('../Routers/mainRouter');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', mainRouter);
//app.use(errorHandler);

module.exports = app;