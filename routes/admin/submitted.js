const handleSubmittedGet = (req, res, renderOptions, Submission, sortNew) => {
	renderOptions.adminTitle = 'Submitted Maps';
	Submission.find({}, function(err, foundMaps) {
		const newMaps = sortNew(foundMaps);
		if(!err) {
			renderOptions.tilesDisplay = newMaps;
			renderOptions.adminView = 'submitted_maps';
			res.render('admin_portal', renderOptions);
		}
	});
}

const handleEditSubmittedGet = (req, res, renderOptions, Submission) => {
	const requestedMap = req.params.mapName;
	const currentMaps = [];
	Submission.find({}, function(err, foundMaps) {
		foundMaps.forEach(function(map) {
			const storedCode = map.code;
			if (requestedMap === storedCode) {
				if (map.category === 'Obstacle') {
					renderOptions.selectOp = 'selected';
				} else if (map.category === 'Racing') {
					renderOptions.selectRacing = 'selected';
				} else if (map.category === 'Minigame') {
					renderOptions.selectMg = 'selected';
				} else if (map.category === 'PvP') {
					renderOptions.selectBa = 'selected';
				} else if (map.category === 'Practice') {
					renderOptions.selectEc = 'selected';
				} else if (map.category === 'Creative') {
					renderOptions.selectCb = 'selected';
				}
				renderOptions.adminTitle = 'Submitted Maps';
				currentMaps.push(map);
				renderOptions.map = map;
				renderOptions.youtubeLink = map.youtubeLink;
				res.render('admin_map', renderOptions);
				setTimeout(function() {
					renderOptions.selectOp = '';
					renderOptions.selectRacing = '';
					renderOptions.selectMg = '';
					renderOptions.selectBa = '';
					renderOptions.selectEc = '';
					renderOptions.selectCb = '';
				}, 100);
			}
		});
	});
}

const handleEditSubmitted = (req, res, Submission, cloudinary) => {
	const { mapName, authorName, islandCode, category, youtubeLink } = req.body;
	const requestedMap = req.params.mapName;
	const youtubeUrl = youtubeLink.slice(32, youtubeLink.length);
	if (!req.file) {
		Submission.update({ code: requestedMap }, { name: mapName, author: authorName, code: islandCode, category: category, youtubeLink: youtubeUrl}, function() {
		});
	} else {
		cloudinary.uploader.upload(req.file.path, function(result) {
			const securePhoto = result.url.slice(0,4) + 's' + result.url.slice(4,result.url.length);
			Submission.update({ code: requestedMap }, { $set: { photo: securePhoto }}, function() {
			});
		});
		Submission.update({ code: requestedMap }, { name: mapName, author: authorName, code: islandCode, category: category, youtubeLink: youtubeUrl}, function() {
		});
	}
	res.redirect('/admin/editsubmission/' + requestedMap);
}

const handleApprove = (req, res, Submission, Map) => {
	const requestedMap = req.params.mapName;
	Submission.find({}, function(err, foundMaps) {
		foundMaps.forEach(function(map) {
			const storedCode = map.code;
			if (requestedMap === storedCode) {
				Submission.find({ name: map.name }, function(err, result) {
					const results = result[0];
					const approved = new Map({
						name: results.name,
						author: results.author,
						code: results.code,
						photo: results.photo,
						category: results.category,
						date: results.date,
						views: results.views,
						bio: results.bio,
						youtubeLink: results.youtubeLink
					});
					approved.save();
				});
				Submission.remove({ name: map.name }, function() {
				});
			}
		});
	});
	res.redirect('/admin/submittedmaps');
}

const handleDeleteSubmitted = (req, res, Submission) => {
	const requestedMap = req.params.mapName;
	Submission.find({}, function(err, foundMaps) {
		foundMaps.forEach(function(map) {
			const storedCode = map.code;
			if (requestedMap === storedCode) {
				Submission.remove({ name: map.name }, function() {
				});
				res.redirect('/admin/submittedmaps');
			}
		});
	});
}

module.exports = {
	handleSubmittedGet: handleSubmittedGet,
	handleEditSubmittedGet: handleEditSubmittedGet,
	handleEditSubmitted: handleEditSubmitted,
	handleApprove: handleApprove,
	handleDeleteSubmitted: handleDeleteSubmitted
};