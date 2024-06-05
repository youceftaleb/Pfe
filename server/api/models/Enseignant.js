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

const CourSoutienScolaire = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    prix: {
        type: Number,
        required: true
    }
})

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
        required: true,
        default:"https://youceftaleb.netlify.app/docs/my-resume.pdf"
    },
    identite: {
        type: String,
        required: true,
        default:"https://firebasestorage.googleapis.com/v0/b/usthb-pfe-2d21e.appspot.com/o/images.jpeg?alt=media&token=9e87f2b2-c716-477b-b721-6eea8eeae852"
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
    cours: {
        type: [CourSoutienScolaire],
        default: [],
    },
    activated: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Enseignant = mongoose.model('enseignants', enseignantSchema);

module.exports = Enseignant;



