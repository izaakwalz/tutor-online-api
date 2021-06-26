const router = require('express').Router();

router.use('/auth', require('./auth.route'));
router.use('/users', require('./user.route'));
router.use('/subjects', require('./subject.route'));
router.use('/progress', require('./progress.route'));

module.exports = router;
