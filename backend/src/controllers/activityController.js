const Activity = require('../models/Activity');
const Registration = require('../models/Registration');

async function getActivities(req, res) {
  const activities = await Activity.find().populate('createdBy', 'name email').sort({ date: 1 });
  res.json(activities);
}

async function getActivity(req, res) {
  const activity = await Activity.findById(req.params.id).populate('createdBy', 'name email');
  if (!activity) return res.status(404).json({ message: 'Activity not found' });
  res.json(activity);
}

async function createActivity(req, res) {
  const { title, description, date, location, capacity, category } = req.body;

  if (!title || !description || !date || !location || !capacity || !category) {
    return res.status(400).json({ message: 'All activity fields are required' });
  }

  const activity = await Activity.create({
    title, description, date, location, capacity, category, createdBy: req.user._id
  });

  res.status(201).json(activity);
}

async function updateActivity(req, res) {
  const { title, description, date, location, capacity, category } = req.body;

  const activity = await Activity.findById(req.params.id);
  if (!activity) return res.status(404).json({ message: 'Activity not found' });

  Object.assign(activity, { title, description, date, location, capacity, category });
  await activity.save();

  res.json(activity);
}

async function deleteActivity(req, res) {
  const activity = await Activity.findByIdAndDelete(req.params.id);
  if (!activity) return res.status(404).json({ message: 'Activity not found' });

  await Registration.deleteMany({ activity: activity._id });
  res.json({ message: 'Activity deleted successfully' });
}

module.exports = { getActivities, getActivity, createActivity, updateActivity, deleteActivity };
