const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

exports.register = async (req, res) => {
    const { email, password, fname, sname } = req.body;

    try {
        // Return an error if user with current email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                errors: [{message: "User already exist"}]
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
            token: token,
        });
    } catch(e) {
        return res.status(400).json({
            errors: e,
            message: "Error while creating user",
        })
    }
};
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (!existingUser) {
            return res.status(400).json({
                errors: [{message: "User does not exist"}]
            });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                errors: [{message: "Password is incorrect"}]
            });
        }

        const { fname, sname } = existingUser;
        const token = jwt.sign(
            { email, fname, sname },
            process.env.JWT_SECRET,
            { expiresIn: '7d' },
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
        })
        return res.status(200).json({ message: "Logged in successfully" });
    } catch(e) {
        return res.status(400).json({
            errors: e,
            message: "Error while logging in",
        })
    }
};