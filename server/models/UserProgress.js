const mongoose = require('mongoose');

const WorkoutProgressSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    workoutStats: { type: Array, default: [] },
    progressPercentage: { type: Number, default: 0 },
    currentWeekData: { type: Array, default: [] },
    completedExercises: { type: Object, default: {} },
    currentWeek: { type: Number, default: 0 },
    weeks: { type: Array, default: [] }
});

module.exports = mongoose.model('WorkoutProgress', WorkoutProgressSchema);
