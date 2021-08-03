const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
//Routes
const users = require('./routes/users');
const books = require('./routes/books');
//Env variables
dotenv.config({ path: './config/config.env'}); 
// Conncet DB
connectDB();

const app = express();
app.use(express.json());


//Mount routers
app.use('/api/v1/users', users);
app.use('/api/v1/books', books);

app.use(errorHandler);



const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`Server listening on port ${PORT}`)
);


//Handle unhandled Promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(() => process.exit(1));
});
