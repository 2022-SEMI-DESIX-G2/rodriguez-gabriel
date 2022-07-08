require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getFilesWithKeyword = require('./utils/getFilesWithKeyword');
const morgan = require('morgan');
const fs = require('fs');

const app = express();
/************************************************************************************
 *                              Basic Express Configurations
 ***********************************************************************************/
app.set('json spaces', 4);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/************************************************************************************
 *                              Basic Express Logs and Connections
 ***********************************************************************************/
app.use(morgan('dev'));
app.use(cors());

/************************************************************************************
 *                               Register all routes
 ***********************************************************************************/
getFilesWithKeyword('router', __dirname + '/routes').forEach((file) => {
  const router = require(file);
  app.use('/', router);
})

/************************************************************************************
 *                               Express Error Handling
 ***********************************************************************************/
app.use((err, req, res, next) => {
  return res.status(500).json({
    errorName: err.name,
    message: err.message,
    stack: err.stack || 'no stack defined'
  });
});

module.exports = {
    app
}