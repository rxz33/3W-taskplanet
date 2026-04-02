# 3W TaskPlanet Social App 

A full-stack social media application built for the 3W Full Stack Internship Assignment. This app allows users to create accounts, share posts with images, and interact with others through likes and comments—styled after the **TaskPlanet** mobile app.

## Features
- **Secure Auth**: Signup and Login with JWT protection.
- **Social Feed**: View posts from all users with smooth pagination.
- **Image Uploads**: Upload photos directly from your computer to your posts.
- **Interactions**: Like posts and add comments.
- **Profile Page**: View your own posts in one place.
- **Mobile Responsive**: Built with Material UI for a premium, app-like feel.

---

## Tech Stack
- **Frontend**: React, Material UI (MUI), Axios, React Router.
- **Backend**: Node.js, Express, MongoDB, Multer (for uploads).
- **Authentication**: JWT (JSON Web Tokens).

---

## How to Run Locally

### 1. Prerequisite
Make sure you have **Node.js** and **MongoDB** installed on your system.

### 2. Backend Setup
1. Open a terminal in the `backend` folder.
2. Run `npm install` to install dependencies.
3. Create a `.env` file and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Run `npm run dev` to start the server.

### 3. Frontend Setup
1. Open a terminal in the `frontend` folder.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the app.
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure
- `/backend`: Node/Express API with MongoDB models and routes.
- `/frontend`: React application using Material UI components.
- `/backend/uploads`: Local storage for uploaded post images.

---

### Assignment Requirements Handled:
- [x] Account Creation (Signup/Login)
- [x] Create Post (Text + Image Upload)
- [x] Public Feed
- [x] Like & Comment Functionality
- [x] Pagination (Bonus)
- [x] JWT Authentication (Bonus)
- [x] Professional MUI Design
