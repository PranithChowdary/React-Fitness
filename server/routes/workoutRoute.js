const express = require('express');
const router = express.Router();
const WorkoutProgress = require('../models/UserProgress');

// Fetch user progress (Matches frontend request: /getProgress)
router.get('/api/workout/progress/:userId', async (req, res) => {
    try {
        const progress = await WorkoutProgress.findOne({ userId: req.params.userId });
        res.json(progress || {});
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving data', error });
    }
});

// Save workout progress (Matches frontend request: /saveProgress)
router.post('/api/workout/saveProgress', async (req, res) => {
    try {
        const { userId, progress } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        await WorkoutProgress.findOneAndUpdate(
            { userId },
            { progress },
            { upsert: true, new: true }
        );

        res.json({ message: "Progress saved successfully!" });
    } catch (error) {
        res.status(500).json({ message: 'Error saving data', error });
    }
});

module.exports = router;
