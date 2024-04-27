const express = require('express')
const router = express.Router()
const authRoutes = require('./auth')
const enseignantRoutes = require('./enseignant')


module.exports = () => {
    router.use("/auth", authRoutes())
    router.use("/enseignat", enseignantRoutes())
    return router;
}