# Project E-Commerce Backend System

# รายละเอียดของ Project
E-Commerce Backend System เป็น Project midterm โดยประกอบด้วย API Server (Node.js + MySQL)  
มีระบบลงทะเบียนผู้ใช้, จัดการสินค้า, ตะกร้าสินค้า, ดูรายการสั่งซื้อ

# เทคโนโลยีที่ใช้
- Node.js (Express) — Backend API
- MySQL — Database
- JWT — Authentication & Authorization
- Docker & Docker Compose — Development Setup

# วิธีใช้งาน
1. Run project บน Cloud โดยใช้ Docker compose 
docker compose up -d
2. เรียก /api/auth/register เพื่อสมัครสมาชิก
3. เรียก /api/auth/login เพื่อรับ JWT token
4. นำ token ไปใช้กับ API อื่น ๆ เช่น /api/products /api/orders

# API Documentation
1. [Auth APIs]
1.1 Register User
POST /auth/register
Request Body
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
Response
{
  "message": "User registered successfully"
}


