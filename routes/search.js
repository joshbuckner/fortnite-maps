const handleSearch = (req, res, renderOptions, Map) => {
	const searchInput = req.body.searchInput;
	Map.find({name: {$regex: searchInput, $options: '$i'}}, function(err, foundMaps) {
		renderOptions.hide_navbar_sort = 'nav_hide';
		renderOptions.tilesDisplay = foundMaps;
		if(!err && searchInput !== '' && foundMaps.length !== 0) {
			renderOptions.headingDisplay = 'Search results for: ' + searchInput;
			res.render('maps_search', renderOptions);
		} else if(!err && searchInput!== '') {
			renderOptions.headingDisplay = 'No results for: ' + searchInput;
			res.render('no_results', renderOptions);
		}
	});
}

module.exports = {
	handleSearch: handleSearch
};