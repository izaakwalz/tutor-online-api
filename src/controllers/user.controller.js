const asyncHandeler = require('../middlewares/async-handler');
const ErrorResponse = require('../utils/error-response');
const response = require('../utils/response');
const User = require('../models/user.model');

/**
 * @ {desc}   GET All data
 * @ {route}  GET /api/v1/users
 * @ {access} Public
 */
// const GetData = asyncHandeler(async (req, res) => {
//   const users = await User.find({}, { __v: 0 });

//   res.status(201).send(response('Success: Data', users));
// });
/**
 * @ {desc}   Update data
 * @ {route}  PUT /api/v1/users/:id
 * @ {access} Public
 */
const UpdateData = asyncHandeler(async (req, res) => {
  const id = req.params.id;

  const user = await User.findByIdAndUpdate(
    { _id: id },
    { $set: req.body },
    { new: true }
  );
  if (!user) throw new ErrorResponse('Error: data dose not exist', 404);

  res.status(200).send(response('Success: data updated', user));
});

/**
 * @ {desc}   Delete data
 * @ {route}  DELETE /api/v1/users/:id
 * @ {access} Public
 */
const DeleteData = asyncHandeler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) throw new ErrorResponse('Error: data not found', 404);

  user.remove();

  res.status(200).send(response('Success: data Deleted', {}));
});

module.exports = { UpdateData, DeleteData };
