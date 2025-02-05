// 3rd Party Modules
require("dotenv/config");
const express = require("express");
const logger = require("morgan");

// Local Modules
const routes = require("./routes/index.js");

// Server Initialization
const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("tiny"));

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
