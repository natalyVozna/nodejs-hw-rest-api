const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { contactsRouter } = require("./src/routes/api/contactsRouter");
const { userRouter } = require("./src/routes/api/usersRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", userRouter);

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    data: "Not found",
    message: "Not found",
  });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal Server Error" } = err;
  res.status(status).json({
    status: "fail",
    code: 500,
    message: message,
    data: "Internal Server Error",
  });
});

module.exports = app;
