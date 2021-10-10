const router = require('express').Router();
const role = JSON.parse(process.env.role);

const {
	GetAll,
	CreateSubject,
	UpdateSubject,
	GetOneSubject,
	GetTutorSubjects,
	GetRecomendedSubjects,
} = require('../controllers/subject.controller');
const { auth } = require('../middlewares/auth.middleware');

router.route('/').get(GetAll).post(auth(role.ADMIN), CreateSubject);
router.route('/tutor').get(auth(role.ADMIN), GetTutorSubjects);
router.route('/level').get(auth(role.USER), GetRecomendedSubjects);
router.route('/:id').get(GetOneSubject).put(auth(role.ADMIN), UpdateSubject);

module.exports = router;
