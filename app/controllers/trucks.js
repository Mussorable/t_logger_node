const jwt = require('jsonwebtoken');

exports.add = async (req, res) => {
    const token = req.cookies.token;
    try {
        const { email } = jwt.decode(token);

    } catch(e) {
        res.status(400).json({ errors: e });
    }
};