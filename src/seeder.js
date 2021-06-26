const fs = require('fs');
const dotenv = require('dotenv');
// const Post = require('./models/post.model');
const subjects = require('./data/subject.json');
const Subject = require('./models/subject.model');
const connectDB = require('./config/db');

dotenv.config();

connectDB();
// const subjects = JSON.parse(fs.readFileSync(datas, 'utf-8'));

const importData = async () => {
  try {
    await Subject.insertMany(subjects);
    console.log('success');
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
}
