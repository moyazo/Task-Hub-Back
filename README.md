# Task_Hub_Back

Hi everyone! This project is the back-end repository of **Task Hub**.  
The application is split into two repositories:

- **Back-end** → this repository
- **Front-end** → Angular client repository

This project provides a full back-end flow built with **Node.js**, **Express.js**, **TypeScript** and **Sequelize**.  
It exposes a REST API that receives and returns **JSON** data and supports the full CRUD required by the application.

---

## Tech Stack

- Node.js
- Express.js
- TypeScript
- Sequelize
- PostgreSQL
- JWT Authentication
- Helmet
- CORS
- Cookie Parser
- Compression
- Express Rate Limit

---

## Main Features

- User registration and login
- JWT-based authentication
- Protected and public routes
- CRUD operations for:
  - Users
  - Ambits
  - Categories
  - Tasks
- Layered architecture:
  - Routes
  - Controllers
  - Services
  - Repositories
  - Models
- Custom API response structure
- Security middleware and request protection

---

## Requirements

Before starting, make sure you have installed:

- Node.js
- PostgreSQL
- Git
- TypeScript
- Yarn or NPM

---

## Installation

### 1. Clone the repository

```bash
git clone <repo-url>
cd Task_Hub_Back
```

### 2. Install dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### 3. Create the environment file

Create a `.env` file in the project root.

Example:

```env
PORT=8000
NODE_ENV=development

TOKEN_SECRET=your_super_secret_key
JWT_ALGORITHMS=HS256

DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_hub
DB_USER=postgres
DB_PASSWORD=your_password
DB_DIALECT=postgres

URLFRONTEND=http://localhost:3000
CORS_ORIGINS=http://localhost:3000

COOKIE_SECRET=your_cookie_secret
```

Adjust the values to your local environment.

### 4. Create the PostgreSQL database

Create a database manually in PostgreSQL with the name used in your `.env`, for example:

```sql
CREATE DATABASE task_hub;
```

### 5. Run migrations

Run the database migrations to create the tables.

Using npm:

```bash
npx sequelize-cli db:migrate
```

Or with yarn:

```bash
yarn sequelize-cli db:migrate
```

### 6. Start the development server

Using npm:

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

The server should run on:

```bash
http://localhost:8000
```

---

## Environment Variables

The project uses environment variables for configuration.

### Required variables

- `PORT` → server port
- `NODE_ENV` → environment (`development` / `production`)
- `TOKEN_SECRET` → JWT secret key
- `JWT_ALGORITHMS` → allowed JWT algorithm(s)
- `DB_HOST` → database host
- `DB_PORT` → database port
- `DB_NAME` → database name
- `DB_USER` → database user
- `DB_PASSWORD` → database password
- `DB_DIALECT` → database dialect
- `URLFRONTEND` → front-end URL
- `CORS_ORIGINS` → allowed CORS origins
- `COOKIE_SECRET` → cookie parser secret

---

## Project Structure

```bash
Task_Hub_Back/
│
├── migrations/
├── src/
│   ├── common/
│   │   ├── constants/
│   │   ├── interfaces/
│   │   └── types/
│   │
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   └── utils/
│
├── index.ts
├── package.json
└── tsconfig.json
```

---

## Architecture Overview

This project follows a layered architecture:

### 1. Routes

Routes define the available API endpoints and connect them to controllers.

### 2. Controllers

Controllers manage the HTTP request and response:

- read request params/body
- perform basic validation
- call the corresponding service
- return the final response

### 3. Services

Services contain the business logic of the application:

- validate data consistency
- apply rules
- coordinate repository calls
- prepare the final result for the controller

### 4. Repositories

Repositories handle direct access to the database through Sequelize models.

### 5. Models

Models define the database entities and their relationships.

### 6. Middleware

Middleware is used for:

- authentication
- security
- request parsing
- rate limiting
- CORS control

---

## Request Flow

A request in this backend follows this general flow:

1. The client sends an HTTP request to an endpoint.
2. The request passes through the global middleware chain:
   - security headers
   - CORS
   - JSON/body parsing
   - cookie parsing
   - compression
   - rate limiting
3. The application checks whether the route is public or protected.
4. If the route is protected, the authentication middleware validates the token.
5. The request is matched to the corresponding router.
6. The router calls the controller.
7. The controller validates the minimum HTTP input and delegates the action to the service.
8. The service applies the business logic.
9. The service calls the repository when database access is needed.
10. The repository interacts with Sequelize models and the database.
11. The response returns back through the controller using the custom response format.

---

## Authentication Flow

Authentication is based on JWT.

### Public routes

The following routes are public:

- `/auth/signup`
- `/auth/signin`
- `/auth/signout`

### Protected routes

All other routes require authentication.

The authentication middleware:

1. Reads the token from:
   - `Authorization: Bearer <token>`
   - or cookie `token`
2. Verifies the JWT
3. Checks that the user still exists in the database
4. Injects the authenticated user into `req.user`

---

## Custom Response Format

Every endpoint follows a shared response format.

### Success response

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

### Error response

```json
{
  "success": false,
  "message": "Something went wrong",
  "errors": []
}
```

---

## Main Entities

### User

Represents an application user.

Main fields:

- `id`
- `name`
- `email`
- `username`
- `password`
- `role`

### Ambit

Represents a general organizational scope for categories.

Main fields:

- `id`
- `name`

### Category

Represents a task category linked to an ambit.

Main fields:

- `id`
- `name`
- `ambit_id`

### Task

Represents an individual task assigned to a user and category.

Main fields:

- `id`
- `title`
- `description`
- `status`
- `priority`
- `dueDate`
- `user_id`
- `category_id`

---

## Main Endpoints

### Auth

- `POST /auth/signup`
- `POST /auth/signin`
- `POST /auth/signout`

### Users

- `GET /users`
- `GET /users/me`
- `GET /users/:id`
- `PUT /users/:id`
- `DELETE /users/:id`

### Ambit

- `GET /ambit`
- `GET /ambit/:id`
- `POST /ambit`
- `PUT /ambit/:id`
- `DELETE /ambit/:id`

### Category

- `GET /category`
- `GET /category/:id`
- `POST /category`
- `PUT /category/:id`
- `DELETE /category/:id`

### Task

- `GET /task`
- `GET /task/:id`
- `GET /task/user/:userId`
- `GET /task/category/:categoryId`
- `POST /task`
- `PUT /task/:id`
- `DELETE /task/:id`

---

## Security Notes

This project includes several security-related measures:

- `helmet` for secure HTTP headers
- `cors` for origin control
- `cookie-parser` for cookie handling
- `compression` for optimized responses
- `express-rate-limit` for request limiting
- JWT validation in protected routes
- hidden `x-powered-by` header

---

## Scripts

These may vary depending on your `package.json`, but typical scripts are:

```json
{
  "dev": "ts-node-dev --respawn --transpile-only index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

---

## Notes

- The project is still under active development.
- Some validations and security hardening may still be improved.
- The front-end repository will consume these endpoints.

---

## Author

Developed as part of the **Task Hub** project.