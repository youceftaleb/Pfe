const mongoose = require('mongoose')

const experienceSchema = new mongoose.Schema({
    position: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date
    }
})

const qualificationSchema = new mongoose.Schema({
    degree: {
        type: String,
        required: true
    },
    institution: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
})

const availabilitySchema = new mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    }
});




const professorSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
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
    rating: {
        type: Number,
        default: 0,
    },
    modules: {
        type: [String],
        required: true
    },
    fromGoogle: {
        type: Boolean,
        default: false
    },
    experience: {
        type: [experienceSchema],
        default: [],
        required: true
    },
    qualifications: {
        type: [qualificationSchema],
        default: [],
        required: true
    },
    availability: {
        type: [availabilitySchema],
        default: [],
        required: true
    },
    activated: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Professor = mongoose.model('professors', professorSchema);

module.exports = Professor;



