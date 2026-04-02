# Finance Dashboard Backend

## Overview

This project is a backend system for managing financial data with role-based access control and analytical insights. It simulates a real-world finance dashboard where multiple users interact with financial records based on their roles.

The system focuses on clean architecture, secure API design, structured data handling, and meaningful analytics.

---

## Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* express-validator

---

## Core Features

### Authentication & User Management

* User registration and login
* Secure password hashing using bcrypt
* JWT-based authentication
* Role-based user system:

  * Viewer → read-only access
  * Analyst → access to analytics
  * Admin → full control

---

### Role-Based Access Control

* Middleware-based authorization
* Centralized and reusable role handling
* Restricted actions based on roles
* Inactive users are prevented from logging in

---

### Financial Records Management

* Create, read, update, and delete financial records
* Fields include:

  * amount
  * type (income / expense)
  * category
  * date
  * notes
* Records are user-specific
* Ownership validation for updates and deletes

---

### Filtering & Pagination

* Filter records by type and category
* Pagination support for scalable data handling

---

### Soft Delete Implementation

* Records are not permanently deleted
* Uses `isDeleted` flag for data safety and auditability

---

### Dashboard & Analytics APIs

#### Summary

* Total income
* Total expense
* Net balance

#### Category-wise Analysis

* Aggregated totals per category using MongoDB aggregation

#### Recent Transactions

* Fetch latest 5 records

#### Monthly Trends

* Month-wise income and expense tracking
* Implemented using aggregation pipelines

---

## Additional Enhancements

* Clean project structure (controllers, routes, models, middleware)
* Input validation using express-validator
* Centralized and consistent error handling
* Secure token-based API access
* Modular and scalable backend design

---

## User Management Enhancement

* Admin can activate or deactivate users
* Inactive users are restricted from accessing the system
* Demonstrates real-world account lifecycle handling

---

## API Testing (Postman)

A complete Postman collection is included in the project:

/postman/Finance-Dashboard-APIs.postman_collection.json

---

## API Testing Flow

To test the APIs in sequence:

1. Register an admin user
2. Login to obtain JWT token (auto-saved in collection)
3. Create a financial record (recordId auto-saved)
4. Fetch records using filters and pagination
5. Update the record
6. Delete the record (soft delete)
7. Test dashboard APIs (summary, categories, trends)
8. Register another user
9. Deactivate the user using admin privileges
10. Attempt login with inactive user (should fail)

---

## Environment Variables

Create a `.env` file in the root directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

---

## Setup Instructions

1. Install dependencies:

npm install

2. Run the server:

npm run dev

3. Server will start at:

http://localhost:5000

---

## API Endpoints

### Auth

* POST /api/auth/register
* POST /api/auth/login

### Records

* POST /api/records
* GET /api/records
* PUT /api/records/:id
* DELETE /api/records/:id

### Dashboard

* GET /api/dashboard/summary
* GET /api/dashboard/categories
* GET /api/dashboard/recent
* GET /api/dashboard/trends

### Users

* PATCH /api/users/:id/status

---

## Design Decisions

* Used JWT for stateless authentication
* Implemented middleware-based role control for scalability
* Used soft delete to prevent data loss
* Used MongoDB aggregation pipelines for analytics
* Structured project for maintainability and clarity

---

## Conclusion

This project demonstrates a complete backend system with real-world features including authentication, role-based access control, financial data management, and analytics.

The focus has been on building a clean, maintainable, and logically structured backend rather than unnecessary complexity.
