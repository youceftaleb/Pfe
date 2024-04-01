const mongoose = require('mongoose')

const parentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    profilePic: {
        type: String,
        default: 'http://dergipark.org.tr/assets/app/images/buddy_sample.png'
    },
    fromGoogle: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Parent = mongoose.model('parents', parentSchema);

module.exports = Parent;