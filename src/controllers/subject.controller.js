const asyncHandler = require('../middlewares/async-handler');
const Subject = require('../models/subject.model');
const ErrorResponse = require('../utils/error-response');
const response = require('../utils/response');

/**
 * @ {desc}   GET All data
 * @ {route}  GET /api/v1/users
 * @ {access} Public
 */
const GetAll = asyncHandler(async (req, res) => {
  const subjects = await Subject.find({}, { __v: 0 });

  res.status(200).send(response('Success: Data', subjects));
});

const CreateSubject = asyncHandler(async (req, res) => {
  const subject = new Subject({
    name: 'Corse Name',
    link: 'https://localhost:3000/',
    summary: 'write a quick summary of this Subject',
    meta: {
      meta_title: 'Subject title',
      meta_description: 'Subject meta description',
      meta_keywords: 'keywords, keywords 1, keywords 2',
    },
  });

  const result = await subject.save();

  res.status(200).send(response('Success: Data', result));
});

/**
 * @ {desc}   message  Fetch one subject
 * @ {route}  message  GET /api/v1/subjects/:slug
 * @ {access} message Public
 */
const GetOneSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findOne({ slug: req.params.id }, { __v: 0 });

  if (!subject) throw new ErrorResponse('Subject not found');

  return res.status(200).json(response(`Subject data`, subject));
});

const UpdateSubject = asyncHandler(async (req, res) => {
  const {
    name,
    link,
    questions,
    summary,
    meta_title,
    meta_description,
    meta_keywords,
  } = req.body;

  const subject = await Subject.findById(req.params.id);

  if (!subject) throw new CustomError('Subject not found', 404);

  if (subject.name === name) throw new ErrorResponse('data already exist');

  const test = questions.map((item) => ({
    question: item.question,
    options: item.options.map((data) => ({
      option: data.option,
      answer: data.answer,
    })),
    ans: item.ans,
  }));

  if (subject) {
    subject.name = name;
    subject.link = link;
    subject.test = test;
    subject.summary = summary;
    subject.meta.meta_title = meta_title;
    subject.meta.meta_description = meta_description;
    subject.meta.meta_keywords = meta_keywords;

    const result = await subject.save();
    res.status(200).json(response('Product updated', result));
  }
});

module.exports = { GetAll, GetOneSubject, CreateSubject, UpdateSubject };
