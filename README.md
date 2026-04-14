# CampusNest

A full-stack housing listings platform for college students. Users can browse, post, and manage off-campus housing listings near their university campuses.

## Features

- Browse housing listings filtered by campus, price, bedrooms, amenities, and more
- View detailed listing pages with photos, stats, and contact info
- Post your own listings with up to 10 photos
- Delete listings you own
- User authentication (sign up / sign in) with JWT
- Protected routes — browsing and posting require an account
- Contact form for general inquiries

## Tech Stack

**Frontend**
- React 19 + TypeScript
- React Router v7
- Tailwind CSS v4
- Vite

**Backend**
- Node.js + Express 5
- MongoDB (via official Node driver)
- Multer (image uploads)
- bcrypt (password hashing)
- JSON Web Tokens (auth)

## Project Structure

```
csc437-finalProject/
├── frontend/          # React app
│   └── src/
│       ├── App.tsx
│       ├── shared/    # Shared types and route constants
│       └── ...
├── backend/           # Express API
│   └── src/
│       ├── main.ts
│       ├── ListingProvider.ts
│       ├── CredentialsProvider.ts
│       └── routes/
└── shared/            # Types shared between frontend and backend
```

## Getting Started

### Prerequisites

- Node.js 18+
- A running MongoDB instance

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
MONGODB_URI=mongodb://localhost:27017
DB_NAME=campusnest
LISTINGS_COLLECTION_NAME=listings
USERS_COLLECTION_NAME=users
IMAGE_UPLOAD_DIR=uploads
JWT_SECRET=your_secret_here
PORT=3000
```

### Install Dependencies

```bash
# From the project root
npm install

# Frontend
cd frontend && npm install

# Backend
cd backend && npm install
```

### Run in Development

```bash
# Start the backend (from backend/)
npm run dev

# Start the frontend (from frontend/)
npm run dev
```

The frontend dev server proxies `/api` requests to the backend.

### Build for Production

```bash
# Build frontend
cd frontend && npm run build

# Build backend
cd backend && npm run build && npm start
```

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/listings` | No | Get all listings |
| POST | `/api/listings` | Yes | Create a new listing |
| GET | `/api/listings/:id` | No | Get a single listing |
| DELETE | `/api/listings/:id` | Yes | Delete a listing (owner only) |
| GET | `/api/users/listings` | Yes | Get listings posted by the logged-in user |
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Sign in and receive a JWT |

## Supported Campuses

- Cal Poly SLO
- UCLA
- UC Berkeley
