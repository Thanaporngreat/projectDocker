// backend/config/dbConfig.js
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || 'iotuser',
  password: process.env.DB_PASSWORD || 'iotpass',
  database: process.env.DB_NAME || 'iot',
  max: 10,
  idleTimeoutMillis: 30000,
});

// ให้รูปแบบผลลัพธ์คล้าย mysql2/promise => ใช้ [rows] ได้
module.exports = {
  query: (text, params) => pool.query(text, params).then(res => [res.rows, res]),
  raw: (text, params) => pool.query(text, params),
  pool,
};
