# WeatherApp Backend

## Project Title and Description
WeatherApp Backend is the server-side application that provides API endpoints for the WeatherApp frontend. It handles user authentication, weather data retrieval, and various other backend functionalities.

## Badges
![Static Badge](https://img.shields.io/badge/status-in_progress-yellow)

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
- Data validation and sanitization

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

4. Set up environment variables:
    Create a `.env` file in the root directory and add your environment variables. Example:
    ```env
    NODE_ENV=development
    PORT=3000
    DATABASE=mongodb://localhost:27017/weatherapp
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRES_IN=90d
    ```

5. Start the application:
    ```bash
    npm start
    ```

## Usage
After starting the application, the backend will be running on the specified port (default is `3000`). You can access the API endpoints through `http://localhost:3000`.

## API Endpoints

The backend provides various API endpoints for user authentication and weather data. For detailed information on each endpoint, please refer to the API documentation in the `routes` folder or visit the [WeatherApp Frontend Repository](https://github.com/petrmichal0/weatherapp-frontend) for more context.

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
