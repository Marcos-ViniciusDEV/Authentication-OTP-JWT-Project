# Authentication OTP JWT Project

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Node.js](https://img.shields.io/badge/node.js-v18%2B-brightgreen.svg)

A comprehensive authentication system built with Express.js that implements OTP (One-Time Password) verification and JWT token generation for secure user authentication.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation Guide](#installation-guide)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [API Routes](#api-routes)
- [Project Structure](#project-structure)
- [Database](#database)
- [License](#license)

## Overview

This project provides a robust authentication system with the following workflow:

1. **User Registration (Sign Up)**: Create a new user account with email validation
2. **OTP Generation**: Generate and send One-Time Passwords via email for secure authentication
3. **User Sign In**: Request authentication with email verification through OTP
4. **Data Persistence**: Store user and OTP data using Prisma ORM with SQLite

## Features

- ✅ User registration and account creation
- ✅ Email-based OTP verification
- ✅ Secure password handling with JWT tokens
- ✅ Input validation using Zod schema validation
- ✅ CORS support for cross-origin requests
- ✅ Security headers with Helmet
- ✅ Environment variable configuration
- ✅ Type-safe TypeScript implementation
- ✅ Prisma ORM for database management

## Technologies Used

- **Express.js**: Web application framework
- **TypeScript**: Programming language for type safety
- **Prisma**: ORM for database management
- **JWT**: JSON Web Token for authentication
- **Zod**: Schema validation library
- **Mailtrap**: Email delivery service
- **Helmet**: Security middleware
- **CORS**: Cross-Origin Resource Sharing middleware
- **UUID**: Unique identifier generation
- **dotenv**: Environment variable management

## Installation Guide

### Prerequisites

- Node.js (version 18 or higher)
- npm (Node Package Manager)

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Authentication-OTP-JWT-Project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory with the following variables:

   ```
   PORT=3000
   DATABASE_URL="file:./dev.db"
   JWT_SECRET=your_jwt_secret_key_here
   MAILTRAP_TOKEN=your_mailtrap_token
   MAILTRAP_FROM_EMAIL=your_mailtrap_email
   ```

4. **Initialize the database**

   ```bash
   npx prisma migrate dev
   ```

5. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

## Environment Variables

The application requires the following environment variables (create a `.env` file):

| Variable              | Description                | Example               |
| --------------------- | -------------------------- | --------------------- |
| `PORT`                | Server port                | `3000`                |
| `DATABASE_URL`        | Database connection string | `file:./dev.db`       |
| `JWT_SECRET`          | Secret key for JWT signing | `your_secret_key`     |
| `MAILTRAP_TOKEN`      | Mailtrap API token         | `your_token`          |
| `MAILTRAP_FROM_EMAIL` | Sender email address       | `noreply@example.com` |

## Getting Started

### Development

To start the development server with hot-reload:

```bash
npm run dev
```

The server will start on `http://localhost:3000/` by default.

### Production Build

Build the project for production:

```bash
npm run build
```

## API Routes

| Method | Route          | Parameters                        | Description                                        |
| ------ | -------------- | --------------------------------- | -------------------------------------------------- |
| GET    | `/ping`        | None                              | Health check endpoint - returns `{ ping: "pong" }` |
| POST   | `/auth/signup` | `{ name: string, email: string }` | Register a new user account                        |
| POST   | `/auth/signin` | `{ email: string }`               | Request OTP for user authentication                |

### Route Details

#### 1. Health Check

- **Endpoint**: `GET /ping`
- **Description**: Verify that the API is running
- **Response**:
  ```json
  {
    "ping": "pong"
  }
  ```

#### 2. User Registration (Sign Up)

- **Endpoint**: `POST /auth/signup`
- **Description**: Create a new user account
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```
- **Success Response** (201):
  ```json
  {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2025-11-05T10:30:00Z"
    }
  }
  ```
- **Error Response** (400):
  ```json
  {
    "error": "Email already exists or validation failed"
  }
  ```

#### 3. User Sign In (Request OTP)

- **Endpoint**: `POST /auth/signin`
- **Description**: Generate and send OTP to user's email
- **Request Body**:
  ```json
  {
    "email": "john@example.com"
  }
  ```
- **Success Response** (200):
  ```json
  {
    "id": "otp-uuid"
  }
  ```
- **Error Response** (400):
  ```json
  {
    "error": "User not found"
  }
  ```

## Project Structure

```
Authentication-OTP-JWT-Project/
├── src/
│   ├── app.ts                 # Main Express application
│   ├── controllers/
│   │   ├── auth.ts           # Authentication controllers (signin, signup)
│   │   └── ping.ts           # Health check controller
│   ├── routes/
│   │   └── main.ts           # Route definitions
│   ├── services/
│   │   ├── user.ts           # User business logic
│   │   └── otp.ts            # OTP generation and management
│   ├── schemas/
│   │   ├── auth.signin.ts    # Sign-in validation schema
│   │   └── auth.signup.ts    # Sign-up validation schema
│   ├── libs/
│   │   ├── mailtrap.ts       # Email service integration
│   │   └── prisma.ts         # Prisma client
│   └── generated/            # Auto-generated Prisma types
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── migrations/           # Database migrations
├── package.json              # Project metadata and dependencies
├── tsconfig.json             # TypeScript configuration
└── .env                      # Environment variables (create this)
```

## Database

This project uses **Prisma** as the ORM with SQLite as the default database. The database schema includes:

### Models

- **User**: Stores user account information

  - `id`: Unique identifier
  - `name`: User's full name
  - `email`: User's email address (unique)
  - `createdAt`: Account creation timestamp

- **OTP**: Stores one-time password records
  - `id`: Unique identifier
  - `code`: Generated OTP code
  - `userId`: Reference to user
  - `createdAt`: OTP creation timestamp
  - `expiresAt`: OTP expiration time

### Database Commands

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# View the database GUI
npx prisma studio

# Reset the database (development only)
npx prisma migrate reset
```

## Security Considerations

- ✅ All routes are protected with input validation using Zod
- ✅ HTTP headers secured with Helmet
- ✅ CORS enabled for safe cross-origin requests
- ✅ Environment variables stored in `.env` file
- ✅ Sensitive data never exposed in responses
- ✅ UUID used for token generation
- ✅ Email verification via OTP for additional security

## License

This project is licensed under the **ISC License**.

---

**Created**: November 2025  
**Author**: Marcos-ViniciusDEV  
**Repository**: [Authentication-OTP-JWT-Project](https://github.com/Marcos-ViniciusDEV/Authentication-OTP-JWT-Project)
