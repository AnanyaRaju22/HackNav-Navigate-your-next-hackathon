const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/hackathon-db',   
 { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

// Middleware
app.use(bodyParser.json());   

app.use(cors());

// Define routes (we'll add these later)

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});