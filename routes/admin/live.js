const handleLiveGet = (req, res, renderOptions, Map, sortNew) => {
	renderOptions.adminTitle = 'Live Maps';
	Map.find({}, function(err, foundMaps) {
		const newMaps = sortNew(foundMaps);
		if(!err) {
			renderOptions.tilesDisplay = newMaps;
			renderOptions.adminView = 'live_maps';
			res.render('admin_portal', renderOptions);
		}
	});
}

const handleEditLiveGet = (req, res, renderOptions, Map) => {
	const requestedMap = req.params.mapName;
	const currentMaps = [];
	Map.find({}, function(err, foundMaps) {
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
				renderOptions.adminTitle = 'Live Maps';
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

const handleEditLive = (req, res, Map, cloudinary) => {
	const { mapName, authorName, islandCode, category, youtubeLink } = req.body;
	const requestedMap = req.params.mapName;
	const youtubeUrl = youtubeLink.slice(32, youtubeLink.length);
	if (!req.file) {
		Map.update({ code: requestedMap }, { name: mapName, author: authorName, code: islandCode, category: category, youtubeLink: youtubeUrl}, function() {
		});
	} else {
		cloudinary.uploader.upload(req.file.path, function(result) {
			const securePhoto = result.url.slice(0,4) + 's' + result.url.slice(4,result.url.length);
			Map.update({ code: requestedMap }, { $set: { photo: securePhoto }}, function() {
			});
		});
		Map.update({ code: requestedMap }, { name: mapName, author: authorName, code: islandCode, category: category, youtubeLink: youtubeUrl}, function() {
		});
	}
	res.redirect('/admin/editlive/' + requestedMap);
}

const handleArchive = (req, res, Map, Submission) => {
	const requestedMap = req.params.mapName;
	Map.find({}, function(err, foundMaps) {
		foundMaps.forEach(function(map) {
			const storedCode = map.code;
			if (requestedMap === storedCode) {
				Map.find({ name: map.name }, function(err, result) {
					const results = result[0];
					const approved = new Submission({
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
				Map.remove({ name: map.name }, function() {
				});
			}
		});
	});
	res.redirect('/admin/livemaps');
}

const handleDeleteLive = (req, res, Map) => {
	const requestedMap = req.params.mapName;
	Map.find({}, function(err, foundMaps) {
		foundMaps.forEach(function(map) {
			const storedCode = map.code;
			if (requestedMap === storedCode) {
				Map.remove({ name: map.name }, function() {
				});
				res.redirect('/admin/livemaps');
			}
		});
	});
}

module.exports = {
	handleLiveGet: handleLiveGet,
	handleEditLiveGet: handleEditLiveGet,
	handleEditLive: handleEditLive,
	handleArchive: handleArchive,
	handleDeleteLive: handleDeleteLive
};