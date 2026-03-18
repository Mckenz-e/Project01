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

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.use(express.static(path.join(__dirname, '../Frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/login.html'));
});

app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/assets', assetRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  await initMySQL();
  console.log(`Server running at http://localhost:${PORT}`);
});
