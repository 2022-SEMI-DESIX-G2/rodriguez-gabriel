const express = require("express");
const fibonacciController = require("../../controllers/fibonacciControllers");
const router = express.Router();

router.get("/:fibonacciSequence", fibonacciController.getFibonacciSequence);

module.exports = router;