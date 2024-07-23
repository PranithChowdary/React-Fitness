const express = require('express');
const router = express.Router();
const WorkoutPlan = require('../models/Workout')

router.post('/saveWorkoutPlan', async (req, res) => {
    try {
      const { muscleGroup, plan } = req.body;
      const newPlan = new WorkoutPlan({ muscleGroup, plan });
      await newPlan.save();
      res.status(201).send(newPlan);
    } catch (error) {
      res.status(500).send({ error: 'Failed to save workout plan' });
    }
});

router.get('/getWorkoutPlans', async (req, res) => {
  try {

    const workoutPlans = await WorkoutPlan.find();
    res.json(workoutPlans);
  } catch (error) {
    console.error('Error fetching plans:', error); // Log the error
    res.status(500).send(error);
  }
});

module.exports = router;