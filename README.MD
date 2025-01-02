# CVWO Web Forum Project

A full-stack web forum application built with React and Go that enables users to create, share, and interact with posts.

## ✨ Core Features

### Authentication

- User registration with secure password hashing
- JWT-based authentication with secure HTTP-only cookies
- Protected routes and API endpoints

### Posts Management

- Create new posts with title and content
- View all posts in a paginated feed
- View individual posts
- Edit posts (restricted to post authors)
- Real-time post updates using RTK Query

### User Experience

- Responsive Material UI design
- Toast notifications for actions
- Loading states and error handling
- Secure user sessions

## 🛠️ Technical Stack

### Frontend

- React 18 with TypeScript
- Redux Toolkit + RTK Query for state management
- Material UI components
- React Router v6 for navigation

### Backend

- Go with Gin web framework
- PostgreSQL with pgx driver
- JWT authentication
- Secure password hashing with bcrypt
- NanoID for URL-friendly unique IDs

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- Go 1.23+
- PostgreSQL
- Yarn package manager

### Frontend Setup

```bash
cd frontend
yarn install
yarn dev
```

### Frontend Setup

```bash
cd goBackend
# Create .env file with required variables
go run cmd/server/main.go
```

### Environment Variables

```yaml
DATABASE_URL=postgresql://[user]:[password]@localhost:[dbPort]/[dbname]
PORT=8080
JWT_SECRET=[your-secret-key]
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT authentication with secure cookies
- CORS protection
- SQL injection prevention with parameterised queries using pgx driver
- Request rate limiting (yet to be implemented via middleware)
