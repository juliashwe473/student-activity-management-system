require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const activityRoutes = require('./routes/activityRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:4200'
}));
app.use(express.json());

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'OK', service: 'Student Activity API' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/activities', activityRoutes);
app.use('/api/v1/registrations', registrationRoutes);

app.use(notFound);
app.use(errorHandler);

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) return;

  const exists = await User.findOne({ email });
  if (!exists) {
    const hashed = await bcrypt.hash(password, 12);
    await User.create({
      name: 'System Administrator',
      email,
      password: hashed,
      role: 'admin'
    });
    console.log(`Admin created: ${email}`);
  }
}

async function start() {
  try {
    await connectDB();
    await seedAdmin();

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`API running on port ${port}`);
    });
  } catch (error) {
    console.error('Startup failed:', error);
    process.exit(1);
  }
}

start();
