FROM node:16

# ตั้ง working directory
WORKDIR /usr/src/app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install --legacy-peer-deps

# คัดลอกไฟล์ทั้งหมดในโปรเจค
COPY . .

# เปิดพอร์ตที่แอปของคุณจะรัน
EXPOSE 8081

# รัน React Native server โดยใช้ npx (ไม่ต้องติดตั้ง react-native-cli แบบ global)
CMD ["npx", "react-native", "start"]

