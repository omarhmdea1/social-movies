const UserModel = require("../models/user_model");
const ReviewModel = require("../models/review_model");
const MovieModel = require("../models/movie_model");
const FormatUtils = require("../utils/format_utils");
const ValidationUtils = require("../utils/validation_utils");
const MoviesService = require("../services/movies_service");
const MoviesController = require("../controllers/movies_controller");

const Joi = require("joi");

function validateSearch(query) {
	const schema = Joi.object({
		query: Joi.string().max(60).required().label("query"),
	});
	return schema.validate(query, { abortEarly: false, allowUnknown: true });
}

const plannedMovieSchemaObject = {
	movieIMDBId: Joi.string().label("movieIMDBId"),
	visibleToOthers: Joi.valid(true, false).label("visibleToOthers"),
	order: Joi.number().min(0).label("order"),
	movieId: ValidationUtils.JoiMongooseIdValidator("movieId"),
	id: ValidationUtils.JoiMongooseIdValidator("id"),
};

function validateAddPlannedMovie(data) {
	const schema = Joi.object({
		movieIMDBId: plannedMovieSchemaObject.movieIMDBId.required(),
		visibleToOthers: plannedMovieSchemaObject.visibleToOthers.required(),
	});
	return schema.validate(data, { abortEarly: false, allowUnknown: true });
}

function validateUpdatePlannedMovies(data) {
	const movieSchema = {
		id: plannedMovieSchemaObject.id.required(),
		visibleToOthers: plannedMovieSchemaObject.visibleToOthers.required(),
		order: plannedMovieSchemaObject.order.required(),
	};
	const schema = Joi.array()
		.required()
		.label("plannedMovies")
		.items(movieSchema);
	return schema.validate(data, { abortEarly: false, allowUnknown: true });
}

exports.getFeed = async (req, res) => {
	try {
		const user = req.userData;
		const updatedUserData = await UserModel.findById(user.id);

		let reviewsList = await ReviewModel.find({
			userId: updatedUserData.followingList,
		})
			.sort({ createdAt: -1 })
			.populate(["userId", "movieId"]);

		reviewsList = reviewsList.map(FormatUtils.formatReview);
		res.status(200).json({
			success: true,
			data: reviewsList,
		});
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};

exports.getUserProfile = async (req, res) => {
	try {
		const userId = req.params.id;
		const activeUserId = req.userData.id;
		if (!ValidationUtils.isValidMongooseId(userId)) {
			return res.status(400).json({
				success: false,
				errors: "invalid userId",
			});
		}
		let userData = await UserModel.findById(userId).populate([
			"followersList",
			"followingList",
			"reviews",
			"plannedMovies.movieId",
		]);
		userData = await userData?.populate("reviews.movieId");

		if (!userData) {
			return res.status(404).json({
				success: false,
				errors: "could not find user with this id",
			});
		}
		userData = JSON.parse(JSON.stringify(userData));
		userData.followersList = userData.followersList.map((user) =>
			FormatUtils.formatUser(user)
		);
		userData.followingList = userData.followingList.map((user) =>
			FormatUtils.formatUser(user)
		);
		const sortedReviews = userData.reviews.sort((a, b) => {
			const aDate = new Date(a);
			const bDate = new Date(b);
			if (aDate === bDate) {
				return 0;
			}
			if (aDate > bDate) {
				return 1;
			}
			return -1;
		});
		userData.reviews = sortedReviews.map((review) => {
			review.userId = userData;
			return FormatUtils.formatReview(review);
		});
		userData.plannedMovies = userData.plannedMovies
			.filter((plannedMovie) => plannedMovie.visibleToOthers)
			.sort((a, b) => (a.order < b.order ? -1 : 1));
		userData = FormatUtils.formatUser(userData, true, true);
		userData.isActiveUser = activeUserId === userId;
		res.status(200).json({ success: true, data: userData });
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};

exports.searchUsers = async (req, res) => {
	try {
		const { query } = req.query;
		const { error, value } = validateSearch(req.query);
		const validationErrors = FormatUtils.formatValidation(error);
		if (validationErrors) {
			return res
				.status(400)
				.json({ success: false, errors: validationErrors });
		}
		const [firstName, lastName] = query.split(" ");
		const firstNameQuery = new RegExp(`${firstName}`, "i");
		const lastNameQuery = new RegExp(`${lastName}`, "i");
		const users = await UserModel.find({
			$or: [
				{ firstName: { $regex: firstNameQuery } },
				{ firstName: { $regex: lastNameQuery } },
				{ lastName: { $regex: lastNameQuery } },
				{ lastName: { $regex: firstNameQuery } },
			],
		});
		const formattedResults = users.map(FormatUtils.formatUser);
		res.status(200).json({
			success: true,
			data: formattedResults,
		});
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};

exports.getActiveUserDynamicData = async (req, res) => {
	try {
		const userId = req.userData.id;
		let userDynamicData = await UserModel.findById(userId, {
			followersList: 1,
			followingList: 1,
			plannedMovies: 1,
		}).populate([
			"followersList",
			"followingList",
			"plannedMovies.movieId",
		]);

		userDynamicData = JSON.parse(JSON.stringify(userDynamicData));

		userDynamicData.followersList = userDynamicData.followersList.map(
			(user) => FormatUtils.formatUser(user)
		);
		userDynamicData.followingList = userDynamicData.followingList.map(
			(user) => FormatUtils.formatUser(user)
		);
		userDynamicData.plannedMovies = userDynamicData.plannedMovies
			.map((movie) => FormatUtils.formatPlannedMovie(movie))
			.sort((a, b) => (a.order < b.order ? -1 : 1));
		delete userDynamicData._id;
		res.status(200).json({ success: true, data: userDynamicData });
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};

exports.followUser = async (req, res) => {
	try {
		const wannaFollowId = req.params.id;
		const activeUserId = req.userData.id;
		if (!ValidationUtils.isValidMongooseId(wannaFollowId)) {
			return res.status(400).json({
				success: false,
				errors: "invalid userId",
			});
		}

		if (wannaFollowId === activeUserId) {
			return res.status(400).json({
				success: false,
				errors: "You can't follow yourself",
			});
		}

		if (
			await UserModel.find({
				_id: activeUserId,
				followingList: wannaFollowId,
			}).count()
		) {
			return res.status(400).json({
				success: false,
				errors: "You already follow this user",
			});
		}

		await UserModel.updateOne(
			{ _id: wannaFollowId },
			{ $push: { followersList: activeUserId } }
		);
		await UserModel.updateOne(
			{ _id: activeUserId },
			{ $push: { followingList: wannaFollowId } }
		);
		let wannaFollowUser = await UserModel.findOne({ _id: wannaFollowId });
		wannaFollowUser = FormatUtils.formatUser(wannaFollowUser, true, true);
		res.status(200).json({ success: true, data: wannaFollowUser });
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};

exports.unFollowUser = async (req, res) => {
	try {
		const followedUserId = req.params.id;
		const activeUserId = req.userData.id;
		if (!ValidationUtils.isValidMongooseId(followedUserId)) {
			return res.status(400).json({
				success: false,
				errors: "invalid userId",
			});
		}

		if (followedUserId === activeUserId) {
			return res.status(400).json({
				success: false,
				errors: "You can't unfollow yourself",
			});
		}

		if (
			(await UserModel.findOne({
				_id: activeUserId,
				followingList: followedUserId,
			}).count()) == 0
		) {
			return res.status(400).json({
				success: false,
				errors: "You don't even follow this user",
			});
		}
		let wasFollowedUser = await UserModel.findOne({ _id: followedUserId });
		wasFollowedUser = FormatUtils.formatUser(wasFollowedUser, true, true);
		await UserModel.updateOne(
			{ _id: followedUserId },
			{ $pull: { followersList: activeUserId } }
		).populate("userId");

		await UserModel.updateOne(
			{ _id: activeUserId },
			{ $pull: { followingList: followedUserId } }
		);
		res.status(200).json({ success: true, data: wasFollowedUser });
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};

exports.addPlannedMovie = async (req, res) => {
	try {
		const { error, value } = validateAddPlannedMovie(req.body);
		const validationErrors = FormatUtils.formatValidation(error);
		if (error) {
			return res
				.status(400)
				.json({ success: false, errors: validationErrors });
		}

		const userData = await UserModel.findById(req.userData.id);
		const isMovieAlreadyInPlanned = userData.plannedMovies.some(
			(movie) => movie.movieIMDBId === req.body.movieIMDBId
		);
		if (isMovieAlreadyInPlanned) {
			return res.status(409).json({
				success: false,
				errors: "this Movie is already in planned list",
			});
		}
		const movieData = await MoviesService.getMovieDetails(
			req.body.movieIMDBId
		);
		if (!movieData) {
			return res.status(404).json({
				success: false,
				errors: "could not find movie with the provided movieIMDBId",
			});
		}
		const savedMovie = await MoviesController.saveMovieToDB(movieData);
		const plannedMovie = {
			movieId: savedMovie._id,
			movieIMDBId: savedMovie.IMDBId,
			order: userData.plannedMovies.length,
			visibleToOthers: req.body.visibleToOthers,
		};
		userData.plannedMovies.push(plannedMovie);
		await userData.save();
		plannedMovie.movieId = savedMovie;
		plannedMovie._id = userData.plannedMovies.at(-1)._id;
		const formattedPlannedMovie =
			FormatUtils.formatPlannedMovie(plannedMovie);

		res.status(201).json({ success: true, data: formattedPlannedMovie });
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};

exports.deletePlannedMovie = async (req, res) => {
	try {
		const movieId = req.params.movieId;
		if (!ValidationUtils.isValidMongooseId(movieId)) {
			return res.status(400).json({
				success: false,
				errors: "invalid movieId",
			});
		}
		const userData = await UserModel.findById(req.userData.id);
		let deletedMovie;
		const filteredPlannedMovies = [];
		userData.plannedMovies.forEach((movie) => {
			if (movie._id.toString() !== movieId) {
				filteredPlannedMovies.push(movie);
			} else {
				deletedMovie = movie;
			}
		});
		if (!deletedMovie) {
			return res.status(404).json({
				success: false,
				errors: "could not find this movie in your planned list",
			});
		}
		userData.plannedMovies = filteredPlannedMovies;
		await userData.save();
		const populatedMovie = await MovieModel.findById(deletedMovie.movieId);
		deletedMovie.movieId = populatedMovie;
		deletedMovie = FormatUtils.formatPlannedMovie(deletedMovie);

		res.status(200).json({ success: true, data: deletedMovie });
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};

exports.updatePlannedMovies = async (req, res) => {
	try {
		const { error, value } = validateUpdatePlannedMovies(
			req.body.plannedMovies
		);
		const validationErrors = FormatUtils.formatValidation(error);
		if (error) {
			return res
				.status(400)
				.json({ success: false, errors: validationErrors });
		}

		const userData = await UserModel.findById(req.userData.id);
		const currentPlannedMovies = {};
		userData.plannedMovies.forEach((plannedMovie) => {
			currentPlannedMovies[plannedMovie.id] = plannedMovie;
		});

		const updatedPlannedMovies = [];
		req.body.plannedMovies.forEach((plannedMovie) => {
			if (currentPlannedMovies.hasOwnProperty(plannedMovie.id)) {
				const updatedPlannedMovie = {
					...currentPlannedMovies[plannedMovie.id],
					order: plannedMovie.order,
					visibleToOthers: plannedMovie.visibleToOthers,
				};
				updatedPlannedMovies.push(updatedPlannedMovie);
			}
		});

		userData.plannedMovies = updatedPlannedMovies;
		await userData.save();
		const populatedUserData = await userData.populate(
			"plannedMovies.movieId"
		);
		const formattedPlannedMovies = populatedUserData.plannedMovies
			.map(FormatUtils.formatPlannedMovie)
			.sort((a, b) => (a.order < b.order ? -1 : 1));
		res.status(201).json({ success: true, data: formattedPlannedMovies });
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};
