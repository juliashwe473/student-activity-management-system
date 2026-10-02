const router = require('express').Router();
const { protect } = require('../middleware/auth');
const controller = require('../controllers/registrationController');

router.use(protect);
router.get('/', controller.getRegistrations);
router.post('/', controller.createRegistration);
router.put('/:id', controller.updateRegistration);
router.delete('/:id', controller.deleteRegistration);

module.exports = router;
