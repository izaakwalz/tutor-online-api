const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const role = JSON.parse(process.env.role);
const ErrorResponse = require('../utils/error-response');
const response = require('../utils/response');
const asyncHandler = require('../middlewares/async-handler');
const User = require('../models/user.model');

/**
 * @ {desc}   message  User sign up
 * @ {route}  message  POST /api/v1/auth/sign-up
 * @ {access} message Public
 */
const signup = asyncHandler(async (req, res) => {
	let user = await User.findOne({ email: req.body.email });
	if (user) throw new ErrorResponse('Email already exists');

	if (req.body.role == role.ADMIN) req.body.level = 'master';

	user = new User(req.body);
	const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET);
	await user.save();

	const result = {
		uid: user._id,
		name: user.name,
		email: user.email,
		level: user.level,
		role: user.role,
		token: token,
	};

	res.status(201).send(response('User created', result));
});

/**
 * @ {desc}   message User sign in
 * @ {route}  message  POST /api/v1/auth/sign-in
 * @ {access} message Public
 */
const signin = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email) throw new ErrorResponse('Email is required', 400);
	if (!password) throw new ErrorResponse('Password is required', 400);

	// Check if user exist
	const user = await User.findOne({ email });
	if (!user) throw new ErrorResponse('Incorrect email or password', 400);

	//Check if user password is correct
	const isCorrect = await bcrypt.compare(password, user.password);
	if (!isCorrect) throw new ErrorResponse('Incorrect email or password', 400);

	const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: 120 * 60, // 2 hours
	});

	const result = {
		uid: user._id,
		name: user.name,
		email: user.email,
		level: user.level,
		role: user.role,
		token: token,
	};

	res.status(200).send(response('User login successful', result));
});

module.exports = { signup, signin };
