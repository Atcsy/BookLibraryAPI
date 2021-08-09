# Library Management System API

This is a backend API application that exposes routes for a library. This API allows new users to register and authenticate by using [JSON Web Tokens](https://jwt.io/).
Registered users are able to rent a maximum of 5 books and return it within 2 weeks.
Admins have additional CRUD functionality on users and on books and can view rental that are overdue.
Non registered visitors only can view the books

# Table of Contents

- [Getting Started](#getting-started)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Documentation](#documentation)

## Getting Started

This is a server-side javascript application built with [Express JS](https://expressjs.com/). The database is [MongoDB](https://www.mongodb.com/) with [Mongoose](https://www.mongoose.com/) ODM.

## Technology Stack

**Server Side**

1. ExpressJs
2. MongoDB

## Installation

1. Install [**Node JS**](https://nodejs.org/en/)
2. Install [Mongo Database](https://docs.mongodb.com/compass/master/install/)
3. Clone the [**repository here**](https://github.com/Atcsy/BookLibraryAPI.git)
4. [**cd**] into the root of the **project directory**.
5. Run `npm run install` on the terminal to install project dependecies
6. Create an config.env file in the root folder and define variables from config.env-sample. MONGO_URI and JWT_SECRET variables are required to start application
7. Run `$ node seeder.js -i` to seed the database or `-d` to destroy it
8. Run `$ npm run dev` to start the application
9. Navigate to `http://localhost:5000/api/v1` on your preferred browser

## Documentation

API DOCUMENTATION
soon
