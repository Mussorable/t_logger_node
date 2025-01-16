const {validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error(errors.array());

        return res.status(400).json({
            errors: errors.array(),
        })
    }

    const { email, password, fname, sname } = req.body;

    try {
        // Return an error if user with current email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                errors: errors.array(),
                message: "User already exists"
            });
        }

        // hash password to save in db fields
        const hashedPassword = await bcrypt.hash(password, 12);

        // Generate token
        const token = jwt.sign(
            { email, fname, sname },
            process.env.JWT_SECRET,
            // { expiresIn: '7d' },
        );

        const user = new User({ email, fname, sname, password: hashedPassword });
        await user.save();

        return res.status(200).json({
            message: "User successfully registered",
        });
    } catch(e) {
        return res.status(400).json({
            errors: errors.array(),
            message: "Error while creating user",
        })
    }
};