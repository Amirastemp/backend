// server.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/searchRoutes');
const candidatRoutes = require('./routes/candidatRoutes');
const competenceRoutes = require('./routes/competenceRoutes');

const congeRoutes = require('./routes/congeRoutes');
const config=require('./config/config.js');
const cors = require('cors');
dotenv.config();
const app = express();
const socketIO = require('socket.io');
const http = require('http');

// Middleware
app.use(express.json());


app.use(cors());

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST','DELET','PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/conge', congeRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/candidat', candidatRoutes);
app.use('/api/competence', competenceRoutes);





io.on('connection', (socket) => {
  console.log('A user connected');

  // Example: emit a notification when a new request is added
  socket.on('newRequest', (requestData) => {
    io.emit('notification', { message: 'New request added', requestData: requestData });
  });
    
 

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});




// Connect to MongoDB
const PORT = process.env.PORT || 3000; // Use the provided PORT or default to 3000
mongoose.connect('mongodb://127.0.0.1:27017/GestionRH')
  .then(() => {
    console.log('Connected to MongoDB');
    // Start server
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
