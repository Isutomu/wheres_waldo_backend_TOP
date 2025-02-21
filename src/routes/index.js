// 3dr Party Modules
const { Router } = require("express");

// Local Modules
const getMethods = require("../controllers/get");
const postMethods = require("../controllers/post");

// Initialization
const router = Router();

// Requests
router.get("/photos", getMethods.photos);
router.post("/", postMethods.method1);

module.exports = router;
