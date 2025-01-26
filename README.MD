# CVWO Web Forum Project

A modern web forum frontend application built with React, enabling users to create, share, and interact with posts.

## ✨ Core Features

### Authentication Interface

- User registration and login forms
- Protected route navigation
- Session management with JWT tokens
- Persistent authentication using HTTP-only cookies

### Posts Management UI

- Create new posts with title and content
- View all posts
- View individual post details
- Edit posts interface (for post authors)
- Real-time post updates using RTK Query

### User Experience

- Responsive Material UI design
- Toast notifications for actions
- Loading states and error handling
- User-friendly navigation

## 🛠️ Technical Stack

### Frontend Components

- React 18 with TypeScript
- Redux Toolkit + RTK Query for state management
- Material UI components
- React Router v6 for navigation

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- NPM package manager

### Setup

1. Install npm dependencies

```bash
npm install
```

2. Set environment Variables under `.env.production` for API link to NUSpherebackend

```yaml
VITE_API_URL=http://localhost:8080/api
```

3. Run production server

```bash
npm run build
npm run service
```
