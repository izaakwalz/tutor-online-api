const router = require('express').Router();

const {
  GetAll,
  CreateSubject,
  UpdateSubject,
  GetOneSubject,
} = require('../controllers/subject.controller');
const { protect, admin } = require('../middlewares/auth.middleware');

router.route('/').get(GetAll).post(protect, admin, CreateSubject);
router.route('/:id').get(GetOneSubject).put(protect, admin, UpdateSubject);

module.exports = router;
