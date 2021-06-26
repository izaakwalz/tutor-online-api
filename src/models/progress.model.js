const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const progressSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      required: [true, 'progress must belong to a User!'],
    },
    subID: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      required: [true, 'progress must belong to a User!'],
    },
    score: {
      type: Number,
      default: 0,
      max: [100, 'Score must be below or equal to 100'],
      requried: [true, 'user score is required'],
      set: (val) => Math.round((val / 100) * 100), // 10% - 99%
    },
    isPass: {
      type: String,
      enum: ['A', 'B', 'C', 'D', 'F'],
      message: 'pass grade must be either: A, B, C, D, F',
      require: true,
    },
    isTaken: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

progressSchema.pre('save', function (next) {
  const grade =
    this.score >= 90
      ? 'A'
      : this.score >= 75
      ? 'B'
      : this.score >= 50
      ? 'C'
      : this.score >= 40
      ? 'D'
      : 'F';

  this.isPass = grade;
  next();
});

const Progress = mongoose.model('progress', progressSchema);

module.exports = Progress;
