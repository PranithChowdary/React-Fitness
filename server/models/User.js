const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const WorkoutPlan = require('./Workout');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Your username is required"],
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
    originalPassword: {
        type: String
    },
    primaryPlanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: WorkoutPlan,
        default: null, // Ensures it starts as null
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Hash password before saving user
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        this.originalPassword = this.password;
        this.password = await bcrypt.hash(this.password, 12);
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model("User", userSchema);