require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const { PORT } = require('./config/constants');
const { initMySQL } = require('./config/database');
const loggerMiddleware = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const assetRoutes = require('./routes/assets');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// Static files
app.use(express.static(path.join(__dirname, '../Frontend')));

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/login.html'));
});

// Routes
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/assets', assetRoutes);

// Error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, async () => {
  await initMySQL();
  console.log(`Server running at http://localhost:${PORT}`);
});
