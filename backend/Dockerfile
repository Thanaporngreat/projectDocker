# # ใช้ image ของ Node.js
FROM node:16

# # ตั้ง working directory
WORKDIR /usr/src/app

# # คัดลอกไฟล์ package.json และ package-lock.json
COPY package*.json ./

# # ติดตั้ง dependencies
RUN npm install

# # คัดลอกไฟล์ทั้งหมดใน backend
COPY . .

# # เปิดพอร์ตที่แอปของคุณจะรัน
EXPOSE 8000

# # รันเซิร์ฟเวอร์
CMD ["node", "server.js"]


