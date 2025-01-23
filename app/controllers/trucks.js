const { User, Truck, Legend, Record } = require('../models');

exports.add = async (req, res) => {
    try {
        const { email } = req.user;
        const { truckNumber } = req.body;

        const user = await User.findOne({
            where: { email },
            include: [{ model: Truck, as: 'Trucks' }],
        });
        if (!user) {
            return res.status(401).send({
                errors: [{ message: 'User not found' }]
            });
        }

        const newTruck = await Truck.create({
            number: truckNumber,
            userId: user.id,
        });

        const response = { ...newTruck.toJSON(), legends: [] };

        return res.status(201).json(response);
    } catch(e) {
        return res.status(400).json({ errors: e });
    }
};
exports.getAll = async (req, res) => {
    try {
        const { email } = req.user;

        const user = await User.findOne({
            where: { email },
            include: [{ model: Truck, as: 'Trucks', include: [
                    { model: Legend, as: 'legends', required: false },
                ] }],
        });
        if (!user) {
            return res.status(401).json({
                errors: [{ message: 'User not found' }]
            });
        }

        return res.status(200).json(user.Trucks);
    } catch(e) {
        return res.status(400).json({ errors: e });
    }
};
exports.addRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, note, isImportant, type } = req.body;

        const truck = await Truck.findOne({
            where: { id },
            include: [{ model: Record, as: 'records', required: false }],
        });
        if (!truck) {
            return res.status(401).send({
                errors: [{ message: 'Truck not found' }]
            })
        }

        const newRecord = await Record.create({
            date,
            note,
            isImportant,
            type,
            truckId: id,
        });

        return res.status(201).json(newRecord);
    } catch(e) {
        return res.status(400).json({ errors: e });
    }
};
exports.getTruckNotes = async (req, res) => {
    try {
        const { id } = req.params;

        const truck = await Truck.findOne({
            where: { id },
            include: [{ model: Record, as: 'records', required: false }],
        });
        if (!truck) {
            return res.status(401).send({
                errors: [{ message: 'Truck not found' }]
            })
        }

        return res.status(200).json({
            number: truck.number,
            records: truck.records,
        });
    } catch(e) {
        return res.status(400).json({ errors: e });
    }
};