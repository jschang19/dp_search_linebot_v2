import mongoose from 'mongoose';
const connectDB = async () => {
	// use lazy initialization to initialize mongoose client and connect to mongodb
	if (mongoose.connection.readyState === 0) {
		await mongoose.connect(process.env.DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	}
};

export default connectDB;
