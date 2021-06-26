const router = require('express').Router();

const {
  addProgress,
  GetTestScore,
} = require('../controllers/progress.controller');
const { protect } = require('../middlewares/auth.middleware');

router.route('/:id').post(protect, addProgress).get(protect, GetTestScore);
module.exports = router;
