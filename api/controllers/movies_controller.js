const Joi = require("joi");
const FormatUtils = require("../utils/format_utils");
const ValidationUtils = require("../utils/validation_utils");
const MoviesService = require("../services/movies_service");
const ReviewModel = require("../models/review_model");
const MovieModel = require("../models/movie_model");
const UserModel = require("../models/user_model");

async function getMoviesAppRating() {
	let moviesAppRating = await ReviewModel.aggregate([
		{ $group: { _id: "$movieIMDBId", appRating: { $avg: "$rating" } } },
	]);
	moviesAppRating = moviesAppRating.map((movieRating) => ({
		...movieRating,
		appRating: parseFloat(movieRating.appRating.toFixed(1)),
	}));
	return moviesAppRating;
}

async function getIndivisualMovieAppRating(movieIMDBId) {
	const moviesAppRating = await getMoviesAppRating();
	const movieRating = moviesAppRating.find(
		(rating) => rating._id === movieIMDBId
	);
	if (movieRating === undefined) {
		return null;
	}
	return movieRating.appRating;
}

async function updateLocalMovieDetails(movie) {
	await MovieModel.updateOne({ IMDBId: movie.IMDBId }, movie);
}

exports.saveMovieToDB = async (movieData) => {
	const savedMovie = await MovieModel.findOne({
		IMDBId: movieData.IMDBId,
	});

	if (savedMovie) {
		return savedMovie;
	}
	const newMovie = new MovieModel(movieData);
	await newMovie.save();
	return newMovie;
};

function validateSearch(query) {
	const schema = Joi.object({
		query: Joi.string().max(60).required(),
	});
	return schema.validate(query, { abortEarly: false, allowUnknown: true });
}

function validateAddReview(data) {
	const schema = Joi.object({
		movieIMDBId: Joi.string().required().label("IMDBId"),
		rating: Joi.number().min(0).max(10).required().label("rating"),
		feedback: Joi.string().min(3).required().label("feedback"),
	});
	return schema.validate(data, { abortEarly: false, allowUnknown: true });
}

exports.searchMovies = async (req, res) => {
	try {
		const { query } = req.query;
		const { error, value } = validateSearch(req.query);
		const validationErrors = FormatUtils.formatValidation(error);
		if (validationErrors) {
			return res
				.status(400)
				.json({ success: false, errors: validationErrors });
		}
		const results = await MoviesService.searchMovies(query);
		res.status(200).json({
			success: true,
			data: results,
		});
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};

exports.getMovieDetails = async (req, res) => {
	try {
		const movieId = req.params.movieId;
		const movie = await MoviesService.getMovieDetails(movieId);
		if (!movie) {
			return res.status(404).json({
				success: false,
				errors: "could not find movie with this id",
			});
		}
		const movieAppRating = await getIndivisualMovieAppRating(movie.IMDBId);
		movie.appRating = movieAppRating;
		await updateLocalMovieDetails(movie);

		let movieReviews = await ReviewModel.find({
			movieIMDBId: movie.IMDBId,
		})
			.sort({ createdAt: -1 })
			.populate(["userId", "movieId"]);

		movieReviews = movieReviews.map((review = FormatUtils.formatReview));
		const activeUserReviewIndex = movieReviews.findIndex(
			(review) => review.user.id.toString() === req.userData.id
		);
		const activeUserReview = movieReviews[activeUserReviewIndex];
		if (activeUserReview) {
			movieReviews.splice(activeUserReviewIndex, 1);
			movieReviews.unshift(activeUserReview);
		}
		movie.activeUserReview = activeUserReview ?? null;
		movie.reviews = movieReviews;
		res.status(200).json({ success: true, data: movie });
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};

exports.addReview = async (req, res) => {
	try {
		const { error, value } = validateAddReview(req.body);
		const validationErrors = FormatUtils.formatValidation(error);
		if (error) {
			return res
				.status(400)
				.json({ success: false, errors: validationErrors });
		}

		const userId = req.userData.id;
		const userReview = await ReviewModel.findOne({
			userId: userId,
			movieIMDBId: req.body.movieIMDBId,
		});

		if (userReview) {
			return res.status(409).json({
				success: false,
				errors: "You already reviewed this movie",
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
		const savedMovie = await this.saveMovieToDB(movieData);
		const newReview = new ReviewModel({
			userId,
			rating: req.body.rating.toFixed(1),
			feedback: req.body.feedback,
			movieIMDBId: req.body.movieIMDBId,
			movieId: savedMovie._id,
		});
		await newReview.save();
		const reviewId = newReview._id.toString();

		await UserModel.updateOne(
			{ _id: userId },
			{ $push: { reviews: reviewId } }
		);
		const formattedReview = FormatUtils.formatReview(newReview);
		res.status(201).json({ success: true, data: formattedReview });
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};

exports.deleteReview = async (req, res) => {
	try {
		const userId = req.userData.id;
		const reviewId = req.params.movieId;
		if (!ValidationUtils.isValidMongooseId(reviewId)) {
			return res.status(400).json({
				success: false,
				errors: "invalid reviewId",
			});
		}

		const review = await ReviewModel.findOneAndDelete({
			_id: reviewId,
			userId: userId,
		});
		if (!review) {
			return res.status(404).json({
				success: false,
				errors: "You have not reviewed this movie yet",
			});
		}

		await UserModel.updateOne(
			{ _id: userId },
			{ $pull: { reviews: reviewId } }
		);

		const formattedReview = FormatUtils.formatReview(review);
		res.status(200).json({ success: true, data: formattedReview });
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "internal server error",
		});
	}
};
