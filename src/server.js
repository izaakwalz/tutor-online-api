const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/error-handler');

dotenv.config();

const app = express();
// express body parser
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors({ origin: true }));

// API routes
app.use('/api/v1', require('./routes/index.routes'));

app.get('/', (req, res) => {
	res.send('API IS RUNNING  🚨 🚨 🚨 🚨 ');
});

// error middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
	await connectDB();
	console.log(`:::> Server runing in ${process.env.NODE_ENV} mode @ http://localhost:${PORT}/api/v1/`);
});
