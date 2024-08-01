# WeatherApp Backend

## Project Title and Description
WeatherApp Backend is the server-side application that provides API endpoints for the WeatherApp frontend. It handles user authentication, weather data retrieval, and various other backend functionalities.

## Badges
![Static Badge](https://img.shields.io/badge/status-online-brightgreen)

## Table of Content
- [Project Title and Description](#project-title-and-description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Third-Party Libraries](#third-party-libraries)
- [License](#license)

## Features
- User authentication (signup, login, password reset)
- Secure API endpoints for weather data
- Error handling and logging

## Installation

### Prerequisites
- Node.js (v12 or higher)
- npm (v6 or higher)
- MongoDB (for database)

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/petrmichal0/weatherapp-backend.git
    ```

2. Navigate to the project directory:
    ```bash
    cd weatherapp-backend
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

### Set up Environment Variables

To run this application, you'll need to set up several environment variables. These variables are critical for connecting to external services like your MongoDB database, sending emails, and authenticating users. Follow these steps:

1. **Create a `.env` file:**  
   In the root directory of your project, create a file named `.env` where you will store these variables.

2. **Define the required environment variables:**  
   Add the following variables to your `.env` file. You will need to replace placeholder values with your actual credentials.

    ```env
    NODE_ENV=development
    PORT=3000

    # Database connection string
    DATABASE=mongodb+srv://<USERNAME>:<PASSWORD>@<YOUR_CLUSTER>.mongodb.net/weatherapp?retryWrites=true&w=majority
    DATABASE_PASSWORD=your_database_password

    # Email service configuration
    EMAIL_FROM=your_email@example.com
    EMAIL_PASSWORD=your_email_password
    EMAIL_HOST=smtp.your-email-provider.com
    EMAIL_PORT=your_email_provider_port

    # JWT configuration for authentication
    JWT_SECRET=your_jwt_secret
    JWT_COOKIE_EXPIRES_IN=90
    JWT_EXPIRES_IN=90d

    # API keys
    WEATHER_API_KEY=your_weather_api_key
    ```

3. **Obtain necessary credentials and API keys:**
   - **MongoDB Connection String:**  
     Sign up for MongoDB Atlas or use a local MongoDB instance. Replace `<USERNAME>`, `<PASSWORD>`, and `<YOUR_CLUSTER>` with your MongoDB credentials and cluster information.

   - **Email Service Configuration:**  
     You need an SMTP server to send emails. Different email providers have different configurations. For example:
     - For Gmail: use `smtp.gmail.com` as the host and `587` as the port.
     - For Seznam.cz: use `smtp.seznam.cz` as the host and `465` as the port (as shown in your example).
     Replace `EMAIL_HOST` and `EMAIL_PORT` in your `.env` file with the appropriate values based on your email service provider.
     Be aware of security and best practices when handling email credentials.

   - **JWT Secret:**  
     Generate a strong secret key that will be used to sign and verify JSON Web Tokens (JWTs) for authentication.

   - **Weather API Key:**  
     Sign up for a weather data provider service like [weatherapi.com](https://www.weatherapi.com/) and obtain an API key. This key will be used to fetch weather data in your application.

4. **Secure your environment variables:**
   - Make sure that your `.env` file is included in your `.gitignore` file to prevent it from being pushed to a public repository. This ensures your sensitive credentials remain secure.

By following these steps, you ensure that your application has access to all the necessary configuration details to connect to external services and operate correctly.

## Usage

### Running in Development Mode

To start the application in development mode, use the following command:

```bash
npm run dev
```

This will start the application with `nodemon`, which will automatically restart the server whenever you make changes to the code. The development server will run on the specified port (default is `3000`). You can access the API endpoints through [http://localhost:3000](http://localhost:3000).

### Running in Production Mode

To start the application in production mode, use the following command:

```bash
npm start
```
This command will run the application with `NODE_ENV=production`. The server will run on the specified port (default is `3000`). You can access the API endpoints through [http://localhost:3000](http://localhost:3000).

## Backend Information

The backend for this project is hosted at the following URL:

- **Backend API:** https://my-weatherapp-backend-1a24a5724dcc.herokuapp.com/

The source code for the backend is available on GitHub:

- **Backend Repository:** [https://github.com/petrmichal0/weatherapp-backend](https://github.com/petrmichal0/weatherapp-backend)

All API endpoints and detailed documentation on how to interact with the backend are provided in the backend repository. If you want to see the available API requests and how to use them, please visit the backend repository's README or relevant documentation files for more context.


# API Endpoints

| **HTTP Method** | **Endpoint**                 | **Description**                                        | **Request Example**                                                                                       | **Response Example**                                                                                                                                                    | **Authorization Required** |
|-----------------|------------------------------|--------------------------------------------------------|------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------|
| POST            | /api/v1/user/signup          | Sign up a new user                                      | { "name": "John Doe", "email": "john@example.com", "password": "password123", "passwordConfirm": "password123" }  | { "status": "success", "token": "jwt-token", "data": { "user": { "name": "John Doe", "email": "john@example.com", "favorites": [] } } }                               | No                         |
| POST            | /api/v1/user/login           | Log in an existing user                                 | { "email": "john@example.com", "password": "password123" }                                                | { "status": "success", "token": "jwt-token", "data": { "user": { "name": "John Doe", "email": "john@example.com", "favorites": [] } } }                               | No                         |
| GET             | /api/v1/user/logout          | Log out the current user                                | None                                                                                                       | { "status": "success" }                                                                                                                                               | Yes                        |
| POST            | /api/v1/user/forgotPassword  | Request a password reset                                | { "email": "john@example.com" }                                                                          | { "status": "success", "message": "Token sent to email!" }                                                                                                            | No                         |
| PATCH           | /api/v1/user/resetPassword/:token | Reset the user's password using a token                  | { "password": "newPassword123", "passwordConfirm": "newPassword123" }                                     | { "status": "success", "token": "jwt-token", "data": { "user": { "name": "John Doe", "email": "john@example.com", "favorites": [] } } }                               | No                         |
| GET             | /api/v1/user/currentUser     | Get the currently logged-in user                        | None                                                                                                       | { "status": "success", "data": { "user": { "name": "John Doe", "email": "john@example.com", "favorites": [] } } }                                                     | Yes                        |
| POST            | /api/v1/user/favorites       | Add a favorite city to the user's profile               | { "cityName": "Prague", "country": "Czech Republic" }                                                     | { "status": "success", "data": { "user": { "favorites": [ { "cityName": "Prague", "country": "Czech Republic" } ] } } }                                               | Yes                        |
| DELETE          | /api/v1/user/favorites       | Remove a favorite city from the user's profile          | { "cityName": "Prague", "country": "Czech Republic" }                                                     | { "status": "success", "data": { "user": { "favorites": [] } } }                                                                                                      | Yes                        |
| GET             | /api/v1/weather/forecast     | Get weather forecast for a specific city                | /api/v1/weather/forecast?cityName=Prague&days=5                                                           | { "status": "success", "data": { "location": { "name": "Prague" }, "forecast": { "forecastday": [ { "day": { "maxtemp_c": 20.0, "mintemp_c": 10.0, "condition": { "text": "Sunny" } } } ] } } } | No                         |
| GET             | /api/v1/weather/locations    | Search for locations based on city name                 | /api/v1/weather/locations?cityName=Prague                                                                 | { "status": "success", "data": [ { "id": 123, "name": "Prague", "region": "", "country": "Czech Republic" } ] }                                                       | No                         |

## Project Structure

```css
WeatherApp-Backend/
├── controllers/
│   ├── authController.js
│   ├── errorController.js
│   ├── userController.js
│   ├── weatherController.js
├── models/
│   ├── userModel.js
├── routes/
│   ├── userRoutes.js
│   ├── weatherRoutes.js
│   ├── utils/
│       ├── appError.js
│       ├── catchAsync.js
│       ├── email.js
├── .gitignore
├── README.md
├── app.js
├── package-lock.json
├── package.json
├── server.js
```

## Technologies Used

[![Node.js Badge](https://img.shields.io/badge/-Node.js-43853D?style=for-the-badge&labelColor=black&logo=node.js&logoColor=43853D)](#)
[![Express Badge](https://img.shields.io/badge/-Express-000000?style=for-the-badge&labelColor=white&logo=express&logoColor=000000)](#)
[![MongoDB Badge](https://img.shields.io/badge/-MongoDB-4DB33D?style=for-the-badge&labelColor=white&logo=mongodb&logoColor=4DB33D)](#)

## Third-Party Libraries

* **axios** - A promise-based HTTP client for making requests to external APIs.
* **bcryptjs** - A library for hashing passwords.
* **cookie-parser** - Middleware for parsing cookies from HTTP requests.
* **cors** - Middleware for enabling Cross-Origin Resource Sharing (CORS) in your application.
* **crypto** - A built-in module for cryptographic functions in Node.js.
* **dotenv** - A module for loading environment variables from a `.env` file into `process.env`.
* **express** - A web framework for building RESTful APIs and web applications in Node.js.
* **express-mongo-sanitize** - A middleware to sanitize user-supplied data to prevent NoSQL injection attacks.
* **express-rate-limit** - Middleware for limiting repeated requests to APIs to prevent abuse.
* **helmet** - Middleware for securing Express apps by setting various HTTP headers.
* **hpp** - Middleware to protect against HTTP Parameter Pollution attacks.
* **jsonwebtoken** - An implementation of JSON Web Tokens (JWT) for authentication and authorization.
* **mongoose** - A MongoDB object modeling tool designed to work in an asynchronous environment.
* **morgan** - HTTP request logger middleware for logging incoming requests.
* **nodemailer** - A module for sending emails from Node.js applications.
* **xss-clean** - Middleware to sanitize user input and protect against cross-site scripting (XSS) attacks.
* **nodemon** (devDependency) - A tool that automatically restarts the Node.js server when file changes are detected during development.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

