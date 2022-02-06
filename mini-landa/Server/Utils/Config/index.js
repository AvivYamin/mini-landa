const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL || '',
  SECRET: process.env.SECRET || 'secret'
//  accessTime: process.env.ACCESS_TIME || '5m',
};