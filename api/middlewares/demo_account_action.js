function demoAccountAction(req, res, next) {
	if (req.userData.email !== process.env.SOCIAL_MOVIES_DEMO_EMAIL) {
		next();
		return;
	}

	res.status(403).json({
		success: false,
		errors: "Action not allowed in demo mode",
	});
}

module.exports = demoAccountAction;
