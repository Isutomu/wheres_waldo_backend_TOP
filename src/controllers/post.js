// Methods to be executed on routes
const method1 = (req, res) => {
  res.send("Hello, This was a post Request");
};

// Export of all methods as object
module.exports = {
  method1,
};
