const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { createSecretToken } = require("../util/SecretToken");
const { userVerification } = require("../Middleware/Authmiddleware");
const bcrypt = require('bcryptjs');

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Incorrect password or email' });
        }

        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.status(401).json({ message: 'Incorrect password or email' });
        }

        createSecretToken(res, user._id);


        res.status(200).json({ message: "User logged in successfully", success: true });
        

    } catch (error) {
        console.error('Error in /login route:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Register route
router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword, createdAt } = req.body;

    // Validation
    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const existingUsername = await User.findOne({ username });
        const existingUser = await User.findOne({ email });
        if (existingUsername) {
            return res.status(409).json({ message: "Username is already Taken..! Try Another one."})
        }
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const user = new User({ email, username, password, createdAt });
        await user.save();

        createSecretToken(res, user._id);
        
        res.status(201).json({ message: "User signed up successfully", success: true, user });
    } catch (error) {
        console.error('Error in /register route:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Apply userVerification middleware to this route
router.post('/', userVerification);

module.exports = router;
