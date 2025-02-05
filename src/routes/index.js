// 3dr Party Modules
const { Router } = require("express");

// Local Modules
const getMethods = require("../controllers/get");
const postMethods = require("../controllers/post");

// Initialization
const router = Router();

// Requests
router.get("/", getMethods.method1);
router.post("/", postMethods.method1);

module.exports = router;
