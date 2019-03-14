const handleSubmitGet = (req, res, renderOptions) => {
	renderOptions.hide_navbar_sort = 'nav_hide';
	renderOptions.submitIsland = 'underline_active';
	renderOptions.siteBackground = 'background_header_submit';
	renderOptions.headingDisplay = 'Submit Island';
	res.render('submit', renderOptions);
	setTimeout(function() {
		renderOptions.hide_navbar_sort = '';
		renderOptions.siteBackground = 'background_header_main';
		renderOptions.submitIsland = 'hvr_underline_reveal';
	}, 100);
}

const handleSubmitSuccessGet = (req, res, renderOptions) => {
	renderOptions.hide_navbar_sort = 'nav_hide';
	renderOptions.submitIsland = 'underline_active';
	renderOptions.siteBackground = 'background_header_submit';
	renderOptions.headingDisplay = 'Map Successfully Submitted!';
	res.render('submit_success', renderOptions);
	setTimeout(function() {
		renderOptions.hide_navbar_sort = '';
		renderOptions.siteBackground = 'background_header_main';
		renderOptions.submitIsland = 'hvr_underline_reveal';
	}, 100);
}

const handleSubmitFailureGet = (req, res, renderOptions) => {
	renderOptions.hide_navbar_sort = 'nav_hide';
	renderOptions.submitIsland = 'underline_active';
	renderOptions.siteBackground = 'background_header_submit';
	renderOptions.headingDisplay = 'Map Already Submitted.';
	res.render('submit_failure', renderOptions);
	setTimeout(function() {
		renderOptions.hide_navbar_sort = '';
		renderOptions.siteBackground = 'background_header_main';
		renderOptions.submitIsland = 'hvr_underline_reveal';
	}, 100);
}

const handleSubmit = (req, res, renderOptions, Map, Submission, cheerio, cloudinary, rp) => {
	const mapName = req.body.mapName;
	const authorName = req.body.authorName;
	const islandCode = req.body.islandCode;
	const category = req.body.category;
	const youtubeLink = req.body.youtubeLink;
	const youtubeUrl = youtubeLink.slice(32, youtubeLink.length);
	const date = new Date();
  
	const submission = new Submission({
		name: mapName,
		author: authorName,
		code: islandCode,
		photo: '',
		category: category,
		date: date,
		views: 1,
		bio: 'default',
		youtubeLink: youtubeUrl
	});
	Map.find({code: islandCode}, function(err, foundMaps) {
		if(!err) {
			if (foundMaps.length !== 0) {
				res.redirect('submitfailure');
			} else {
				const options = {
					uri: 'https://fortnite.com/fn/' + islandCode,
					transform: function (body) {
						return cheerio.load(body);
					}
				};
				rp(options)
					.then(($) => {
						const bio = $('.island-header-tagline').text();
						Submission.update({ code: islandCode }, { $set: { bio: bio }}, function() {
						});
					})
					.catch((err) => {
						console.log(err);
					});
				cloudinary.uploader.upload(req.file.path, function(result) {
					const securePhoto = result.url.slice(0,4) + 's' + result.url.slice(4,result.url.length);
					Submission.update({ code: islandCode }, { $set: { photo: securePhoto }}, function() {
					});
				});
				submission.save();
				res.redirect('submitsuccess');
			}
		}
	});
}

module.exports = {
	handleSubmitGet: handleSubmitGet,
	handleSubmitSuccessGet: handleSubmitSuccessGet,
	handleSubmitFailureGet: handleSubmitFailureGet,
	handleSubmit: handleSubmit
};