const router = require('express').Router();
const { protect, adminOnly } = require('../middleware/auth');
const controller = require('../controllers/activityController');

router.use(protect);
router.get('/', controller.getActivities);
router.get('/:id', controller.getActivity);
router.post('/', adminOnly, controller.createActivity);
router.put('/:id', adminOnly, controller.updateActivity);
router.delete('/:id', adminOnly, controller.deleteActivity);

module.exports = router;
