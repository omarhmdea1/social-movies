const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
	reviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Review",
		},
	],
	refreshToken: String,
	followersList: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	followingList: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	plannedMovies: [
		{
			order: {
				type: Number,
				min: 0,
				required: true,
			},
			movieIMDBId: {
				type: String,
				required: true,
			},
			movieId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Movie",
				required: true,
			},
			visibleToOthers: {
				type: Boolean,
				default: true,
				required: true,
			},
		},
	],
});

module.exports = mongoose.model("User", UserSchema);
