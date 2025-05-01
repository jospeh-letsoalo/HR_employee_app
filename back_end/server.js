const express = require('express');
const path = require('path')
const cors = require('cors');
const urlRoutes = require('./routes/urls');
const { initDB } = require('./database');
const PORT = process.env.PORT || 3001;

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});