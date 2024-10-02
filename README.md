# Music Streamming App - Backend

This is the backend code for the music streaming application built using Node.js, Express.js, and MongoDB. 

The backend handles user authentication, song upload, playlist management, and other functionalities. 

It also integrates third-party services like Cloudinary for file storage, Nodemailer for email communication, and Multer for file handling.

**NOTE :** The frontend is handled separately.

## Technologies Used
- **Node.js** - Backend runtime environment.
- **Express.js** - Framework for building APIs.
- **MongoDB** - NoSQL database for storing user and song data.
- **Cloudinary** - Cloud storage for audio file uploads.
- **Multer** - Middleware for handling multipart/form-data (used for file uploads).
- **JSON Web Token (JWT)** - Authentication via token.
- **bcryptjs** - Password hashing.
- **dotenv** - Environment variables.
- **cors** - Middleware for handling Cross-Origin Resource Sharing.
- **Nodemailer** - For sending emails (e.g., password resets).
- **Mongoose** - ODM for MongoDB, used for schema and model creation.

## API Endpoints

*BASE_URL* : *https://music-streamming-sk-app-be.onrender.com*

**Song Retrieval**

- **GET**  /api/audio/upload-audio - Retrieves all uploaded songs.

**Authentication**

- **POST** /api/user/register-user - Registers a new user.
- **POST** /api/user/login-user - Authenticates a user and returns a JWT token.
- **POST** /api/user/forgot-password - Sends a password reset link to the user's email.
- **PUT**  /api/user/reset-password/:id/:token - Resets the user's password.

**User Details & Playlist Management**

- **GET**  /api/update/user-details/:id - Retrieves user details.
- **PUT**  /api/update/user-details/:id - Updates user details.
- **POST** /api/update/user-details/createPlaylist/:userId - Creates a new playlist for a user.
- **GET**  /api/update/user-details/getPlaylist/:id - Retrieves a specific playlist for a user.
- **GET**  /api/update/playlist/:id - Retrieves a playlist by its ID.

## Middleware
1. ***Multer*** *is used for handling file uploads.*
2. ***Cloudinary*** *is integrated using multer-storage-cloudinary to store audio files in the cloud.*
3. ***JWT*** *is used to protect private routes.*

## Documentation

A complete API reference with detailed endpoints and request examples is available through Postman documentation, where all APIs are documented and published : 
[ SK Music Streamming App - API Documentation](https://documenter.getpostman.com/view/35371272/2sAXxJjFQC)

## Deployment

Front End Deployed URL : 
https://music-streamming-sk-fe.netlify.app/