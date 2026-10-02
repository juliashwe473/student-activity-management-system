const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  studentId: { type: String, unique: true, sparse: true, trim: true },
  department: { type: String, trim: true, default: '' },
  phone: { type: String, trim: true, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
