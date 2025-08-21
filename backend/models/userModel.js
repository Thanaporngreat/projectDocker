// models/userModel.js
const db = require('../config/dbConfig');

const User = {
  // สร้างผู้ใช้ใหม่ (คืนแถวที่สร้าง)
  create: async (data) => {
    const sql = `
      INSERT INTO users (full_name, birth_date, phone, email, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`;
    const params = [
      data.full_name ?? null,
      data.birth_date ?? null, // schema อนุญาต null
      data.phone ?? null,
      data.email,
      data.password,           // ถ้า hash ไว้แล้ว ส่ง hash มาที่นี่
    ];
    const [rows] = await db.query(sql, params);
    return rows[0];
  },

  // ค้นหาผู้ใช้โดย email
  findOne: async (email) => {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = $1 LIMIT 1',
      [email]
    );
    return rows[0] || null;
  },

  // ค้นหาผู้ใช้โดย id
  findById: async (id) => {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE id = $1 LIMIT 1',
      [id]
    );
    return rows[0] || null;
  },

  // อัปเดตรหัสผ่าน (คืน true/false)
  updatePassword: async (email, newPassword) => {
    const res = await db.raw(
      'UPDATE users SET password = $1 WHERE email = $2',
      [newPassword, email]
    );
    return res.rowCount > 0;
  },
};

module.exports = User;
