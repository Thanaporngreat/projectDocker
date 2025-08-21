# backend/Dockerfile
FROM node:18
WORKDIR /usr/src/app

COPY package*.json ./
ENV NODE_ENV=production
RUN npm ci --only=production

COPY . .

# ใช้ Postgres client สำหรับตรวจสุขภาพ DB
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

EXPOSE 8000

# รอ Postgres แล้วค่อย start
CMD ["sh","-c","echo \"⏳ Waiting for Postgres at $DB_HOST:$DB_PORT ...\"; \
until pg_isready -h \"$DB_HOST\" -p \"$DB_PORT\" -U \"$DB_USER\"; do sleep 2; done; \
echo \"✅ Postgres ready\"; node ./init-user.js && exec node server.js"]

