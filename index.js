const express = require("express");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const cors = require("cors");
//Routes
const auth = require("./routes/auth");
const users = require("./routes/users");
const books = require("./routes/books");
const rentals = require("./routes/rentals");
//Env variables
dotenv.config({ path: "./config/config.env" });
// Conncet DB
connectDB();

const app = express();

app.use(cors());
//Set security HTTP headers
app.use(helmet());
app.use(express.json({ limit: "10kb" }));

//Sanitize Data against NoSQL query injection
app.use(mongoSanitize());

//Sanitize Data against XSS
app.use(xss());

//Prevent parameter pollution
app.use(hpp());

//Limit requests from same  IP address
const limiter = rateLimit({
  max: 200,
  windowsMs: 60 * 60 * 1000,
  message: "Too many request in 1 hour from your IP address",
});

app.use(limiter);

//Mount routers
app.use("/api/v1/", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/books", books);
app.use("/api/v1/rentals", rentals);

app.use(errorHandler);

app.all("*", (req, res, next) => {
  res
    .status(404)
    .json({ succes: false, message: "This route does not exists" });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server listening on port ${PORT}`)
);

//Handle unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  //Close server & exit process
  server.close(() => process.exit(1));
});
