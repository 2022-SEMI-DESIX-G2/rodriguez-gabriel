const fibonacciService = require("../services/fibonacciServices");

const getFibonacciSequence = (req, res) => {
    console.log("Request: " +   req.method + " " + req.url);
    const fibonacci = fibonacciService.getFibonacciSequence(req.params.fibonacciSequence);
    res.send(fibonacci)
};

module.exports = {
    getFibonacciSequence,
};