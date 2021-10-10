const jwt = require('jsonwebtoken');
const asyncHandler = require('../middlewares/async-handler');
const ErrorResponse = require('../utils/error-response');
const User = require('../models/user.model');
const role = JSON.parse(process.env.role);

/**
 * Auth middleware for handling users authorizations
 *
 * If no role is passed the default role is user
 *
 * @param  {String} roles List of roles allowed to access the route
 */
function auth(roles = '') {
	roles = roles.length > 0 ? roles : role.USER;
	return asyncHandler(async (req, res, next) => {
		if (!req.headers.authorization) throw new ErrorResponse('Unauthorized access: Token not found', 401);

		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET); // decode  token
		let user = await User.findById(decoded.id).select('-password');

		if (!user) throw new ErrorResponse('Unauthorized access: User does not exist', 401);

		if (!user.active == true) throw new ErrorResponse('Unauthorized access: User has been deactivated', 401);
		if (!roles.includes(user.role)) throw new ErrorResponse('Unauthorized access', 401);

		req.$user = user;

		next();
	});
}

module.exports = { auth };
