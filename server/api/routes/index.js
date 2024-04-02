const express = require('express')
const router = express.Router()
const authRoutes = require('./auth')
const professorRoutes = require('./professor')


module.exports = () => {
    router.use("/auth", authRoutes())
    router.use("/professors", professorRoutes())
    return router;
}