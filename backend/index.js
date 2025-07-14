require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/futuristic_ai_web', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Import routes
const routes = require('./routes');
const { router: authRouter } = require('./auth');
app.use('/api', routes);
app.use('/auth', authRouter);

// Health check endpoint
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok' });
});

// Placeholder route
app.get('/', (req, res) => {
  res.send('Futuristic AI Web Backend Running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
