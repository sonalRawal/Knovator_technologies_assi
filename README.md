# Knovator_technologies_assi
# Node.js Assessment Tasks

## Task 1: Setup Node App and Mongoose Connectivity

- Create a new Node.js project folder.
- Initialize npm with `npm init`.
- Install necessary packages (`express`, `mongoose`, etc.) using npm.
- Set up a basic Express server in your `app.js` or `index.js` file.
- Connect to MongoDB using Mongoose.

## Task 2: Create APIs for Login and Registration using Passport JWT Token

- Install `passport`, `passport-local`, `passport-jwt`, and `jsonwebtoken`.
- Implement user registration endpoint with validation and saving user data to the database.
- Implement user login endpoint with authentication using Passport and JWT token generation.
- Create middleware to authenticate JWT tokens for protected routes.

## Task 3: Create CRUD Operations for Posts for Authenticated Users

- Create a Post model with necessary fields (Title, Body, Created By, Active/Inactive, Geo location).
- Implement API endpoints for CRUD operations (Create, Read, Update, Delete) for posts, ensuring that only authenticated users can perform actions on their own posts.
- Validate requests using a validation library (e.g., express-validator).

## Task 4: Create an API to Retrieve Posts using Latitude and Longitude

- Implement an API endpoint to retrieve posts based on provided latitude and longitude.
- Use appropriate query methods in Mongoose to fetch posts based on geolocation.

## Task 5: Show the Count of Active and Inactive Posts in the Dashboard

- Implement an API endpoint to fetch the count of active and inactive posts.
- Use aggregation in MongoDB to count posts based on their active/inactive status.
- Display the count on the dashboard or wherever required in your frontend.
