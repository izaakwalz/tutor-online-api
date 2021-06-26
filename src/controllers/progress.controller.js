const asyncHandeler = require('../middlewares/async-handler');
const ErrorResponse = require('../utils/error-response');
const response = require('../utils/response');
const Subject = require('../models/subject.model');
const Progress = require('../models/progress.model');

const GetTestScore = asyncHandeler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);

  if (!subject) throw new ErrorResponse('Subject not found', 400);

  let progress = await Progress.findOne({
    userID: req.$user._id,
    subID: req.params.id,
  });

  if (!progress) throw new ErrorResponse('Grade not found', 400);

  if (progress && progress.subID == req.params.id) {
    res.status(200).json(response('data recived', progress));
  }
});

const addProgress = asyncHandeler(async (req, res) => {
  const { score } = req.body;

  const subject = await Subject.findById(req.params.id);

  if (!subject) throw new ErrorResponse('Subject not found', 400);

  let progress = await Progress.findOne({
    userID: req.$user._id,
    subID: req.params.id,
  });

  if (progress) {
    progress.deleteOne();
  }

  const newProgress = await Progress.create({
    userID: req.$user._id,
    subID: req.params.id,
    score: score,
    isTaken: Date.now(),
  });

  const result = newProgress;
  res.status(200).json(response('Progress saved', result));
});

const getGradeBYID = asyncHandeler(async (req, res) => {
  const progress = await Progress.find({ userID: req.$user._id });

  if (!progress)
    throw new ErrorResponse('No Grade Found please take a test', 400);
  res.status(200).send(response('Success: Data', progress));
});

module.exports = { addProgress, GetTestScore, getGradeBYID };
