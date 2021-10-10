const router = require('express').Router();
const role = JSON.parse(process.env.role);

const { auth } = require('../middlewares/auth.middleware');

const { addProgress, GetTestScore } = require('../controllers/progress.controller');

router.route('/:id').post(auth(role.USER), addProgress).get(auth(role.USER), GetTestScore);

module.exports = router;
