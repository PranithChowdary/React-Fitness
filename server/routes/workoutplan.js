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

    const workoutPlans = await WorkoutPlan.find({ isArchived: false }); // Only get Plans which are not Archived
    res.json(workoutPlans);
  } catch (error) {
    console.error('Error fetching plans:', error); // Log the error
    res.status(500).send(error);
  }
});

// Set Primary Plan
router.post('/setPrimaryPlan', async (req, res) => {
  try {
    console.log("Received request body:", req.body); // Log full request body

    const { planId } = req.body;
    if (!planId) {
      console.log("Error: Plan ID is missing.");
      return res.status(400).json({ message: "Plan ID is required." });
    }

    console.log(`Updating primary plan. Received planId: ${planId}`);

    // Unset the existing primary plan
    const unsetResult = await WorkoutPlan.updateMany({ primaryPlan: true }, { $set: { primaryPlan: false } });
    console.log(`Unset previous primary plan(s): ${JSON.stringify(unsetResult)}`);

    // Set the new primary plan
    const updatedPlan = await WorkoutPlan.findByIdAndUpdate(
      planId,
      { $set: { primaryPlan: true } },
      { new: true }
    );

    if (!updatedPlan) {
      console.log("Plan not found in database.");
      return res.status(404).json({ message: "Plan not found." });
    }

    console.log("Primary plan successfully updated:", updatedPlan);
    res.json({ message: "Primary plan updated successfully!", primaryPlan: updatedPlan });
  } catch (error) {
    console.error('Error updating primary plan:', error);
    res.status(500).json({ message: 'Error updating primary plan', error });
  }
});


// Get Primary Workout Plan
router.get('/getPrimaryPlan', async (req, res) => {
  try {
    const primaryPlan = await WorkoutPlan.findOne({ primaryPlan: true, isArchived: false });
    res.json(primaryPlan);
  } catch (error) {
    console.error('Error fetching primary plan:', error);
    res.status(500).send(error);
  }
});

// Archive a workout plan
router.post('/archiveWorkoutPlan', async (req, res) => {
  const { planId } = req.body;

  try {
    const plan = await WorkoutPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }

    plan.isArchived = true;
    await plan.save();

    res.json({ message: 'Workout plan archived successfully' });
  } catch (error) {
    console.error('Error archiving plan:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all archived workout plans
router.get('/getArchivedPlans', async (req, res) => {
  try {
    const archivedPlans = await WorkoutPlan.find({ isArchived: true });
    res.json(archivedPlans);
  } catch (error) {
    console.error('Error fetching archived plans:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;