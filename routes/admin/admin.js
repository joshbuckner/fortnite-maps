const handleAdminGet = (req, res, renderOptions, Map, sortNew) => {
	Map.find({}, function(err, foundMaps) {
		const newMaps = sortNew(foundMaps);
		if (!err) {
			renderOptions.tilesDisplay = newMaps;
			renderOptions.adminLoginMessage = '';
			res.render('admin_portal', renderOptions);
		}
	});
}

module.exports = {
	handleAdminGet: handleAdminGet
};