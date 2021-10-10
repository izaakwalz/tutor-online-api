const mongoose = require('mongoose');
const slugify = require('slugify');
const testSchema = require('./test.schema');

const Schema = mongoose.Schema;

const subjectSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			lowercase: true,
			unique: true,
			requried: [true, 'Subject name is required'],
		},
		slug: {
			type: String,
			trim: true,
			lowercase: true,
			unique: true,
			requried: [true, 'slug is requried'],
		},
		link: {
			type: String,
			requried: [true, 'Link to video is requried'],
		},
		summary: {
			type: String,
			requried: [true, 'Summary is requried'],
		},
		test: [testSchema],
		tutorID: {
			type: mongoose.Schema.ObjectId,
			ref: 'user',
			required: [true, 'progress must belong to a User!'],
		},
		category: {
			type: String,
			enum: ['novice', 'intermediate', 'advanced', 'expert', 'master'],
			message: 'user level is either: beginer, experinced, or expert',
			required: [true, 'please select a level'],
			default: 'novice',
		},
		meta: {
			meta_title: {
				type: String,
				trim: true,
				required: true,
			},
			meta_description: {
				type: String,
				required: true,
			},
			meta_keywords: {
				type: String,
				required: true,
			},
		},
	},
	{
		timestamps: true,
	}
);

subjectSchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

subjectSchema.pre('find', function (next) {
	this.populate({
		path: 'tutorID',
		select: '-__v -password -createdAt -updatedAt -role -active',
	});
	next();
});

const Subject = mongoose.model('subject', subjectSchema);

module.exports = Subject;
