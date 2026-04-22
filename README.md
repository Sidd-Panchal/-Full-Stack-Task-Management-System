# Full-Stack Task Management System

This is a production-ready full-stack application built for a Backend Developer Internship assignment. It features a scalable RESTful API with Authentication, Role-Based Access Control (RBAC), and a dynamic React frontend demonstrating the system's capabilities.

## Tech Stack
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Frontend**: React.js (Vite), Tailwind CSS, Lucide React
- **Authentication**: JWT (JSON Web Tokens), bcrypt for password hashing
- **API Documentation**: Swagger UI

## Deliverables Included
- ✅ Complete and well-structured Backend Code
- ✅ Functional and styled Frontend Code
- ✅ API Documentation (Swagger)
- ✅ Scalability concepts note

---

## 🚀 Setup Instructions

### 1. Prerequisites
- [Node.js](https://nodejs.org/en/) installed (v16+)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally, OR a MongoDB Atlas connection string.

### 2. Backend Setup
1. Open a terminal and navgiate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env` and adjust variables if needed. By default, it connects to a local MongoDB instance.
   ```bash
   cp .env.example .env
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   *The server will run on port 5000.*

### 3. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on port 5173 (usually).*

---

## 📚 API Endpoints

Once the backend is running, you can view the fully interactive Swagger API Documentation by visiting:
**http://localhost:5000/api-docs**

### Authentication & Users
- `POST /api/v1/auth/register` - Create a new user (role: 'user' or 'admin')
- `POST /api/v1/auth/login` - Authenticate user & get JWT

### Tasks (Protected)
- `GET /api/v1/tasks` - Get all tasks for the logged-in user
- `POST /api/v1/tasks` - Create a new task
- `PUT /api/v1/tasks/:id` - Update a specific task
- `DELETE /api/v1/tasks/:id` - Delete a task

### Admin (Protected, Admin Only)
- `GET /api/v1/admin/users` - Get all registered users
- `DELETE /api/v1/admin/users/:id` - Delete a user

---

## 🔐 Sample Testing Flow

1. **Register an Admin**: Go to `/register` in the UI. Choose "Admin" as the role. 
2. **Dashboard**: Once logged in, you'll be taken to the Dashboard where you can perform CRUD operations on Tasks.
3. **Admin Panel**: Click the "Admin" button in the Navbar to view and manage all users.
4. **Register a User**: Logout and register a standard "User" to see how they interact with Tasks and cannot see the Admin panel.

---

## 📈 Scalability Note (How to Scale this Application)

If this application needed to serve millions of users, we would implement the following scalability patterns:

1. **Microservices Architecture**: Split the monolithic Express app into smaller, independent services (e.g., Auth Service, Task Service, Notification Service) to allow them to scale independently.
2. **Load Balancing**: Deploy multiple instances of the Node.js backend behind a Load Balancer (like Nginx or AWS ALB) to evenly distribute incoming HTTP traffic.
3. **Database Scaling**: Implement MongoDB Sharding to distribute data across multiple machines. Utilize Replica Sets for high availability.
4. **Caching Strategy**: Introduce **Redis** to cache frequently accessed data. For instance, caching the list of users or complex active tasks to reduce MongoDB query load.
5. **Stateless JWTs**: The current JWT implementation is stateless and easily scalable, meaning any backend instance can authenticate a user without needing session tokens stored on the server.
6. **Task Queues**: For heavy background jobs (e.g., sending welcome emails upon registration, or generating task reports), use a message broker like RabbitMQ or Kafka.
