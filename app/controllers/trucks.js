const { User, Truck } = require('../models');

exports.add = async (req, res) => {
    try {
        const { email } = req.user;

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
            number: req.body.truckNumber,
            userId: user.id,
        });

        return res.status(201).json(newTruck);
    } catch(e) {
        return res.status(400).json({ errors: e });
    }
};
exports.getAll = async (req, res) => {
    try {
        const { email } = req.user;

        const user = await User.findOne({
            where: { email },
            include: [{ model: Truck, as: 'Trucks' }],
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