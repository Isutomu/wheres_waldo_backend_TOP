// 3rd Party Modules
require("dotenv/config");
const express = require("express");
const logger = require("morgan");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");

// Local Modules
const routes = require("./routes/index.js");
const { PrismaClient } = require("@prisma/client");

// Server Initialization
const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("tiny"));

// Session Setup
app.use(
  expressSession({
    cookies: {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      // secure: true, // Enable when deploy
      httpOnly: true,
    },
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 10 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

// Routes
app.use("/", routes);

// Server Listening Along with Database
// connection(in case of data persistence)
app.listen(PORT, (err) => {
  if (!err) {
    console.log(
      `Server is Successfully Running, and App is listening on port ${PORT}`
    );
  } else {
    console.log(`Error occurred, server can't start ${err}`);
  }
});
