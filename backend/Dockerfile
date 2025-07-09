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


# ใช้ image ของ Node.js
# FROM node:16

# # ติดตั้ง VNC Server และ Xfce desktop environment
# RUN apt-get update && apt-get install -y \
#     xfce4 \
#     xfce4-goodies \
#     tightvncserver \
#     xterm \
#     && rm -rf /var/lib/apt/lists/*

# # ตั้ง working directory
# WORKDIR /usr/src/app

# # คัดลอกไฟล์ package.json และ package-lock.json
# COPY package*.json ./

# # ติดตั้ง dependencies
# RUN npm install

# # คัดลอกไฟล์ทั้งหมดใน backend
# COPY . .

# # เปิดพอร์ตที่แอปของคุณจะรัน
# EXPOSE 8000

# # เปิดพอร์ตสำหรับ VNC (5901)
# EXPOSE 5901

# # รัน VNC Server และเซิร์ฟเวอร์ Node.js
# CMD tightvncserver :1 -geometry 1280x1024 -depth 24 && node server.js
