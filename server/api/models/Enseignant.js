const mongoose = require('mongoose')

const disponibiliteSchema = new mongoose.Schema({
    dayName: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
});

const enseignantSchema = new mongoose.Schema({
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
    avis: {
        type: Number,
        default: 0,
    },
    modules: {
        type: [String],
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    CV: {
        type: String,
        required: true
    },
    identite: {
        type: String,
        required: true
    },
    disponibilite: {
        type: [disponibiliteSchema],
        default: [],
        required: true
    },
    adresse: {
        wilaya: {
            type: String,
            required: true
        },
        ville: {
            type: String,
            required: true
        },
        adresse: {
            type: String,
        }
    },
    activated: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Enseignant = mongoose.model('enseignants', enseignantSchema);

module.exports = Enseignant;



