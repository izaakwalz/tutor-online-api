const mongoose = require('mongoose');

const options = {
	useCreateIndex: true,
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
};

const dbConnectionString = process.env.MONGODB_URI;

const connectDB = async () => {
	try {
		const conn = mongoose.connect(process.env.MONGODB_URI, options);
		console.log(`:::> Connected to MongoDB Database :> ${(await conn).connection.host} `);
	} catch (error) {
		console.log("<:-: Could'nt connect to database <:", error.message);
	}
};

module.exports = connectDB;
