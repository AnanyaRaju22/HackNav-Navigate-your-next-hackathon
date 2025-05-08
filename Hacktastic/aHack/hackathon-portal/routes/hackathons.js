const express = require('express');
const router = express.Router();
const Hackathon = require('../models/hackathon');

// Get all hackathons
router.get('/', async (req, res) => {
  try {
    const searchQuery = req.query.search || '';
    const hackathons = await Hackathon.find({
      name: { $regex: searchQuery, $options: 'i' }
    });
    res.json(hackathons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new hackathon
router.post('/', async (req, res) => {
  const hackathon = new Hackathon({
    name: req.body.name,
    location: req.body.location,
    date: req.body.date,
    description: req.body.description,
    image: req.body.image
  });

  try {
    const newHackathon = await hackathon.save();
    res.status(201).json(newHackathon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
