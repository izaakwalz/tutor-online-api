# AUTH MIDDLEWARES

```javascript
const protect = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization)
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

const user = asyncHandler(async (req, res, next) => {
  const roles = req.$user.role === role.ADMIN;

  if (req.$user && roles) {
    next();
  } else {
    throw new ErrorResponse('Unauthorized access', 401);
  }
});

module.exports = { protect, user };
```
