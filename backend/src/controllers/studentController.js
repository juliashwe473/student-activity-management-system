const User = require('../models/User');

function clean(user) {
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

async function getStudents(req, res) {
  const students = await User.find({ role: 'student' }).select('-password').sort({ createdAt: -1 });
  res.json(students.map(clean));
}

async function getStudent(req, res) {
  const student = await User.findOne({ _id: req.params.id, role: 'student' }).select('-password');
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(clean(student));
}

async function createStudent(req, res) {
  const { name, email, password, studentId, department, phone } = req.body;

  if (!name || !email || !password || !studentId) {
    return res.status(400).json({ message: 'Name, email, password and student ID are required' });
  }

  const exists = await User.findOne({ $or: [{ email }, { studentId }] });
  if (exists) return res.status(400).json({ message: 'Email or student ID already exists' });

  const bcrypt = require('bcryptjs');
  const hashed = await bcrypt.hash(password, 12);

  const student = await User.create({
    name, email, password: hashed, studentId, department, phone, role: 'student'
  });

  res.status(201).json(clean(student));
}

async function updateStudent(req, res) {
  const { name, email, studentId, department, phone, password } = req.body;
  const student = await User.findOne({ _id: req.params.id, role: 'student' });

  if (!student) return res.status(404).json({ message: 'Student not found' });

  if (name !== undefined) student.name = name;
  if (email !== undefined) student.email = email;
  if (studentId !== undefined) student.studentId = studentId;
  if (department !== undefined) student.department = department;
  if (phone !== undefined) student.phone = phone;

  if (password) {
    const bcrypt = require('bcryptjs');
    student.password = await bcrypt.hash(password, 12);
  }

  await student.save();
  res.json(clean(student));
}

async function deleteStudent(req, res) {
  const student = await User.findOneAndDelete({ _id: req.params.id, role: 'student' });
  if (!student) return res.status(404).json({ message: 'Student not found' });

  const Registration = require('../models/Registration');
  await Registration.deleteMany({ student: student._id });

  res.json({ message: 'Student deleted successfully' });
}

module.exports = { getStudents, getStudent, createStudent, updateStudent, deleteStudent };
