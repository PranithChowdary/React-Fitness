const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { createSecretToken } = require("../util/SecretToken");
const { userVerification } = require("../Middleware/Authmiddleware");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const UserProgress = require('../models/UserProgress');

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

        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.status(200).json({ message: "User logged in successfully", success: true, token });
        

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

//User Profile Route
router.get('/getUserProfile', async (req, res) => {
    try {
        const { useremail } = req.body;
        const user = await User.findOne({ useremail });

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({
            email: user.email,
            username: user.username,
            primaryPlanId: user.primaryPlanId,
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


//User update Route
router.post('/updateUserProfile', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password; // Make sure to hash the password before saving
        // Hashing will be done by User Schema Model

        await user.save();

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// // Save user progress route
// router.post('/saveProgress', userVerification, async (req, res) => {
//     console.log('Received saveProgress request:', req);
//     const { progress } = req.body;
//     const userId = req.user?.id;

//     console.log('Received saveProgress request:', { userId, progress });

//     if (!userId) {
//         console.log('Error: User ID missing');
//         return res.status(400).json({ status: false, message: 'User not authenticated' });
//     }

//     try {
//         let userProgress = await UserProgress.findOne({ userId });

//         if (!userProgress) {
//             console.log('Creating new progress entry...');
//             userProgress = new UserProgress({ userId, progress });
//         } else {
//             console.log('Updating existing progress...');
//             userProgress.progress = { ...userProgress.progress, ...progress };
//         }

//         await userProgress.save();
//         console.log('Progress saved successfully:', userProgress);

//         res.status(200).json({ status: true, message: 'Progress saved successfully' });
//     } catch (error) {
//         console.error('Error saving progress:', error);
//         res.status(500).json({ status: false, message: 'Internal server error' });
//     }
// });


// // Get user progress route
// router.get('/getProgress', userVerification, async (req, res) => {
//     const userId = req.user.id;

//     try {
//         const userProgress = await UserProgress.findOne({ userId });
//         if (!userProgress) {
//             return res.status(404).json({ message: 'Progress not found' });
//         }
//         res.status(200).json(userProgress.progress);
//     } catch (error) {
//         console.error('Error retrieving progress:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });



router.post('/setPrimaryPlan', userVerification, async (req, res) => {
    try {
        const { planId } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.primaryPlanId = planId;
        await user.save();

        // Send updated primary plan ID
        res.status(200).json({ primaryPlanId: user.primaryPlanId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to set primary plan' });
    }
});

router.get('/getPrimaryPlan', userVerification, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('primaryPlanId');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.primaryPlanId) {
            return res.status(200).json({ primaryPlanId: null }); // Ensure response is well-formed
        }

        res.json({ primaryPlanId: user.primaryPlanId._id }); // Send only the ID
    } catch (error) {
        console.error('Error fetching primary plan:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;