require('dotenv').config();

const options = {
  host: process.env.MYSQLHOST || process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQLPORT || process.env.MYSQL_PORT || '3306',
  database:
    `${process.env.MYSQLDATABASE || process.env.MYSQL_DB_NAME || 'db_name'}`,
  username: process.env.MYSQLUSER || process.env.MYSQL_USER || 'root',
  password: process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD || 'password',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
  production: {
    ...options,
  },
};
