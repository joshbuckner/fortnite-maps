const mongoose = require('mongoose');

module.exports = mongoose.model('Submission', {
	name: String,
	author: String,
	code: String,
	photo: String,
	category: String,
	date: Date,
	views: Number,
	bio: String,
	youtubeLink: String
});