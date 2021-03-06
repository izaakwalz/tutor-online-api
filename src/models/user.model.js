const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, 'please provide your name'],
		},
		email: {
			type: String,
			unique: true,
			lowercase: true,
			required: [true, 'please provide your email'],
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[0-9]{1,3}\.[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\0-9]+\.)+[a-zA-Z]{2,}))$/,
				'Invalid eamil formart', // email validation
			],
		},
		password: {
			type: String,
			min: 6,
			trim: true,
			required: [true, 'Password is required'],
		},
		level: {
			type: String,
			enum: ['none', 'novice', 'intermediate', 'advanced', 'expert', 'master'],
			message: 'user level is either: beginer, experinced, or expert',
			required: [true, 'please select a level'],
			default: 'none',
		},
		role: {
			type: String,
			enum: ['user', 'tutor', 'admin'],
			message: 'role is either: user or tutor',
			required: [true, 'please select a role'],
			default: 'user',
		},
		active: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	const salt = await bcrypt.genSalt(12);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('user', userSchema);

module.exports = User;
