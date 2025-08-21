// backend/init-user.js
const bcrypt = require('bcryptjs');
const db = require('./config/dbConfig');

async function ensureSchema() {
  // ✅ สร้างตารางแบบ PostgreSQL ให้ครบก่อน seed (idempotent)
  await db.raw(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(100),
      birth_date DATE,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(30),
      fcm_token TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await db.raw(`
    CREATE TABLE IF NOT EXISTS hosts (
      id SERIAL PRIMARY KEY,
      host_name VARCHAR(150) NOT NULL,
      owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await db.raw(`
    CREATE TABLE IF NOT EXISTS host_members (
      id SERIAL PRIMARY KEY,
      host_id INTEGER NOT NULL REFERENCES hosts(id) ON DELETE CASCADE,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      CONSTRAINT uniq_host_user UNIQUE (host_id, user_id)
    );
  `);

  // เผื่อโค้ดยังอ้าง host_users (ตารางสำรองเพื่อความเข้ากันได้)
  await db.raw(`
    CREATE TABLE IF NOT EXISTS host_users (
      id SERIAL PRIMARY KEY,
      host_id INTEGER NOT NULL REFERENCES hosts(id) ON DELETE CASCADE,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      CONSTRAINT uniq_host_user2 UNIQUE (host_id, user_id)
    );
  `);

  await db.raw(`
    CREATE TABLE IF NOT EXISTS health_data (
      id SERIAL PRIMARY KEY,
      hr NUMERIC(5,2) NOT NULL,
      spo2 NUMERIC(5,2) NOT NULL,
      "timestamp" TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  console.log('[schema] ensured tables');
}

(async () => {
  try {
    await ensureSchema(); // ⬅️ สร้างสคีมาก่อน

    const email = process.env.INIT_USER_EMAIL || 'test@example.com';
    const password = process.env.INIT_USER_PASSWORD || '@1234567';
    const fullName = process.env.INIT_USER_NAME || 'Test User';

    const hash = await bcrypt.hash(password, 10);
    await db.raw(
      `INSERT INTO users (full_name, email, password, birth_date)
       VALUES ($1,$2,$3,$4)
       ON CONFLICT (email) DO UPDATE
       SET password = EXCLUDED.password, full_name = EXCLUDED.full_name`,
      [fullName, email, hash, '2000-01-01']
    );

    console.log(`[seed] ensured user ${email}`);
    process.exit(0);
  } catch (e) {
    console.error('[seed] error:', e);
    process.exit(1);
  }
})();
