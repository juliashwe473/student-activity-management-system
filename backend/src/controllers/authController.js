const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function makeToken(user) {
  return jwt.sign(
    { id: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
}

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    studentId: user.studentId || '',
    department: user.department || '',
    phone: user.phone || ''
  };
}

async function register(req, res) {
  const { name, email, password, studentId, department, phone } = req.body;

  if (!name || !email || !password || !studentId) {
    return res.status(400).json({ message: 'Name, email, password and student ID are required' });
  }

  const exists = await User.findOne({ $or: [{ email }, { studentId }] });
  if (exists) return res.status(400).json({ message: 'Email or student ID already exists' });

  const hashed = await bcrypt.hash(password, 12);
  const user = await User.create({
    name, email, password: hashed, role: 'student', studentId, department, phone
  });

  res.status(201).json({
    message: 'Registration successful',
    token: makeToken(user),
    user: publicUser(user)
  });
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.json({
    message: 'Login successful',
    token: makeToken(user),
    user: publicUser(user)
  });
}

async function me(req, res) {
  res.json({ user: publicUser(req.user) });
}

module.exports = { register, login, me };
