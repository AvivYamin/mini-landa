const express = require('express');
const router = express.Router();
const usersRouter = require('./User/usersRouter');
const assetsRouter = require('./Asset/assetsRouter');
const transactionsRouter = require('./Transaction/transactionsRouter');

router.use('/users', usersRouter);
router.use('/assets', assetsRouter);
router.use('/transactions', transactionsRouter);

module.exports = router;