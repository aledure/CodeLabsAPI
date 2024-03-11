require("dotenv").config();
require("express-async-errors");

// express
const express = require("express");
const app = express();

// other packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// database
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/authRoutes");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req, res) => {
  res.send("group-api-project");
});

app.get("/api/v1", (req, res) => {
  // console.log(req.cookies);
  console.log(req.signedCookies);

  res.send("group-api-project");
});

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 1000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
