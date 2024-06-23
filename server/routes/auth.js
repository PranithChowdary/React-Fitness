const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { createSecretToken } = require("../util/SecretToken");
const { userVerification } = require("../Middleware/Authmiddleware")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: 'All fields are required' })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: 'Incorrect password or email' })
        }
        const auth = await bcrypt.compare(password, user.password)
        if (!auth) {
            return res.json({ message: 'Incorrect password or email' })
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(201).json({ message: "User logged in successfully", success: true });
        next()
    } catch (error) {
        console.error(error);
    }
});

// Register route
router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword, createdAt } = req.body; // Extract data from request body

    // Validation (optional)
    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    if (password != confirmPassword) {
        return res.status(400).json({ message: 'Password and Confirmation Password are not same..!' })
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }
        const user = await User.create({ email, username, password, confirmPassword, createdAt });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res
            .status(201)
            .json({ message: "User signed in successfully", success: true, user });
        next();
    } catch (error) {
        console.error(error);
    }
});

router.post('/', userVerification)

module.exports = router;
