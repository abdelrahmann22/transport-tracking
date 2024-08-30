const mongoose = require("mongoose");
const config = require('./config');

const connectDB = async()=>{
	try{
		const uri = config.MONGO_URI;
		await mongoose.connect(uri);

		console.log('MongoDB connected successfully!');
	}catch(err){
		console.log("MongoDB connection error: ", err);
		process.exit(1);
	}
}

module.exports = connectDB;
