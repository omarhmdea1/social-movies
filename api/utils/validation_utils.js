const Joi = require("joi");

exports.MongooseIdRegex = /^[0-9a-fA-F]{24}$/;

exports.isValidMongooseId = (id) => {
	return this.MongooseIdRegex.test(id);
};

exports.JoiMongooseIdValidator = (label) => {
	return Joi.string()
		.pattern(this.MongooseIdRegex)
		.label(label)
		.messages({
			"string.pattern.base": `"${label}" is not a valid id`,
		});
};
