const handleMapsGet = (req, res, renderOptions, Map) => {
	const requestedMap = req.params.mapName;
	const currentMaps = [];
	renderOptions.hide_navbar_sort = 'nav_hide';
	Map.find({}, function(err, foundMaps) {
		foundMaps.forEach(function(map) {
			const storedCode = map.code;
			if (requestedMap === storedCode) {
				Map.update({ name: map.name }, { $inc: { views: 1 }}, function() {
				});
				currentMaps.push(map);
				renderOptions.map = map;
				renderOptions.youtubeLink = map.youtubeLink;
				res.render('map', renderOptions);
			}
		});
		if (currentMaps.length === 0) {
			res.render('404', renderOptions);
		}
	});
	setTimeout(function() {
		renderOptions.hide_navbar_sort = '';
	}, 100);
}

module.exports = {
	handleMapsGet: handleMapsGet
};