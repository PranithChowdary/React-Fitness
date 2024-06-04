const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();
const uri = "mongodb+srv://pranithtpm:X6kL7AycQoVRrePX@cluster0.j6batmc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// Connect to MongoDB
mongoose.connect(uri)
    .then(() => console.log('Pinged your deployment. You successfully connected to MongoDB!"'))
    .catch(err => console.error(err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
