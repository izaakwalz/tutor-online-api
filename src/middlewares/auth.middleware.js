const jwt = require('jsonwebtoken');
const asyncHandler = require('../middlewares/async-handler');
const ErrorResponse = require('../utils/error-response');
const response = require('../utils/response');
const User = require('../models/user.model');

const protect = asyncHandler(async (req, res, next) => {
  if (
    !req.headers.authorization
    // &&
    // req.headers.authorization.startsWith('Bearer')
  )
    throw new ErrorResponse('Unauthorized access: Token not found', 401);

  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET); // decode  token

  let user = await User.findById(decoded.id).select('-password');

  if (!user)
    throw new ErrorResponse('Unauthorized access: User does not exist', 401);

  if (!user.active == true)
    throw new ErrorResponse(
      'Unauthorized access: User has been deactivated',
      401
    );

  req.$user = user;

  next();
});

const admin = asyncHandler(async (req, res, next) => {
  const role = req.$user.isAdmin === true;

  if (req.$user && role) {
    next();
  } else {
    throw new ErrorResponse('Unauthorized access', 401);
  }
});

module.exports = { protect, admin };
