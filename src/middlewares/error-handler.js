const ErrorResponse = require('../utils/error-response');

const notFound = (req, res, next) => {
	const message = `Resourse not found - [${req.method}] ${req.originalUrl}`;
	const error = new ErrorResponse(message, 404);
	next(error);
};

const errorHandler = (err, req, res, next) => {
	let error = { ...err };

	if (err.name === 'CastError') {
		error = new ErrorResponse('Resourse not - found', 400);
	}

	if (err.code === 11000) {
		const field = err.message.split(':')[3].replace(' { ', ''); // convert errors to an array
		const message = `Duplicate field: ${field.toUpperCase()} value entered`;
		error = new ErrorResponse(message, 400);
	}

	if (err.name === 'ValidationError') {
		const message = Object.values(err.errors)
			.map((error) => error.message)
			.join(', ');
		error = new ErrorResponse(message, 400);
	}

	if (err.name === 'TokenExpiredError') {
		error = new ErrorResponse('Unauthorized access: Token  expired', 401);
	}

	res.status(error.statusCode || 500);
	res.json({
		message: error.message || err.message || 'Something went wrong with the server',
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	});
};

module.exports = { notFound, errorHandler };
