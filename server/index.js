const express = require('express');
const mongoose = require('mongoose');

const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
require("dotenv").config();

const { MONGO_URL } = process.env;

const app = express();
// Connect to MongoDB
mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Pinged your deployment. You successfully connected to MongoDB!"'))
    .catch(err => console.error(err));

// Middleware

app.use(cookieParser);

// Routes
app.use('/api/auth', authRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
