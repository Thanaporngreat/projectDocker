const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Import โมเดล User
const router = express.Router();
const authenticateToken = require('./authmiddleware');
const db = require('../config/dbConfig');

// GET /me - ดึงข้อมูลผู้ใช้ที่ล็อกอิน
router.get('/me', authenticateToken, async (req, res) => {
    try {
        // ใช้ findById ที่เราเขียนไว้ใน UserModel
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error('❌ Fetch User Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.put('/me', authenticateToken, async (req, res) => {
    const { full_name, birth_date, phone, email, password } = req.body;

    try {
        // ดึงข้อมูลผู้ใช้จาก ID ที่ผ่าน Token
        const userId = req.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // ถ้ามีการเปลี่ยนรหัสผ่าน ให้เข้ารหัสใหม่
        let hashedPassword = user.password; // ใช้รหัสผ่านเดิมถ้าไม่ได้เปลี่ยน
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // อัปเดตข้อมูลผู้ใช้
        const updatedUser = await User.update(userId, { full_name, birth_date, phone, email, password: hashedPassword });

        res.status(200).json({
            message: 'User updated successfully!',
            user: updatedUser
        });
    } catch (error) {
        console.error('❌ Update User Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/save-fcm-token', async (req, res) => {
    const { userId, fcmToken, source } = req.body;
  
    try {
      if (userId) {
        await db.query('UPDATE users SET fcm_token = ? WHERE id = ?', [fcmToken, userId]);
      } else {
        // เก็บ token ชั่วคราว หรือ log ไว้
        console.log(`📥 Received anonymous FCM Token from ${source || 'unknown'}`, fcmToken);
      }
  
      res.json({ message: 'Token saved successfully (or logged)' });
    } catch (err) {
      console.error('❌ Error saving FCM token:', err);
      res.status(500).json({ error: 'Database error' });
    }
  });

module.exports = router;