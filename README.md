# 🚚 Asian Roadways Transport Management System

A full-stack transport expense management system designed to manage multiple branches, track expenses, and monitor cash flow, efficiently.

---

## 📌 Overview

**Asian Roadways Transport Management System** helps transport businesses manage:

* Multiple branches
* Expenses & payments
* Client billing 
* Financial tracking (income vs expenses)

Built with scalability in mind, this system ensures smooth operations without performance lag.

---

## ⚙️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Frontend

* React.js
* Tailwind CSS

### Other Tools

* JWT Authentication
* REST API
* Axios

---
## 🚀 Features

### 🏢 Branch Management

* Manage multiple transport branches
* Separate financial tracking per branch

### 💰 Expense Management

* Record expenses (fuel, maintenance, salary, etc.)
* Categorized expense tracking

### 💵 Payments & Income

* Track incoming payments from clients
* Maintain clear income records

### 🧾 Invoice System

* Generate and manage client invoices
* Track paid/unpaid bills

### 📊 Dashboard & Analytics

* Branch-wise overview
* Total income vs expenses
* Recent transactions

---

## 🔐 Authentication & Roles

* JWT-based authentication
* Role-based access:

  * Admin (full access)
  * Branch Manager (limited to their branch)

---

## 🔁 API Flow

```
Route → Controller → Service → Model → Database
```

---

## 🛠️ Installation

### 1. Clone Repository

```
git clone https://github.com/Yawi-1/ARTC.git
cd ARTC
```

### 2. Install Dependencies

```
npm install
```

### 3. Setup Environment Variables

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### 4. Run Server

```
npm run start
```

---

## 📡 API Endpoints (Sample)

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### Expenses

* GET `/api/expenses`
* POST `/api/expenses`

### Payments

* GET `/api/payments`
* POST `/api/payments`

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by **Yawi**

---

## 💡 Note

This system is built for scalability and real-world logistics use. Structure your modules properly and avoid mixing business logic in controllers for long-term maintainability.

---
