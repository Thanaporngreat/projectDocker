const db = require('../config/dbConfig');

const User = {
    // สร้างผู้ใช้ใหม่
    create: async (data) => {
        const query = 'INSERT INTO users (full_name, birth_date, phone, email, password) VALUES (?, ?, ?, ?, ?)';
        const [results] = await db.query(query, [data.full_name, data.birth_date, data.phone, data.email, data.password]);
        return results; // คืนค่า Promise ให้ใช้งาน await ได้
    },

    // ค้นหาผู้ใช้โดย email
    findOne: async (email) => {
        const query = 'SELECT * FROM users WHERE email = ? LIMIT 1';
        const [results] = await db.query(query, [email]);
        return results[0] || null; // คืนผู้ใช้ที่พบ หรือ null ถ้าไม่พบ
    },

    // ค้นหาผู้ใช้โดย id
    findById: async (id) => {
        const query = 'SELECT * FROM users WHERE id = ? LIMIT 1';
        const [results] = await db.query(query, [id]);
        return results[0] || null; // คืนผู้ใช้ที่พบ หรือ null ถ้าไม่พบ
    },
    //----------------------อัพเดตรหัสผ่านในDataBases---------------------------------------------------------------------------------------------------------------------------------
    findOne: async (email) => {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },
    updatePassword: async (email, newPassword) => {
        return db.execute('UPDATE users SET password = ? WHERE email = ?', [newPassword, email]);
    },
};

module.exports = User;