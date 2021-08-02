const express = require('express');
const dotenv = require('dotenv');
//Routes
const users = require('./routes/users');
const books = require('./routes/books');
//Env variables
dotenv.config({ path: './config/config.env'});

const app = express();


//Mount routers
app.use('/api/v1/users', users);
app.use('/api/v1/books', books);



const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(`Server listening on port ${PORT}`)
);

