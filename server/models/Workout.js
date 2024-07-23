const mongoose = require('mongoose');

const WorkoutPlan = new mongoose.Schema({
    muscleGroup: String,
    plan: Object
});

module.exports = mongoose.model("WorkoutPlan", WorkoutPlan);
