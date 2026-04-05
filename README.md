# finance-backend
# 🚀 Finance Data Processing and Access Control Backend

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen.svg)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A robust, enterprise-grade backend service designed for processing financial records, managing users, and serving dynamic dashboard analytics. Built to handle complex Role-Based Access Control (RBAC) securely and efficiently.

---

## ✨ Key Features

- **🔐 Secure Authentication via JWT**: Stateless architecture using modern JSON Web Tokens and BCrypt password hashing.
- **🛡️ Strict Role-Based Access Control**:
  - `Viewer`: Can access aggregated dashboard metrics and view recent activity.
  - `Analyst`: Can access all dashboard analytics and query historical financial records.
  - `Admin`: Full write access. Can manage financial records and oversee user statuses and roles.
- **💰 Financial Records Management**: Full CRUD support for incomes/expenses, with powerful querying and filtering (by category, type, and date range).
- **📊 Real-time Dashboard Aggregations**: Dynamic calculation of net balances, category-wise spending patterns, and total incomes/expenses.
- **🚦 Account Status Flow**: Support for activating and deactivating user profiles seamlessly.
- **🛠️ Centralized Error Handling**: Beautifully formatted exception handling catching database timeouts, bad validation, and routing issues in one place.

---

## 💻 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Security**: jsonwebtoken, bcryptjs
- **Config Management**: dotenv

---

## ⚙️ Installation & Local Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16.x or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)

### 2. Clone and Install
```bash
git clone https://github.com/yourusername/finance-backend.git
cd finance-backend
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and configure the following variables:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/finance-dashboard
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```
> *Note: If using MongoDB Atlas, replace the `MONGO_URI` with your cluster connection string.*

### 4. Start the Application
```bash
# Starts the server
npm start
```
The server will light up on `http://localhost:5000`.

---

## 📡 API Reference

Here is a quick overview of the available endpoints. All protected routes require a valid `Bearer` token in the `Authorization` header.

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
| ------ | -------- | ----------- | ------ |
| `POST` | `/register` | Register a new user (`Viewer` by default) | Public |
| `POST` | `/login`    | Authenticate and receive JWT | Public |

### User Management (`/api/users`)
| Method | Endpoint | Description | Access |
| ------ | -------- | ----------- | ------ |
| `GET`  | `/` | Get all registered users | Admin |
| `PUT`  | `/:id/role` | Update user access role | Admin |
| `PUT`  | `/:id/status` | Mark user as active/inactive | Admin |

### Financial Records (`/api/records`)
| Method | Endpoint | Description | Access |
| ------ | -------- | ----------- | ------ |
| `POST` | `/` | Add a new financial record | Admin |
| `GET`  | `/` | Query records (supports `?type=`, `?category=`, date ranges) | Admin, Analyst |
| `GET`  | `/:id` | Fetch specific record | Admin, Analyst |
| `PUT`  | `/:id` | Update record details | Admin |
| `DELETE` | `/:id` | Remove a record | Admin |

### Dashboard Analytics (`/api/dashboard`)
| Method | Endpoint | Description | Access |
| ------ | -------- | ----------- | ------ |
| `GET`  | `/summary` | Get aggregated totals, net balance, category breakdown | All Roles |
| `GET`  | `/recent-activity` | Fetch the 5 most recent transactions | All Roles |

---

## 📂 Project Structure

```text
├── config/
│   └── db.js                # Database connection utility
├── controllers/             # Business logic handlers
│   ├── authController.js
│   ├── dashboardController.js
│   ├── recordController.js
│   └── userController.js
├── middleware/              # Custom express middleware
│   ├── authMiddleware.js    # JWT & RBAC verification
│   └── errorMiddleware.js   # Global error formatter
├── models/                  # Mongoose data schemas
│   ├── Record.js
│   └── User.js
├── routes/                  # Express route definitions
│   ├── authRoutes.js
│   ├── dashboardRoutes.js
│   ├── recordRoutes.js
│   └── userRoutes.js
├── .env                     # Environment variables
├── app.js                   # Application entry point
├── package.json             
└── README.md                # Project documentation
```

---

## 💡 Architectural Decisions and Assumptions

1. **Role Access Policy**: It was assumed that financial records represent system-wide data, meaning `Analyst` users can read all records to construct business intelligence, while `Administrators` represent system managers who clean up and write new records.
2. **User Creation**: Anyone can register an account securely via the portal, but they are strictly locked as a `Viewer` preventing unauthorized manipulation until an `Admin` officially upgrades them. 
3. **ES Modules**: The application utilizes modern JavaScript features, strictly using ES Modules (`import`/`export`) for cleaner dependency management.

---

<p align="center">Made with ❤️ for modern backend infrastructure.</p>
