const express = require("express");
const v1FibonacciRouter = require("./src/v1/routes/fibonacciRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/v1/fibonacci", v1FibonacciRouter);

app.listen(PORT, () => {
    console.log(`API esta escuchando en el puerto: ${PORT}`);
});