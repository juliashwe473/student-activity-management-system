const Registration = require('../models/Registration');
const Activity = require('../models/Activity');

async function getRegistrations(req, res) {
  const filter = req.user.role === 'admin' ? {} : { student: req.user._id };

  const registrations = await Registration.find(filter)
    .populate('student', 'name email studentId department')
    .populate('activity', 'title date location category capacity')
    .sort({ registeredAt: -1 });

  res.json(registrations);
}

async function createRegistration(req, res) {
  const { activityId } = req.body;

  if (!activityId) {
    return res.status(400).json({ message: 'Activity ID is required' });
  }

  const activity = await Activity.findById(activityId);
  if (!activity) return res.status(404).json({ message: 'Activity not found' });

  const existing = await Registration.findOne({
    student: req.user._id,
    activity: activityId
  });

  if (existing) {
    return res.status(400).json({ message: 'You already registered for this activity' });
  }

  const count = await Registration.countDocuments({
    activity: activityId,
    status: 'registered'
  });

  if (count >= activity.capacity) {
    return res.status(400).json({ message: 'This activity is full' });
  }

  const registration = await Registration.create({
    student: req.user._id,
    activity: activityId
  });

  const result = await Registration.findById(registration._id)
    .populate('student', 'name email studentId')
    .populate('activity', 'title date location category capacity');

  res.status(201).json(result);
}

async function updateRegistration(req, res) {
  const registration = await Registration.findById(req.params.id);
  if (!registration) return res.status(404).json({ message: 'Registration not found' });

  if (req.user.role !== 'admin' && registration.student.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'You cannot modify this registration' });
  }

  const { status } = req.body;
  if (!['registered', 'cancelled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid registration status' });
  }

  registration.status = status;
  await registration.save();

  res.json(registration);
}

async function deleteRegistration(req, res) {
  const registration = await Registration.findById(req.params.id);
  if (!registration) return res.status(404).json({ message: 'Registration not found' });

  if (req.user.role !== 'admin' && registration.student.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'You cannot delete this registration' });
  }

  await registration.deleteOne();
  res.json({ message: 'Registration deleted successfully' });
}

module.exports = { getRegistrations, createRegistration, updateRegistration, deleteRegistration };
