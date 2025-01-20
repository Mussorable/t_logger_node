const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.add = async (req, res) => {
    try {
        const { email } = req.user;
    } catch(e) {
        return res.status(400).json({ errors: e });
    }
};