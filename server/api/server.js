const express = require('express')
require('dotenv').config()
const config = require('./config/db')
const cors = require('cors')
const apiRoutes = require('./routes')

const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(cors());
app.use("/api", apiRoutes());
app.use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
});

app.listen(process.env.PORT, () => {
    config.connect();
    console.log(`App listening on port ${process.env.PORT}`)
})


