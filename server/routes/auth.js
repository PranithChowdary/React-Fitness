const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }

        console.log("Original password : " + password);
        console.log("Hashed password : " + user.password);

        const isMatch = await bcrypt.compareSync(password, user.password); // Compare hashed passwords
        console.log(isMatch)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '3600s' }); // Generate JWT token
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Register route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body; // Extract data from request body

    // Validation (optional)
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        // Check for existing user
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save user to database
        const savedUser = await newUser.save();

        // Respond with success (optional)
        // You can choose to send a success message or a user object (without password)
        res.json({ message: 'User created successfully!' });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
