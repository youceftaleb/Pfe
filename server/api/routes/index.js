const express = require('express')
const router = express.Router()
const authRoutes = require('./auth')


module.exports = () => {
    router.use("/auth", authRoutes())
    return router;
}