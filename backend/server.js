const express = require('express');
const cors = require('cors');
const travelRoutes = require('./routes/travelRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/travel', travelRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
