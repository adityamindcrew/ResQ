require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const ambulanceRoute = require('./routes/ambulance.routes');
const doctorRoute = require('./routes/doctor.routes');
const locationRoute = require('./routes/location.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS Configuration
const corsOptions = {
  origin: '*', // Allow all origins in development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type','User-Agent',
    'Bypass-Tunnel-Reminder' ,],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database
connectDB();

// Test route to verify server is running
// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to the API' });
// });

// Routes
app.use('/api', ambulanceRoute);
app.use('/api', doctorRoute);
app.use('/api', locationRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 500,
    message: 'Something broke!',
    error: err.message
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Route not found'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;