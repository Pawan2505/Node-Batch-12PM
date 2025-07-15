const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db')
const adminRoutes = require('./routes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// connectDB();
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Admin API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
