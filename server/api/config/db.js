const mongoose = require('mongoose');
const { MONGO_PROD_URL, MONGO_DEV_URL } = process.env;

exports.connect = async () => {
    await mongoose
        .connect(MONGO_DEV_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then((x) => {
            console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
        })
        .catch((err) => {
            console.error("Error connecting to mongo", err.reason);
        })
}