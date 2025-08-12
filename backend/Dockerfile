# backend/Dockerfile
FROM node:18
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .

# ติดตั้ง mysqladmin ไว้ ping DB
RUN apt-get update && apt-get install -y default-mysql-client && rm -rf /var/lib/apt/lists/*

EXPOSE 8000

# รอ DB แล้วค่อย start
CMD ["sh","-c","echo '⏳ Waiting for MySQL at '\"$DB_HOST:$DB_PORT\"' ...'; \
until mysqladmin ping -h\"$DB_HOST\" -p\"$DB_PASSWORD\" --silent; do sleep 2; done; \
echo '✅ MySQL ready'; exec node server.js"]
