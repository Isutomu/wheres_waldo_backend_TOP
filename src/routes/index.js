// 3dr Party Modules
const { Router } = require("express");

// Local Modules
const getMethods = require("../controllers/get");
const postMethods = require("../controllers/post");

// Initialization
const router = Router();

// Requests
router.get("/photos", getMethods.photos);
router.post("/scores", postMethods.scores);
router.post("/guesses", postMethods.guesses);

module.exports = router;
