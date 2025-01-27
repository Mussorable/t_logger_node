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
            return res.status(401).json({
                status: 'error',
                message: 'User not found',
            });
        }

        const existingTruck = await Truck.findOne({
            where: { number: truckNumber },
        });
        if (existingTruck) {
            return res.status(401).json({
                status: 'error',
                message: 'Current truck already exists',
            })
        }

        const newTruck = await Truck.create({
            number: truckNumber,
            userId: user.id,
        });

        const response = {
            ...newTruck.toJSON(),
            legends: [],
            status: 'success',
            message: 'Truck added',
        };

        return res.status(201).json(response);
    } catch(e) {
        return res.status(400).json({ errors: e });
    }
};
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const truck = await Truck.findOne({ where: { id } });
        if (!truck) {
            return res.status(401).json({
                status: 'error',
                message: 'Truck not found',
            });
        }

        await truck.destroy();

        return res.status(201).json({
            status: 'success',
            message: 'Truck removed',
        });
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

exports.addLegend = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, deliveryTime, to, status } = req.body;

        const truck = await Truck.findOne({
            where: { id },
            include: [{ model: Legend, as: 'legends', required: false }],
        });
        if (!truck) {
            return res.status(401).json({
                status: 'error',
                message: 'Truck not found',
            });
        }

        const newLegend = await Legend.create({
            date,
            deliveryTime,
            to,
            status,
            truckId: id,
        });

        return res.status(201).json(newLegend.toJSON());
    } catch(e) {
        return res.status(400).json({ errors: e });
    }
};
exports.updateLegend = async (req, res) => {
    try {
        const { id, legendId } = req.params;
        const { date, deliveryTime, to, status } = req.body;

        const legend = await Legend.findOne({
            where: { id: legendId, truckId: id },
        });
        if (!legend) {
            return res.status(401).json({
                status: 'error',
                message: 'User not found',
            });
        }

        await legend.update({
            date,
            deliveryTime,
            status,
            to
        });

        return res.status(201).json(legend.toJSON());
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
            return res.status(401).json({
                status: 'error',
                message: 'Truck not found',
            })
        }

        const newRecord = await Record.create({
            date,
            note,
            isImportant,
            type,
            truckId: id,
        });

        const response = {
            ...newRecord.toJSON(),
            status: 'success',
            message: 'Record added',
        }

        return res.status(201).json(response);
    } catch(e) {
        return res.status(400).json({ errors: e });
    }
};
exports.getTruckRecords = async (req, res) => {
    try {
        const { id } = req.params;

        const truck = await Truck.findOne({
            where: { id },
            include: [{ model: Record, as: 'records', required: false }],
        });
        if (!truck) {
            return res.status(401).send({
                status: 'error',
                message: 'Truck not found',
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
exports.makeRecordDone = async (req, res) => {
    try {
        const { id, noteId } = req.params;
        const { type } = req.body;

        const record = await Record.findOne({
            where: { id: noteId, truckId: id },
        });
        if (!record) {
            return res.status(401).send({
                status: 'error',
                message: 'Record not found',
            })
        }

        record.type = type;
        await record.save();

        return res.status(201).send({
            status: 'warning',
            message: 'Record updated',
            record: record
        });
    } catch(e) {
        return res.status(400).json({ errors: e });
    }
};