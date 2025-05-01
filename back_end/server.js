const express = require('express');
const path = require('path')
const cors = require('cors');
const urlRoutes = require('./routes/urls');
const { initDB } = require('./database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Database
initDB();

// Serve React static files
app.use(express.static(path.join(__dirname, 'public')));


// Routes
// Handle every other route with index.html, which allows HTML5 history routing
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api', urlRoutes);

// Start Server
const HOST = process.env.HOST || '0.0.0.0';
const PORT = 1234;
app.listen(PORT,HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});