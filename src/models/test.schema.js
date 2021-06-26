const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = Schema({
  question: {
    type: String,
    trim: true,
    requried: [true, 'Question is required'],
  },
  options: [
    {
      option: { type: String, trim: true },
      answer: { type: Boolean, default: false },
    },
  ],
  ans: {
    type: String,
    trim: true,
    requried: [true, 'Explain this answer is requried'],
  },
});

module.exports = testSchema;
