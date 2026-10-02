const router = require('express').Router();
const { protect, adminOnly } = require('../middleware/auth');
const controller = require('../controllers/studentController');

router.use(protect, adminOnly);
router.get('/', controller.getStudents);
router.get('/:id', controller.getStudent);
router.post('/', controller.createStudent);
router.put('/:id', controller.updateStudent);
router.delete('/:id', controller.deleteStudent);

module.exports = router;
