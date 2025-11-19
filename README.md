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
## 1. Auth APIs
### 1.1 Register user
POST ```api/auth/register```

Request Body :
```js
{
  "name": "John Doe",
  "email": "customer@example.com",
  "password": "123456"
}
```
Response :
```js
{
  "message": "User registered successfully"
}
```

### 1.2 Login user
POST ```api/auth/login```

Request Body :
```js
{
  "name": "John Doe",
  "email": "customer@example.com",
  "password": "123456"
}
```
Response :
```js
{
  "message": "User registered successfully"
}
```

### 1.3 Change Role User (only admin)
PATCH ```api/auth/role/:id```

Request Body :
```js
{
    "role" : "admin"
}
```
Response :
```js
{
    "message": "Update role successfully"
}
```

### 1.4 Delete User (only admin)
DELETE ```api/auth/delete/:id```

Response :
```js
{
    "message": "Delete user successfully"
}
```

### 1.5 Get All User (only admin)
GET ```api/auth/alluser```

Response :
```js
{
    message:"User retrieved successfully"
}
```

## 2.Product APIs
### 2.1 Create Product (seller, admin)
POST ```api/products/```

Request Body :
```js
{
    "name" : "Iphone 14 pro max",
    "price" : 36000,
    "description" : "โทรศัพท์มือถือยี่ห้อ Apple",
    "stock" : 1,
    "category" : "accessories"
}
```
Response :
```js
{
  "message": "Add product successfully"
}
```

### 2.2 Update Product (seller, admin)
PATCH ```api/products/update/:id```

Request Body :
```js
{
    "stock" : 3,
}
```

### 2.3 Get All Product 
GET ```api/products/allproducts```

Response :
```js
{
"message": "Products retrieved successfully",
"data": [
            {
            "id": 1,
            "seller_id": null,
            "name": "apple",
            "price": "2.00",
            "description": "so sweety",
            "stock": 2,
            "category": "furites",
            "create_at": "2025-08-26T17:25:49.000Z"
            }
        ]
}
```
### 2.4 Get My Product (seller)
GET ```api/products/myproducts```

Response :
```js
{
"message": "Products retrieved successfully",
"data": [
        {
            "id": 1,
            "seller_id": null,
            "name": "apple",
            "price": "2.00",
            "description": "so sweety",
            "stock": 2,
            "category": "furites",
            "create_at": "2025-08-26T17:25:49.000Z"
        }
]
}
```

### 2.4 Delete Product (seller,admin)
DELETE ```api/products/delete/:id```

Response :
```js
{
    "message": "Delete product sucessfully"
}
```

### 2.5 Search Product 
GET ```api/products/search?```

Response :
```js
{
    "message": "Succesfully",
    "Product": [
        {
            "id": 1,
            "seller_id": null,
            "name": "apple",
            "price": "2.00",
            "description": "so sweety",
            "stock": 2,
            "category": "furites",
            "create_at": "2025-08-26T17:25:49.000Z"
        },
    ]
}
```

## 3.Order APIs
### 3.1 Create order (customer, admin)
POST ```api/orders/```

Resquest Body :
```js
{
    "productID": 10,
    "quantity": 20
}
```
Response :
```js
{
    "message": "Update order successfully"
}
```

### 3.2 View order (customer, admin)
GET ```api/orders/myorders```

Response :
```js
{
    "message": "Orders retrieved successfully",
    "data": [
        {
            "order_id": 10,
            "status": "pending",
            "total_price": 20000.00,
            "items": [
                {
                    "name": "apple",
                    "quantity": 10
                },
                {
                    "name": "Ipone 14 promax",
                    "quantity": 1
                }
            ]
        }
    ]
}
```
### 3.3 Delete order (customer,admin)
GET ```api/orders/delete/:id```

Response :
```js
{
    "message": "Delete order succesfully"
}
```






