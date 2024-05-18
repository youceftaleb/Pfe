const express = require('express')
const router = express.Router()
const authRoutes = require('./auth')
const enseignantRoutes = require('./enseignant')
const userRoutes = require('./user')
const avisRoutes = require('./avis')

module.exports = () => {
    router.use("/auth", authRoutes())
    router.use("/enseignant", enseignantRoutes())
    router.use('/user', userRoutes())
    router.use('/avis',avisRoutes())
    return router;
}