// Methods to be executed on routes
const method1 = (req, res) => {
  res.send("Hello, Welcome to our Page");
};

// Exports of all methods as object
module.exports = {
  method1,
};
