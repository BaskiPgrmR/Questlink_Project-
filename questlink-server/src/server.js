const express = require('express');
const path = require('path');
const app = express();

// Your API routes
app.use('/api/quests', require('./routes/quests.routes'));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../../questlink-client/build')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../questlink-client/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});