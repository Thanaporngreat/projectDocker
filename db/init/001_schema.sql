-- ไม่ต้อง CREATE DATABASE/USE เพราะภาพ postgres จะสร้าง DB จาก env ให้ (POSTGRES_DB=iot)

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,                           -- แทน AUTO_INCREMENT
  full_name VARCHAR(100),
  birth_date DATE,                                 -- อนุญาตเป็น NULL
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(30),
  fcm_token TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()             -- แทน CURRENT_TIMESTAMP แบบมีโซนเวลา
);

CREATE TABLE IF NOT EXISTS hosts (
  id SERIAL PRIMARY KEY,
  host_name VARCHAR(150) NOT NULL,
  owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS host_members (
  id SERIAL PRIMARY KEY,
  host_id INTEGER NOT NULL REFERENCES hosts(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT uniq_host_user UNIQUE (host_id, user_id)   -- แทน UNIQUE KEY ...
);

-- เผื่อโค้ดยังอ้าง host_users
CREATE TABLE IF NOT EXISTS host_users (
  id SERIAL PRIMARY KEY,
  host_id INTEGER NOT NULL REFERENCES hosts(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT uniq_host_user2 UNIQUE (host_id, user_id)
);

CREATE TABLE IF NOT EXISTS health_data (
  id SERIAL PRIMARY KEY,
  hr NUMERIC(5,2) NOT NULL,                        -- แทน DECIMAL
  spo2 NUMERIC(5,2) NOT NULL,
  "timestamp" TIMESTAMPTZ DEFAULT NOW()            -- ชื่อคอลัมน์ timestamp ใช้ได้ใน PG; ใส่ "" กันสับสน
);
