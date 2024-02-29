// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Configure CORS
// const corsOptions = {
//   origin: 'http://localhost:4200',
//   credentials: true, // Include credentials in CORS request (cookies, authorization headers)
//   optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// cros 
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
const PORT = process.env.PORT || 3000; // Use the provided PORT or default to 3000
mongoose.connect('mongodb://127.0.0.1:27017/GestionRH', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
