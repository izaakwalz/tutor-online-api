const router = require('express').Router();

const { UpdateData, DeleteData } = require('../controllers/user.controller');
const { getGradeBYID } = require('../controllers/progress.controller');
const { protect } = require('../middlewares/auth.middleware');

router.route('/').get(protect, getGradeBYID);
router.route('/:id').put(UpdateData).delete(DeleteData);
// router.route('/user').get(protect, getGradeBYID);

module.exports = router;
