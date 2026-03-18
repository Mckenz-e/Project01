const mysql = require('mysql2/promise');
require('dotenv').config();

let conn = null;

const initMySQL = async () => {
  if (!conn) {
    conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'webdb',
      port: process.env.DB_PORT || 8700,
    });
    console.log('Connected to database');
  }
  return conn;
};

module.exports = { initMySQL };
