const express = require('express')
const Router = express.Router()

Router.use('/api',require('./api/index'));

module.exports = Router ;