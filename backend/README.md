# Blog API Documentation

A modern blogging platform backend built with Node.js, Express.js, MongoDB, and Mongoose.

## Overview

This project exposes a REST API for:

- user registration and authentication
- blog creation, update, fetch, and deletion
- category management
- user profile access and updates
- health monitoring

## Base URL

- Local: http://localhost:3000/api/v1

## Common Response Format

All successful responses follow this structure:

```json
{
  "statusCode": 200,
  "data": {},
  "message": "Success",
  "success": true
}
```

All failed responses follow this structure:

```json
{
  "success": false,
  "message": "Something went wrong",
  "errors": [],
  "stack": "..."
}
```

> In production, the stack trace is usually omitted.

## Authentication Flow

The API uses JWT-based authentication.

1. Register or login to receive an access token.
2. The server also sets cookies for refreshToken and accessToken.
3. Protected routes can read the token from:
   - the Authorization header as Bearer token, or
   - the accessToken cookie.

## API Routes

### 1. Health Check

- Method: GET
- Endpoint: /healthcheck
- Description: Confirms that the server is running.

Response:

```json
{
  "statusCode": 200,
  "data": {
    "message": "Server is Healthy!"
  },
  "message": "Success",
  "success": true
}
```

---

### 2. Authentication Routes

#### Register User

- Method: POST
- Endpoint: /auth/register
- Description: Creates a new user account and returns a JWT access token.

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
  "statusCode": 201,
  "data": {
    "user": {
      "_id": "64f...",
      "fullName": "John Doe",
      "username": "johndoe",
      "email": "john@example.com",
      "role": "User",
      "createdAt": "...",
      "updatedAt": "..."
    },
    "accessToken": "jwt_token_here"
  },
  "message": "User registered successfully",
  "success": true
}
```

#### Login User

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
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "64f...",
      "fullName": "John Doe",
      "username": "johndoe",
      "email": "john@example.com",
      "role": "User"
    },
    "accessToken": "jwt_token_here"
  },
  "message": "User logged in successfully",
  "success": true
}
```

#### Logout User

- Method: POST
- Endpoint: /auth/logout
- Description: Clears the auth cookies and logs the user out.

Success response:

```json
{
  "statusCode": 200,
  "data": {},
  "message": "User logged out successfully",
  "success": true
}
```

#### Get Logged-in User Profile

- Method: GET
- Endpoint: /auth/profile
- Description: Returns the currently authenticated user profile.
- Auth required: Yes

Success response:

```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "64f...",
      "fullName": "John Doe",
      "username": "johndoe",
      "email": "john@example.com",
      "role": "User"
    }
  },
  "message": "User profile fetched successfully",
  "success": true
}
```

---

### 3. Category Routes

#### Create Category

- Method: POST
- Endpoint: /categories
- Description: Creates a category with a unique slug.

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
  "statusCode": 201,
  "data": {
    "_id": "64f...",
    "name": "Technology",
    "slug": "technology",
    "description": "Posts about tech",
    "icon": "💻",
    "color": "#2563eb",
    "totalBlogs": 0,
    "createdAt": "...",
    "updatedAt": "..."
  },
  "message": "Category created successfully",
  "success": true
}
```

If the category already exists, the API returns:

```json
{
  "statusCode": 200,
  "data": {
    "_id": "64f...",
    "name": "Technology",
    "slug": "technology"
  },
  "message": "Category already exists",
  "success": true
}
```

#### Get All Categories

- Method: GET
- Endpoint: /categories
- Description: Returns all categories sorted alphabetically by name.

Success response:

```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "64f...",
      "name": "Art",
      "slug": "art",
      "description": "",
      "icon": "",
      "color": "#000000",
      "totalBlogs": 0
    }
  ],
  "message": "Categories fetched successfully",
  "success": true
}
```

#### Get Category by ID

- Method: GET
- Endpoint: /categories/:id
- Description: Returns a single category by its MongoDB ID.

Success response:

```json
{
  "statusCode": 200,
  "data": {
    "_id": "64f...",
    "name": "Technology",
    "slug": "technology",
    "description": "Posts about tech"
  },
  "message": "Category fetched successfully",
  "success": true
}
```

#### Update Category

- Method: PATCH
- Endpoint: /categories/:id
- Description: Updates a category's name, description, icon, or color.

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
  "statusCode": 200,
  "data": {
    "_id": "64f...",
    "name": "AI & Tech",
    "slug": "ai-tech",
    "description": "Updated description",
    "icon": "🤖",
    "color": "#4f46e5"
  },
  "message": "Category updated successfully",
  "success": true
}
```

---

### 4. Blog Routes

#### Get All Blogs

- Method: GET
- Endpoint: /blogs
- Description: Returns paginated blogs with optional search and filtering.

Query parameters:

- page: page number (default 1)
- limit: number of results per page (default 10)
- search: search term for title, subtitle, or content
- category: category ID
- sortBy: field to sort by (default createdAt)
- order: asc or desc (default desc)

Success response:

```json
{
  "statusCode": 200,
  "data": {
    "blogs": [
      {
        "_id": "64f...",
        "title": "My First Blog",
        "slug": "my-first-blog-123456",
        "content": "Hello world",
        "status": "Draft",
        "visibility": "Public",
        "author": {
          "_id": "64f...",
          "fullName": "John Doe",
          "username": "johndoe",
          "email": "john@example.com"
        },
        "category": {
          "_id": "64f...",
          "name": "Technology",
          "slug": "technology"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalBlogs": 1,
      "totalPages": 1
    }
  },
  "message": "Blogs fetched successfully",
  "success": true
}
```

#### Create Blog

- Method: POST
- Endpoint: /blogs
- Description: Creates a new blog. Auth required.

Request body:

```json
{
  "title": "My First Blog",
  "subtitle": "A short intro",
  "content": "This is the full blog content.",
  "category": "64f...",
  "tags": ["node", "express"],
  "coverImage": "https://example.com/image.jpg",
  "status": "Draft",
  "visibility": "Public",
  "publish": false
}
```

Success response:

```json
{
  "statusCode": 201,
  "data": {
    "_id": "64f...",
    "title": "My First Blog",
    "slug": "my-first-blog-123456",
    "content": "This is the full blog content.",
    "status": "Draft",
    "visibility": "Public",
    "author": "64f...",
    "category": "64f..."
  },
  "message": "Blog created successfully",
  "success": true
}
```

> If publish is true, the blog is saved as Published. Otherwise the status uses the provided status or defaults to Draft.

#### Get Blog by ID

- Method: GET
- Endpoint: /blogs/:id
- Description: Returns a single blog with populated author and category details.

Success response:

```json
{
  "statusCode": 200,
  "data": {
    "_id": "64f...",
    "title": "My First Blog",
    "slug": "my-first-blog-123456",
    "content": "This is the full blog content.",
    "author": {
      "_id": "64f...",
      "fullName": "John Doe",
      "username": "johndoe",
      "email": "john@example.com"
    },
    "category": {
      "_id": "64f...",
      "name": "Technology",
      "slug": "technology"
    }
  },
  "message": "Blog fetched successfully",
  "success": true
}
```

#### Update Blog

- Method: PUT
- Endpoint: /blogs/:id
- Description: Updates a blog only if the current user is the author. Auth required.

Success response:

```json
{
  "statusCode": 200,
  "data": {
    "_id": "64f...",
    "title": "Updated Title",
    "slug": "updated-title-123456",
    "content": "Updated content"
  },
  "message": "Blog updated successfully",
  "success": true
}
```

#### Delete Blog

- Method: DELETE
- Endpoint: /blogs/:id
- Description: Deletes a blog only if the current user is the author. Auth required.

Success response:

```json
{
  "statusCode": 200,
  "data": {},
  "message": "Blog deleted successfully",
  "success": true
}
```

---

### 5. User Routes

#### Get User Profile

- Method: GET
- Endpoint: /users/profile
- Description: Returns the authenticated user's profile and blog stats. Auth required.

Success response:

```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "64f...",
      "fullName": "John Doe",
      "username": "johndoe",
      "email": "john@example.com",
      "bio": "",
      "profilePicture": "",
      "role": "User"
    },
    "stats": {
      "totalBlogs": 3,
      "publishedBlogs": 1,
      "draftBlogs": 2
    }
  },
  "message": "Profile fetched successfully",
  "success": true
}
```

#### Update User Profile

- Method: PUT
- Endpoint: /users/profile
- Description: Updates full name, username, bio, profile picture, or social links. Auth required.

Request body:

```json
{
  "fullName": "Jane Doe",
  "username": "janedoe",
  "bio": "Writer and developer",
  "profilePicture": "https://example.com/avatar.jpg"
}
```

Success response:

```json
{
  "statusCode": 200,
  "data": {
    "_id": "64f...",
    "fullName": "Jane Doe",
    "username": "janedoe",
    "email": "john@example.com",
    "bio": "Writer and developer",
    "profilePicture": "https://example.com/avatar.jpg",
    "role": "User"
  },
  "message": "Profile updated successfully",
  "success": true
}
```

---

## Typical Request Flow

A typical happy path looks like this:

1. Create or log in as a user.
2. Create a category.
3. Create a blog using that category.
4. Fetch all blogs or search by keyword.
5. Update or delete your own blog.
6. View your profile and blog statistics.

## Notes

- All routes are mounted under /api/v1.
- Most write operations require authentication.
- Blog ownership is enforced by the author ID.
- Category creation is based on a normalized slug derived from the category name.


1. The client sends a request to /categories.
2. The server validates the incoming data.
3. For create requests, it checks whether a category with the same slug already exists.
4. If it exists, the existing category is returned.
5. Otherwise, a new category is created and saved in MongoDB.
6. For read requests, the server fetches either all categories or one category by ID.
7. For update requests, the server finds the category, applies the changes, saves it, and returns the updated category.

## important feature to add -> take feedback
