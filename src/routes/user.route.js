const router = require('express').Router();
const { GetData, UpdateData, MakeMeATutor } = require('../controllers/user.controller');
const { addProgress, GetTestScore, getGradeBYID } = require('../controllers/progress.controller');
const { auth } = require('../middlewares/auth.middleware');

const role = JSON.parse(process.env.role);

router.route('/').get(auth(role.USER), GetData).put(auth(role.USER), UpdateData);

router.route('/grade').get(auth(role.USER), getGradeBYID);

router.route('/grade/:id').post(auth(role.USER), addProgress).get(auth(role.USER), GetTestScore);

router.route('/make-me-a-tutor').put(auth(role.USER), MakeMeATutor);

module.exports = router;
