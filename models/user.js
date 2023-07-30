import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	lineId: {
		type: String,
		required: true,
		unique: true,
	},
	userName: {
		type: String,
		required: true,
	},
	searchMode: {
		type: Number,
		required: true,
		default: 0,
		enum: [0, 1, 2, 3],
	},
	savedDepartments: {
		type: Array,
		required: true,
		default: [],
	},
	savedStarDepartments: {
		type: Array,
		required: true,
		default: [],
	},
});

const User = mongoose.model('User', userSchema);
export default User;
