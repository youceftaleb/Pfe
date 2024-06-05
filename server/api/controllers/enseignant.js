const Enseignant = require('../models/Enseignant')
const Parent = require('../models/Parent')

exports.updateEnseignant = async (req, res) => {
    try {
        if (req.user.user_type === "parent") return res.status(403).send({ message: "You are not a teacher" })
        if (req.params.id === req.user.user_id) {
            const user = await Enseignant.findByIdAndUpdate(req.params.id, { $set: req.body }, {
                new: true,
                useFindAndModify: false,
            });
            const { password, ...userWithoutPassword } = user._doc;
            res.status(200).json({ message: "User updated", data: userWithoutPassword });
        } else {
            return res.send({ message: "you can't update this user" })
        }
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' });
    }

}

exports.addDisponibilite = async (req, res) => {
    try {

        const { dayName, startTime, endTime } = req.body
        console.log(req.user);
        if (req.user.user_type === "parent") return res.status(403).send({ message: "You are not a teacher" })
        const user = await Enseignant.findByIdAndUpdate(req.user.user_id, { $addToSet: { disponibilite: { dayName, startTime, endTime } } });
        res.status(200).send({ message: "success" });

    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' });
    }

}
exports.deleteDisponibilite = async (req, res) => {
    try {

        const { id } = req.params
        console.log(req.user);
        if (req.user.user_type === "parent") return res.status(403).send({ message: "You are not a teacher" })
        const user = await Enseignant.findByIdAndUpdate(req.user.user_id, { $pull: { disponibilite: { _id: id } } });
        res.status(200).send({ message: "success" });

    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' });
    }

}

exports.getProfessors = async (req, res) => {
    try {
        console.log(req.body);
        const { module, location, disponibilite } = req.body;

        let teachers = []
        let query_1 = [];
        let query_2 = [];
        let query_3 = [];
        let query1Performed = false;
        let query2Performed = false;
        let query3Performed = false;
        if (module) {
            query1Performed = true;
            query_1 = await Enseignant.find({ activated: true, modules: { $in: module } })
        }

        if (location && Object.keys(location).length !== 0 && location.constructor === Object) {
            query2Performed = true;
            let query = Enseignant.find({ activated: true });

            if (location.wilaya) {
                query = query.where('adresse.wilaya').equals(location.wilaya);
            }

            if (location.ville) {
                query = query.where('adresse.ville').equals(location.ville);
            }

            query_2 = await query.exec();
        }

        if (disponibilite && Object.keys(disponibilite).length !== 0 && disponibilite.constructor === Object) {

            query3Performed = true;
            // Build the availability query dynamically
            let disponibiliteQuery = {};

            if (disponibilite.dayName) {
                disponibiliteQuery['dayName'] = disponibilite.dayName;
            }

            if (disponibilite.startTime) {
                disponibiliteQuery['startTime'] = disponibilite.startTime;
            }
            // Add the disponibilite query to the main query if it has conditions
            if (Object.keys(disponibiliteQuery).length > 0) {
                // Execute the query
                query_3 = await Enseignant.find({ activated: true, disponibilite: { $elemMatch: { ...disponibiliteQuery } } });
            }

        }

        function intersectByEmail(arr1, arr2) {
            return arr1.filter(function (n) {
                for (var i = 0; i < arr2.length; i++) {
                    if (n.email === arr2[i].email) {
                        return true;
                    }
                }
                return false;
            });
        }

        if (query1Performed) {
            if (query2Performed) {
                teachers = intersectByEmail(query_1, query_2);
                if (query3Performed) {
                    teachers = intersectByEmail(teachers, query_3);
                }
            } else if (query3Performed) {
                teachers = intersectByEmail(query_1, query_3)
            } else {
                teachers = [...query_1];
            }
        } else if (query2Performed) {
            if (query3Performed) {
                teachers = intersectByEmail(query_2, query_3);
            } else {
                teachers = [...query_2]
            }
        } else if (query3Performed) {
            teachers = [...query_3]
        } else {
            teachers = await Enseignant.find({ activated: true })
        }

        // const mapFromTeachers = new Map(
        //     teachers.map(c => [c.id, c])
        // );

        // teachers = [...mapFromTeachers.values()];

        teachers = teachers.map(obj => {
            const { password, ...user } = obj._doc;
            return user
        })
        res.status(200).send({ message: 'found professors successfully', data: teachers })
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' })
    }
}



exports.addCour = async (req, res) => {
    try {
        const { description, prix } = req.body;
        if (!description && !prix) return res.status(400).send({ message: 'all inputs are required' })
        await Enseignant.findByIdAndUpdate(req.user.user_id, { $addToSet: { cours: { description, prix } } })
        res.status(200).send({ message: 'cour ajouter avec success' })
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' })
    }
}

exports.deleteCour = async (req, res) => {
    try {
        const { id } = req.params;
        await Enseignant.findByIdAndUpdate(req.user.user_id, { $pull: { cours: { _id: id } } })
        res.status(200).send({ message: 'cour supprimer avec success' })
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' })
    }
}
