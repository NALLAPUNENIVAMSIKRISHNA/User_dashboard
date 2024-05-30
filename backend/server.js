const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Atlas connection fZEiBy2Cbeu6cHeF  
const dbURI = 'mongodb+srv://vamsikrishnanallapuneni:fZEiBy2Cbeu6cHeF@cluster0.icqwgmn.mongodb.net/USER_DASHBOARD?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
