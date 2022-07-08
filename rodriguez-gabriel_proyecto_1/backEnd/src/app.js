const { app } = require('./server');

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.info('Express application running on port: ' + port + ' 🔥');
})
