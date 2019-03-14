const handleObstacleGet = (req, res, renderOptions, Map, sortNew, sortPopular) => {
	const sortBy = req.query.sortby;
	renderOptions.obstacleParkour = 'category_active rotate';
	if (sortBy === 'views') {
		Map.find({category: 'Obstacle'}, function(err, foundMaps) {
			const newMaps = sortPopular(foundMaps);
			if(!err) {
				renderOptions.tilesDisplay = newMaps;
				renderOptions.viewsActive = 'underline_active';
				renderOptions.newestActive = 'hvr_underline_reveal';
				res.render('maps', renderOptions);
			}
		});
	} else {
		Map.find({category: 'Obstacle'}, function(err, foundMaps) {
			const newMaps = sortNew(foundMaps);
			if(!err) {
				renderOptions.tilesDisplay = newMaps;
				renderOptions.viewsActive = 'hvr_underline_reveal';
				renderOptions.newestActive = 'underline_active';
				res.render('maps', renderOptions);
			}
		});
	} 
	setTimeout(function() {
		renderOptions.obstacleParkour = 'hvr_grow hvr-circle-to-top';
	}, 100);
}

const handleRacingGet = (req, res, renderOptions, Map, sortNew, sortPopular) => {
	const sortBy = req.query.sortby;
		renderOptions.racing = 'category_active rotate';
		if (sortBy === 'views') {
			Map.find({category: 'Racing'}, function(err, foundMaps) {
				const newMaps = sortPopular(foundMaps);
				if(!err) {
					renderOptions.tilesDisplay = newMaps;
					renderOptions.viewsActive = 'underline_active';
					renderOptions.newestActive = 'hvr_underline_reveal';
					res.render('maps', renderOptions);
				}
			});
		} else {
			Map.find({category: 'Racing'}, function(err, foundMaps) {
				const newMaps = sortNew(foundMaps);
				if(!err) {
					renderOptions.tilesDisplay = newMaps;
					renderOptions.viewsActive = 'hvr_underline_reveal';
					renderOptions.newestActive = 'underline_active';
					res.render('maps', renderOptions);
				}
			});
		}
		setTimeout(function() {
			renderOptions.racing = 'hvr_grow hvr-circle-to-top';
		}, 100);
}

const handleMinigameGet = (req, res, renderOptions, Map, sortNew, sortPopular) => {
	const sortBy = req.query.sortby;
	renderOptions.minigame = 'category_active rotate';
	if (sortBy === 'views') {
		Map.find({category: 'Minigame'}, function(err, foundMaps) {
			const newMaps = sortPopular(foundMaps);
			if(!err) {
				renderOptions.tilesDisplay = newMaps;
				renderOptions.viewsActive = 'underline_active';
				renderOptions.newestActive = 'hvr_underline_reveal';
				res.render('maps', renderOptions);
			}
		});
	} else {
		Map.find({category: 'Minigame'}, function(err, foundMaps) {
			const newMaps = sortNew(foundMaps);
			if(!err) {
				renderOptions.tilesDisplay = newMaps;
				renderOptions.viewsActive = 'hvr_underline_reveal';
				renderOptions.newestActive = 'underline_active';
				res.render('maps', renderOptions);
			}
		});
	}
	setTimeout(function() {
		renderOptions.minigame = 'hvr_grow hvr-circle-to-top';
	}, 100);
}

const handlePvpGet = (req, res, renderOptions, Map, sortNew, sortPopular) => {
	const sortBy = req.query.sortby;
	renderOptions.battleArena = 'category_active rotate';
	if (sortBy === 'views') {
		Map.find({category: 'PvP'}, function(err, foundMaps) {
			const newMaps = sortPopular(foundMaps);
			if(!err) {
				renderOptions.tilesDisplay = newMaps;
				renderOptions.viewsActive = 'underline_active';
				renderOptions.newestActive = 'hvr_underline_reveal';
				res.render('maps', renderOptions);
			}
		});
	} else {
		Map.find({category: 'PvP'}, function(err, foundMaps) {
			const newMaps = sortNew(foundMaps);
			if(!err) {
				renderOptions.tilesDisplay = newMaps;
				renderOptions.viewsActive = 'hvr_underline_reveal';
				renderOptions.newestActive = 'underline_active';
				res.render('maps', renderOptions);
			}
		});
	}
	setTimeout(function() {
		renderOptions.battleArena = 'hvr_grow hvr-circle-to-top';
	}, 100);
}

const handlePracticeGet = (req, res, renderOptions, Map, sortNew, sortPopular) => {
	const sortBy = req.query.sortby;
	renderOptions.editCourses = 'category_active rotate';
	if (sortBy === 'views') {
		Map.find({category: 'Practice'}, function(err, foundMaps) {
			const newMaps = sortPopular(foundMaps);
			if(!err) {
				renderOptions.tilesDisplay = newMaps;
				renderOptions.viewsActive = 'underline_active';
				renderOptions.newestActive = 'hvr_underline_reveal';
				res.render('maps', renderOptions);
			}
		});
	} else {
		Map.find({category: 'Practice'}, function(err, foundMaps) {
			const newMaps = sortNew(foundMaps);
			if(!err) {
				renderOptions.tilesDisplay = newMaps;
				renderOptions.viewsActive = 'hvr_underline_reveal';
				renderOptions.newestActive = 'underline_active';
				res.render('maps', renderOptions);
			}
		});
	}
	setTimeout(function() {
		renderOptions.editCourses = 'hvr_grow hvr-circle-to-top';
	}, 100);
}

const handleCreativeGet = (req, res, renderOptions, Map, sortNew, sortPopular) => {
	const sortBy = req.query.sortby;
	renderOptions.creativeBuilds = 'category_active rotate';
	if (sortBy === 'views') {
		Map.find({category: 'Creative'}, function(err, foundMaps) {
			const newMaps = sortPopular(foundMaps);
			if(!err) {
				renderOptions.tilesDisplay = newMaps;
				renderOptions.viewsActive = 'underline_active';
				renderOptions.newestActive = 'hvr_underline_reveal';
				res.render('maps', renderOptions);
			}
		});
	} else {
		Map.find({category: 'Creative'}, function(err, foundMaps) {
			const newMaps = sortNew(foundMaps);
			if(!err) {
				renderOptions.tilesDisplay = newMaps;
				renderOptions.viewsActive = 'hvr_underline_reveal';
				renderOptions.newestActive = 'underline_active';
				res.render('maps', renderOptions);
			}
		});
	}
	setTimeout(function() {
		renderOptions.creativeBuilds = 'hvr_grow hvr-circle-to-top';
	}, 100);
}

const handlePopularGet = (req, res, renderOptions, Map, sortPopular) => {
	renderOptions.popularSort = 'category_active rotate';
	renderOptions.hide_navbar_sort = 'nav_hide';
	Map.find({}, function(err, foundMaps) {
		const newMaps = sortPopular(foundMaps);
		if(!err) {
			renderOptions.tilesDisplay = newMaps;
			res.render('maps_filter', renderOptions);
		}
	});
	setTimeout(function() {
		renderOptions.popularSort = 'hvr_grow hvr-circle-to-top';
		renderOptions.hide_navbar_sort = '';
	}, 100);
}

const handleNewGet = (req, res, renderOptions, Map, sortNew) => {
	renderOptions.newSort = 'category_active rotate';
	renderOptions.hide_navbar_sort = 'nav_hide';
	Map.find({}, function(err, foundMaps) {
		const newMaps = sortNew(foundMaps);
		if(!err) {
			renderOptions.tilesDisplay = newMaps;
			res.render('maps_filter', renderOptions);
		}
	});
	setTimeout(function() {
		renderOptions.newSort = 'hvr_grow hvr-circle-to-top';
		renderOptions.hide_navbar_sort = '';
	}, 100);
}

module.exports = {
	handleObstacleGet: handleObstacleGet,
	handleRacingGet: handleRacingGet,
	handleMinigameGet: handleMinigameGet,
	handlePvpGet: handlePvpGet,
	handlePracticeGet: handlePracticeGet,
	handleCreativeGet: handleCreativeGet,
	handlePopularGet: handlePopularGet,
	handleNewGet: handleNewGet,
};