const router = require('express').Router();

const {
  GetData,
  UpdateData,
  MakeMeATutor,
} = require('../controllers/user.controller');
const {
  addProgress,
  GetTestScore,
  getGradeBYID,
} = require('../controllers/progress.controller');
const { protect } = require('../middlewares/auth.middleware');

router.route('/').get(protect, GetData).put(protect, UpdateData);

router.route('/grade').get(protect, getGradeBYID);

router
  .route('/grade/:id')
  .post(protect, addProgress)
  .get(protect, GetTestScore);

router.route('/make-me-a-tutor').put(protect, MakeMeATutor);

module.exports = router;
