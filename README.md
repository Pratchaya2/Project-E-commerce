# Project E-Commerce Backend System

## 🔧 โครงสร้างโปรเจกต์
- configs
- controllers
- middlewares
- models
- routes
- servies

## 📅 Development Log
- [Day 1] 
    - สร้างโครงสร้างโฟลเดอร์และติดตั้ง Express jsonwebtoken dotenv bcryptjs body-parser cors helmet
    - สร้างฐานข้อมูล SQL ได้แก่ orders , order_items , products , users 
    - เก็บข้อมูล user,password,port ฐานข้อมูลไว้ในไฟล์ .env
    - db.js เชื่อมต่อฐานข้อมูล
    - สร้าง usermodels สร้าง/ลบ/ค้นหา user
- [Day 2] 
    - สร้าง AuthController ระบบสมัครสมาชิกและ login
    - สร้าง AuthMiddleware เพื่อตรวจสอบ token และ role 
    - สร้าง routes สำหรับ auth 
    - สร้าง index.js
    
