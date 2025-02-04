const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { User, Medication } = require('../models/models');
const dotenv = require("dotenv");
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGO_URL = process.env.MONGO_URL;

const app = express();
app.use(express.json());
app.use(cors())

// Connect to MongoDB (replace with your actual connection string)
mongoose.connect(MONGO_URL);

// User registration
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Submit medication data
app.post('/api/medications', async (req, res) => {
  try {
    const medication = new Medication(req.body);
    await medication.save();
    res.status(201).json(medication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Fetch all medications
app.get('/api/medications', async (req, res) => {
  try {
    const medications = await Medication.find();
    res.json(medications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

console.log('Server is ready to accept requests.');