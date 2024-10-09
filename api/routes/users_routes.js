const express = require("express");
const UsersController = require("../controllers/users_controller");
const checkAuth = require("../middlewares/check_auth");
const demoAccountAction = require("../middlewares/demo_account_action");

const router = express.Router();

router.get("/feed", checkAuth, UsersController.getFeed);

router.get("/user/:id", checkAuth, UsersController.getUserProfile);

router.get("/search", checkAuth, UsersController.searchUsers);

router.get(
	"/getActiveUserDynamicData",
	checkAuth,
	UsersController.getActiveUserDynamicData
);

router.post(
	"/following/:id",
	checkAuth,
	demoAccountAction,
	UsersController.followUser
);

router.delete(
	"/following/:id",
	checkAuth,
	demoAccountAction,
	UsersController.unFollowUser
);

router.post(
	"/planned-movies",
	checkAuth,
	demoAccountAction,
	UsersController.addPlannedMovie
);

router.delete(
	"/planned-movies/:movieId",
	checkAuth,
	demoAccountAction,
	UsersController.deletePlannedMovie
);

router.put(
	"/planned-movies",
	checkAuth,
	demoAccountAction,
	UsersController.updatePlannedMovies
);

module.exports = router;
