const express = require("express");

const MoviesController = require("../controllers/movies_controller");
const checkAuth = require("../middlewares/check_auth");
const demoAccountAction = require("../middlewares/demo_account_action");

const router = express.Router();

router.get("/search", checkAuth, MoviesController.searchMovies);

router.get("/:movieId", checkAuth, MoviesController.getMovieDetails);

router.post(
	"/reviews",
	checkAuth,
	demoAccountAction,
	MoviesController.addReview
);

router.delete(
	"/reviews/:movieId",
	checkAuth,
	demoAccountAction,
	MoviesController.deleteReview
);

module.exports = router;
