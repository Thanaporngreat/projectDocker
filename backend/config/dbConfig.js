const mysql = require('mysql2');

// การตั้งค่า Pool สำหรับ MySQL
const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'iot',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// ใช้ promise() เพื่อรองรับ async/await
module.exports = pool.promise();
