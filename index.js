const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

// Make .env file data accessible
dotenv.config();

// Connecting to mongoDB
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log(`Connected to MongoDB!`);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Middlewares
app.use(express.json()); // This middleware parse the data that I post(send) to the server and {{{Make it available in the req.body}}}
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen("8800", () => {
  console.log("Backend server is running!");
});
