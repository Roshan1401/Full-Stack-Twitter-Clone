# DevTalk

A full-stack Twitter/X-style social media platform built with the **MERN stack**. DevTalk lets users sign up, post updates with media, follow other users, like and bookmark posts, search for people, and manage their profiles — all wrapped in a modern, responsive React UI.

## Features

- **Authentication**
  - Email/password sign-up with **OTP email verification** (via Resend)
  - Secure login/logout with JWT access tokens stored in HTTP-only cookies
  - Password hashing with bcrypt
- **Posts**
  - Create posts with multiple file/image attachments (uploaded to Cloudinary)
  - Edit, delete, and fetch posts (single or paginated feed)
  - Like / unlike posts
  - Bookmark / unbookmark posts and view saved bookmarks
- **Social Graph**
  - Follow / unfollow other users
  - View user profiles by username
  - Discover random/suggested users
- **Profile Management**
  - Edit profile details, avatar, and banner image
- **Search**
  - Search for users by name/username
- **Frontend Experience**
  - Built with React 19, Redux Toolkit for state management, React Router, and Tailwind CSS
  - Reusable components for posts, modals, avatars, and layout

## Tech Stack

### Backend
| Layer            | Technology                                |
|--------------------|---------------------------------------------|
| Runtime            | Node.js (ES Modules)                        |
| Framework          | Express 5                                    |
| Database           | MongoDB with Mongoose                        |
| Auth                | JSON Web Tokens (jsonwebtoken), bcryptjs    |
| File Uploads        | Multer (local) → Cloudinary (cloud storage)  |
| Email/OTP           | Resend, Nodemailer                           |
| Validation           | express-validator                            |

### Frontend
| Layer            | Technology                                |
|--------------------|---------------------------------------------|
| Library             | React 19                                     |
| State Management    | Redux Toolkit, React Redux                   |
| Routing             | React Router DOM v7                          |
| Styling             | Tailwind CSS v4                              |
| Forms               | React Hook Form                              |
| HTTP Client          | Axios                                        |
| Icons                | Lucide React, React Icons, FontAwesome       |
| Build Tool           | Vite                                         |

## Project Structure

```
DevTalk/
├── backend/
│   ├── app.js                 # Express app setup, middleware, route mounting
│   ├── server.js                # Entry point: loads env, connects MongoDB, starts server
│   ├── models/                  # Mongoose schemas (user, post, likes, bookmark, otp)
│   ├── controllers/             # Business logic per resource
│   ├── routes/                   # Express routers per resource
│   ├── middleware/
│   │   ├── auth.middleware.js     # JWT verification (authenticateUser)
│   │   ├── error.middleware.js    # Centralized error handling
│   │   ├── multer.middlewaer.js   # File upload handling for posts
│   │   └── uploadProfile.middleware.js  # File upload handling for avatar/banner
│   └── utils/
│       ├── ApiError.js / ApiResponse.js   # Standardized response wrappers
│       ├── asyncHandler.js                # Wraps async route handlers
│       ├── cloudinary.js                  # Upload helper for Cloudinary
│       ├── cookieOptions.js               # Cookie config for tokens
│       └── generateTokens.js              # JWT token generation
│
└── frontend/
    └── src/
        ├── Redux/                # Redux slices: auth, posts, bookmarks, profile
        ├── components/            # UI components (Post, Modal, Avatar, Input, Layout, etc.)
        ├── container/              # Page-level containers
        └── hooks/                  # Custom React hooks
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A [Cloudinary](https://cloudinary.com/) account (for media uploads)
- A [Resend](https://resend.com/) account (for sending OTP emails)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Roshan1401/DevTalk.git
   cd DevTalk
   ```

2. Install dependencies for backend, frontend, and root
   ```bash
   npm install
   npm install --prefix backend
   npm install --prefix frontend
   ```

3. Create a `.env` file inside `backend/` with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string

   ACCESS_TOKEN_SECRET=your_access_token_secret
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   REFRESH_TOKEN_EXPIRY=10d

   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   RESEND_API_KEY=your_resend_api_key
   ```

4. Run both frontend and backend together from the project root
   ```bash
   npm run dev
   ```

   Or run them separately:
   ```bash
   npm run backend    # starts the Express server
   npm run frontend   # starts the Vite dev server
   ```

   By default, the backend runs on `http://localhost:5000` and the frontend on `http://localhost:5173`.

## API Overview

All backend routes are prefixed with `/api/v1`. Most routes require authentication via the `authenticateUser` middleware (JWT access token sent as an HTTP-only cookie).

| Resource     | Base Route             | Notes                                       |
|---------------|--------------------------|-----------------------------------------------|
| Auth          | `/api/v1/auth`            | Sign up, login, logout                        |
| OTP           | `/api/v1/otp`             | Send & verify email OTP for sign-up           |
| Posts         | `/api/v1/post`             | CRUD, like, feed                              |
| Users         | `/api/v1/user`             | Profile, random users, edit profile           |
| Follow        | `/api/v1/`                  | Follow / unfollow users                       |
| Search        | `/api/v1/search`            | Search users                                  |
| Bookmarks     | `/api/v1/bookmark`          | Toggle & list bookmarks                       |

### Example: Auth Flow

| Method | Endpoint                  | Description                              |
|--------|------------------------------|---------------------------------------------|
| POST   | `/api/v1/otp/send`             | Send OTP to email for sign-up verification    |
| POST   | `/api/v1/otp/verify`           | Verify OTP and complete registration          |
| POST   | `/api/v1/auth/signUp`          | Register a new user                           |
| POST   | `/api/v1/auth/login`           | Log in and receive access token               |
| POST   | `/api/v1/auth/logout`          | Log out (requires auth)                       |

## Deployment

The frontend is configured for deployment on **Vercel** (`vercel.json` included), with the backend CORS configuration already set up to allow the deployed frontend origin.

## Scripts

| Command              | Description                                       |
|------------------------|------------------------------------------------------|
| `npm run dev`           | Runs backend and frontend concurrently (from root)    |
| `npm run backend`       | Runs only the backend dev server                       |
| `npm run frontend`      | Runs only the frontend dev server                       |

## License

ISC
