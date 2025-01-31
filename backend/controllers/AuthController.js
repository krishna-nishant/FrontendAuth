const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check if user already exists
        const checkIfUserExists = await User.findOne({ email });

        if (checkIfUserExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            })
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: newUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error in register' })
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'user not found'
            })
        }

        // compare hashed password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: 'Invalid password'
            })
        }
        // generate token
        const token = jwt.sign({
            email: user.email,
            id: user._id,
            name: user.name
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h'
        })

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            jwtToken: token,
            email: user.email,
            name: user.name
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error in login' })
    }
}

module.exports = { registerController, loginController }