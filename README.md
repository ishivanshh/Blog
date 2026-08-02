# YOURSPACE

A modern full-stack blogging platform built with **React.js**,
**Node.js**, **Express.js**, and **MongoDB**.

---

## Overview

Yourspace is designed to provide a clean writing experience similar to
Medium while allowing users to create, save, publish, and manage blogs.

### Goals

- Secure authentication
- Draft & publish workflow
- Rich blog management
- Search and category filtering
- Responsive UI
- Scalable architecture

---

# Tech Stack

## Frontend

- React.js
- React Router
- Tailwind CSS
- Axios
- Context API

## Backend

- Node.js
- Express.js

## Database

- MongoDB + Mongoose

## Authentication

- JWT
- bcrypt

## Storage

- Cloudinary (Images)
- Multer

## Deployment

- Vercel
- Render/Railway
- MongoDB Atlas

---

# Features

## Authentication

- Register
- Login
- Logout
- Protected Routes

## Blogs

- Create Blog
- Save Draft
- Publish Blog
- Edit Blog
- Delete Blog

## Home

- Featured Blogs
- Latest Blogs
- Categories
- Search

## Profile

- Update Profile
- My Blogs
- Drafts
- Published Blogs

---

# Development Roadmap

### Phase 1

- Project setup
- Folder structure
- Database design
- Authentication

### Phase 2

- Blog CRUD

### Phase 3

- Frontend Integration

### Phase 4

- Rich Text Editor
- Image Upload
- Voice Notes

### Phase 5

- Deployment & Optimization

---

# Future Enhancements

- AI Writing Assistant
- Comments
- Likes
- Analytics
- Notifications
- Social Sharing

## API Routes

### Base URL

- Local: http://localhost:3000/api/v1

### Authentication Routes

#### 1. Register User
- Method: POST
- Endpoint: /auth/register
- Description: Creates a new user account and returns an access token plus user details.

Request body:
```json
{
  "fullName": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "12345678"
}
```

Success response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "...",
      "fullName": "John Doe",
      "username": "johndoe",
      "email": "john@example.com"
    },
    "accessToken": "jwt_token_here"
  }
}
```

#### 2. Login User
- Method: POST
- Endpoint: /auth/login
- Description: Authenticates a user and returns a JWT access token.

Request body:
```json
{
  "username": "johndoe",
  "password": "12345678"
}
```

Success response:
```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "user": {
      "_id": "...",
      "fullName": "John Doe",
      "username": "johndoe",
      "email": "john@example.com"
    },
    "accessToken": "jwt_token_here"
  }
}
```

#### 3. Logout User
- Method: POST
- Endpoint: /auth/logout
- Description: Clears the auth cookie and logs the user out.

Success response:
```json
{
  "success": true,
  "message": "User logged out successfully",
  "data": {}
}
```

#### 4. Get Logged-in User Profile
- Method: GET
- Endpoint: /auth/profile
- Description: Returns the profile of the currently authenticated user.
- Requires: JWT in Authorization header or accessToken cookie.

Success response:
```json
{
  "success": true,
  "message": "User profile fetched successfully",
  "data": {
    "user": {
      "_id": "...",
      "fullName": "John Doe",
      "username": "johndoe",
      "email": "john@example.com",
      "role": "User"
    }
  }
}
```

### How Authentication Works

1. The user sends their credentials to /auth/register or /auth/login.
2. The server validates the input and checks the database.
3. If valid, the server generates a JWT access token and a refresh token.
4. The tokens are stored in cookies and returned to the client.
5. Protected routes such as /auth/profile use the verifyJWT middleware.
6. The middleware reads the token, verifies it, and attaches the user to the request object.

### Error Response Format

All failed requests return a JSON object like this:
```json
{
  "success": false,
  "message": "Something went wrong",
  "errors": []
}
```

### Category Routes

#### 1. Create Category
- Method: POST
- Endpoint: /categories
- Description: Creates a category if it does not already exist. If the slug already matches an existing category, the server returns the existing record instead.

Request body:
```json
{
  "name": "Technology",
  "description": "Posts about tech",
  "icon": "💻",
  "color": "#2563eb"
}
```

Success response:
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "_id": "...",
    "name": "Technology",
    "slug": "technology",
    "description": "Posts about tech",
    "icon": "💻",
    "color": "#2563eb",
    "totalBlogs": 0,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

If the category already exists, the response becomes:
```json
{
  "success": true,
  "message": "Category already exists",
  "data": {
    "_id": "...",
    "name": "Technology",
    "slug": "technology"
  }
}
```

#### 2. Get All Categories
- Method: GET
- Endpoint: /categories
- Description: Fetches all categories from the database and returns them as an array sorted alphabetically by name.

Success response:
```json
{
  "success": true,
  "message": "Categories fetched successfully",
  "data": [
    {
      "_id": "...",
      "name": "Art",
      "slug": "art",
      "description": "",
      "icon": "",
      "color": "#000000",
      "totalBlogs": 0
    },
    {
      "_id": "...",
      "name": "Technology",
      "slug": "technology",
      "description": "Posts about tech",
      "icon": "💻",
      "color": "#2563eb",
      "totalBlogs": 0
    }
  ]
}
```

#### 3. Get Category by ID
- Method: GET
- Endpoint: /categories/:id
- Description: Finds a single category by its MongoDB ID.

Success response:
```json
{
  "success": true,
  "message": "Category fetched successfully",
  "data": {
    "_id": "...",
    "name": "Technology",
    "slug": "technology",
    "description": "Posts about tech"
  }
}
```

If not found:
```json
{
  "success": false,
  "message": "Category not found",
  "errors": []
}
```

#### 4. Update Category
- Method: PUT
- Endpoint: /categories/:id
- Description: Updates the category fields passed in the request body and saves the updated document.

Request body:
```json
{
  "name": "AI & Tech",
  "description": "Updated description",
  "icon": "🤖",
  "color": "#4f46e5"
}
```

Success response:
```json
{
  "success": true,
  "message": "Category updated successfully",
  "data": {
    "_id": "...",
    "name": "AI & Tech",
    "slug": "ai-tech",
    "description": "Updated description",
    "icon": "🤖",
    "color": "#4f46e5"
  }
}
```

### How Category Flow Works

1. The client sends a request to /categories.
2. The server validates the incoming data.
3. For create requests, it checks whether a category with the same slug already exists.
4. If it exists, the existing category is returned.
5. Otherwise, a new category is created and saved in MongoDB.
6. For read requests, the server fetches either all categories or one category by ID.
7. For update requests, the server finds the category, applies the changes, saves it, and returns the updated category.

## important feature to add -> take feedback
