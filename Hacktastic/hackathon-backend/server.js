const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hackathonDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema and model for hackathons
const hackathonSchema = new mongoose.Schema({
  name: String,
  date: String,
  location: String,
});

const Hackathon = mongoose.model('Hackathon', hackathonSchema);

// Define routes
app.get('/hackathons', async (req, res) => {
  try {
    const hackathons = await Hackathon.find();
    res.json(hackathons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/hackathons', async (req, res) => {
  const hackathon = new Hackathon({
    name: req.body.name,
    date: req.body.date,
    location: req.body.location,
  });

  try {
    const newHackathon = await hackathon.save();
    res.status(201).json(newHackathon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
