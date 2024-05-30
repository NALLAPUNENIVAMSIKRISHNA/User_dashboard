# User Dashboard Application

## Overview
This is a full-stack web application designed to manage user details with both user and admin roles. The application features a React-based frontend and a Node.js/Express backend connected to a MongoDB database. Users can sign up, log in, and view their profile details, while admins can access a dashboard with details of all users and graphical representations of user counts.

## Features
- User Registration and Login
- Profile Page for Users
- Admin Dashboard
  - View all registered users
  - Graphical representation of user counts
- Authentication and Authorization
- MongoDB Integration

## Frontend
### Technologies Used
- React
- Recoil (State Management)
- React Router

### Pages
1. **Signup Page**
   - Input fields: Name, Password, Email, Gender
2. **Login Page**
   - Input fields: Name, Email, Password
3. **Profile Page**
   - Displays user details: Name, Email, Gender, Last Login Date
4. **Admin Dashboard**
   - Displays all users' details: Name, Email, Count, Gender, Last Login Date
   - Graphical representation of user counts based on date/month

### How to Run the Frontend
1. Navigate to the frontend directory.
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Access the application at `http://localhost:3000`

## Backend
### Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose (ODM)

### API Endpoints
1. **User Authentication**
   - `POST /api/auth/signup`: User registration
   - `POST /api/auth/login`: User login
   - `GET /api/auth/profile`: Fetch user profile details
2. **Admin**
   - `POST /api/auth/admin/login`: Admin login
   - `GET /api/admin/users`: Fetch all users' details

### MongoDB Schema
- **User Schema**
  - Name
  - Password
  - Email
  - Count
  - Gender
  - Last Login Date

### How to Run the Backend
1. Navigate to the backend directory.
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. The server will run on `http://localhost:5000`
