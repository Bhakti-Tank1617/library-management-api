# 📚 Library Management API

A RESTful Library Management API built using **Node.js**, **Express.js**, **MongoDB**, and **JWT Authentication**. This project provides secure user authentication, role-based authorization, book management, and book borrowing/returning functionality.
## 🚀 Features

- 👤 User Registration & Login
- 🔐 JWT Authentication
- 🛡️ Role-Based Authorization (Admin & Student)
- 📚 Book CRUD Operations
- 📖 Borrow Book
- ↩️ Return Book
- 🔍 Search Books by Title or Author
- 🏷️ Filter Books by Category
- 📄 Pagination
- ↕️ Sorting
- ✅ Input Validation
- ⚡ Error Handling
- 🗂️ MVC Architecture

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv

---

## 📂 Project Structure

```
Library Management API/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── userController.js
│   ├── bookController.js
│   └── borrowController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   ├── validationMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Book.js
│   └── Borrow.js
│
├── routes/
│   ├── userRoutes.js
│   ├── bookRoutes.js
│   └── borrowRoutes.js
│
├── utils/
│   └── asyncHandler.js
│
├── validators/
│   └── bookValidator.js
│
├── app.js
├── server.js
├── package.json
├── .env
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/Bhakti-Tank1617/library-management-api.git
```

### Navigate to the Project

```bash
cd library-management-api
```

### Install Dependencies

```bash
npm install
```

### Create a `.env` File

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/libraryDB
JWT_SECRET=your_secret_key
```

### Start the Server

```bash
npm run dev
```

Server will run on:

```
http://localhost:3000
```

# 📡 API Endpoints

## 👤 User

| Method |      Endpoint     | Description   |
|--------|-------------------|---------------|
| POST   | `/users/register` | Register User |
| POST   | `/users/login`    | Login User    |

---

## 📚 Books

| Method |     Endpoint     |    Description   |
|--------|------------------|------------------|
| POST   | `/books`         | Add Book (Admin) |
| GET    | `/books`         | Get All Books    |
| GET    | `/books/:bookId` | Get Book by ID   |
| PUT    | `/books/:bookId` | Update Book      |
| DELETE | `/books/:bookId` | Delete Book      |

### Search
GET /books?search=clean

### Filter
GET /books?category=Programming

### Pagination
GET /books?page=1&limit=5

### Sorting
GET /books?sort=title

GET /books?sort=-publishedYear

## 📖 Borrow

| Method |          Endpoint        | Description |
|--------|--------------------------|-------------|
| POST   | `/borrow/:bookId`        | Borrow Book |
| PUT    | `/borrow/return/:bookId` | Return Book |

---

## 🔒 Authentication

Protected routes require the JWT token in the request header.

Example:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 📌 Sample Response

```json
{
  "success": true,
  "message": "Book Borrowed Successfully.",
  "data": {
    "_id": "...",
    "user": "...",
    "book": "...",
    "status": "borrowed"
  }
}
```

---

## 📖 Learning Outcomes

Through this project, I learned:

- REST API Development
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Role-Based Authorization
- CRUD Operations
- Search, Filter & Pagination
- MVC Architecture
- Git & GitHub
- Backend Project Structure

---

## 👩‍💻 Author
**Bhakti Tank**
GitHub: https://github.com/Bhakti-Tank1617


## ⭐ Support
If you found this project useful, consider giving it a ⭐ on GitHub.
