const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const _ = require('lodash');
const multer = require('multer');
const rp = require("request-promise");
const cheerio = require("cheerio");

const upload = multer({ dest: 'public/uploads'});

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/maps', express.static('public'));
app.use('/all', express.static('public'));

mongoose.connect('mongodb://localhost:27017/fortniteMapsDB', {useNewUrlParser: true});

const mapsSchema = {
	name: String,
	author: String,
	code: String,
	photo: String,
	category: String,
	date: Date,
	views: Number,
	bio: String
};

const Map = mongoose.model("Map", mapsSchema);

app.get('/', function(req, res) {
	Map.find({}, function(err, foundMaps) {
		if(!err) {
			res.render('home', { 
				tilesDisplay: foundMaps, 
				headingDisplay: "Fortnite Creative Codes", 
				headingImage: "heading-image-default", 
				siteBackground: "background_header_main" 
			});
		}
	});
});

app.get('/maps/:mapName', function(req, res) {
	const requestedMap = req.params.mapName;
	Map.find({}, function(err, foundMaps) {
		foundMaps.forEach(function(map) {
			const storedCode = map.code;
			if (requestedMap === storedCode) {
				Map.update({ name: map.name }, { $inc: { views: 1 }}, function(err, result) {
				});
				res.render('map', { 
					map: map, 
					siteBackground: "background_header_main" 
				});
			}
		});
	});
});

app.get('/all', function(req, res) {
	const sortBy = req.query.sortby;
	if (sortBy === "views") {
		Map.find({}, function(err, foundMaps) {
			const newMaps = foundMaps.sort(function(a, b) {
			  a = a.views;
			  b = b.views;
			  return a>b ? -1 : a<b ? 1 : 0;
			});
			if(!err) {
				res.render('maps', { 
					newestActive: "hvr-underline-reveal", 
					viewsActive: "underline-active", 
					tilesDisplay: newMaps, 
					headingDisplay: "All", 
					headingImage: "heading-image", 
					siteBackground: "background_header_main" 
				});
			}
		});	
	} else {
		Map.find({}, function(err, foundMaps) {
			const newMaps = foundMaps.sort(function(a, b) {
			  a = a.date;
			  b = b.date;
			  return a>b ? -1 : a<b ? 1 : 0;
			});
			if(!err) {
				res.render('maps', { 
					newestActive: "underline-active", 
					viewsActive: "hvr-underline-reveal", 
					tilesDisplay: newMaps, 
					headingDisplay: "All", 
					headingImage: "heading-image", 
					siteBackground: "background_header_main" 
				});
			}
		});
	}
});

app.get('/obstacle-parkour', function(req, res) {
	const sortBy = req.query.sortby;
	if (sortBy === "views") {
		Map.find({category: "obstacle-parkour"}, function(err, foundMaps) {
			const newMaps = foundMaps.sort(function(a, b) {
			  a = a.views;
			  b = b.views;
			  return a>b ? -1 : a<b ? 1 : 0;
			});
			if(!err) {
				res.render('maps', { 
					newestActive: "", 
					viewsActive: "underline-active", 
					tilesDisplay: newMaps, 
					headingDisplay: "Obstacle & Parkour", 
					headingImage: "heading-image-freefall", 
					siteBackground: "background_header_main" 
				});
			}
		});
	} else {
		Map.find({category: "obstacle-parkour"}, function(err, foundMaps) {
			const newMaps = foundMaps.sort(function(a, b) {
			  a = a.date;
			  b = b.date;
			  return a>b ? -1 : a<b ? 1 : 0;
			});
			if(!err) {
				res.render('maps', { 
					newestActive: "underline-active", 
					viewsActive: "", 
					tilesDisplay: newMaps, 
					headingDisplay: "Obstacle & Parkour", 
					headingImage: "heading-image-freefall", 
					siteBackground: "background_header_main" 
				});
			}
		});
	}
});

app.get('/racing', function(req, res) {
	const sortBy = req.query.sortby;
	if (sortBy === "views") {
		Map.find({category: "racing"}, function(err, foundMaps) {
			const newMaps = foundMaps.sort(function(a, b) {
			  a = a.views;
			  b = b.views;
			  return a>b ? -1 : a<b ? 1 : 0;
			});
			if(!err) {
				res.render('maps', { 
					newestActive: "", 
					viewsActive: "underline-active", 
					tilesDisplay: newMaps, 
					headingDisplay: "Racing", 
					headingImage: "heading-image-racing", 
					siteBackground: "background_header_main" 
				});
			}
		});
	} else {
		Map.find({category: "racing"}, function(err, foundMaps) {
			const newMaps = foundMaps.sort(function(a, b) {
			  a = a.date;
			  b = b.date;
			  return a>b ? -1 : a<b ? 1 : 0;
			});
			if(!err) {
				res.render('maps', { 
					newestActive: "underline-active", 
					viewsActive: "", 
					tilesDisplay: newMaps, 
					headingDisplay: "Racing", 
					headingImage: "heading-image-racing", 
					siteBackground: "background_header_main" 
				});
			}
		});
	}
});

app.get('/minigame', function(req, res) {
	const sortBy = req.query.sortby;
	if (sortBy === "views") {
		Map.find({category: "minigame"}, function(err, foundMaps) {
			const newMaps = foundMaps.sort(function(a, b) {
			  a = a.views;
			  b = b.views;
			  return a>b ? -1 : a<b ? 1 : 0;
			});
			if(!err) {
				res.render('maps', { 
					newestActive: "", 
					viewsActive: "underline-active", 
					tilesDisplay: newMaps, 
					headingDisplay: "Minigame", 
					headingImage: "heading-image-multiplayer", 
					siteBackground: "background_header_main" 
				});
			}
		});
	} else {
		Map.find({category: "minigame"}, function(err, foundMaps) {
			const newMaps = foundMaps.sort(function(a, b) {
			  a = a.date;
			  b = b.date;
			  return a>b ? -1 : a<b ? 1 : 0;
			});
			if(!err) {
				res.render('maps', { 
					newestActive: "underline-active", 
					viewsActive: "", 
					tilesDisplay: newMaps, 
					headingDisplay: "Minigame", 
					headingImage: "heading-image-multiplayer", 
					siteBackground: "background_header_main" 
				});
			}
		});
	}
});

app.get('/battle-arena', function(req, res) {
	const sortBy = req.query.sortby;
	if (sortBy === "views") {
		Map.find({category: "battle-arena"}, function(err, foundMaps) {
			const newMaps = foundMaps.sort(function(a, b) {
			  a = a.views;
			  b = b.views;
			  return a>b ? -1 : a<b ? 1 : 0;
			});
			if(!err) {
				res.render('maps', { 
					newestActive: "", 
					viewsActive: "underline-active", 
					tilesDisplay: newMaps, 
					headingDisplay: "Battle Arena", 
					headingImage: "heading-image-multiplayer", 
					siteBackground: "background_header_main" 
				});
			}
		});
	} else {
		Map.find({category: "battle-arena"}, function(err, foundMaps) {
			const newMaps = foundMaps.sort(function(a, b) {
			  a = a.date;
			  b = b.date;
			  return a>b ? -1 : a<b ? 1 : 0;
			});
			if(!err) {
				res.render('maps', { 
					newestActive: "underline-active", 
					viewsActive: "", 
					tilesDisplay: newMaps, 
					headingDisplay: "Battle Arena", 
					headingImage: "heading-image-multiplayer", 
					siteBackground: "background_header_main" 
				});
			}
		});
	}
});

app.get('/edit-courses', function(req, res) {
	const sortBy = req.query.sortby;
	if (sortBy === "views") {
		Map.find({category: "edit-courses"}, function(err, foundMaps) {
			const newMaps = foundMaps.sort(function(a, b) {
			  a = a.views;
			  b = b.views;
			  return a>b ? -1 : a<b ? 1 : 0;
			});
			if(!err) {
				res.render('maps', { 
					newestActive: "", 
					viewsActive: "underline-active", 
					tilesDisplay: newMaps, 
					headingDisplay: "Edit Courses", 
					headingImage: "heading-image-edit", 
					siteBackground: "background_header_main" 
				});
			}
		});
	} else {
		Map.find({category: "edit-courses"}, function(err, foundMaps) {
			const newMaps = foundMaps.sort(function(a, b) {
			  a = a.date;
			  b = b.date;
			  return a>b ? -1 : a<b ? 1 : 0;
			});
			if(!err) {
				res.render('maps', { 
					newestActive: "underline-active", 
					viewsActive: "", 
					tilesDisplay: newMaps, 
					headingDisplay: "Edit Courses", 
					headingImage: "heading-image-edit", 
					siteBackground: "background_header_main" 
				});
			}
		});
	}
});

app.get('/creative-builds', function(req, res) {
	const sortBy = req.query.sortby;
	if (sortBy === "views") {
		Map.find({category: "creative-builds"}, function(err, foundMaps) {
			const newMaps = foundMaps.sort(function(a, b) {
			  a = a.views;
			  b = b.views;
			  return a>b ? -1 : a<b ? 1 : 0;
			});
			if(!err) {
				res.render('maps', { 
					newestActive: "", 
					viewsActive: "underline-active", 
					tilesDisplay: newMaps, 
					headingDisplay: "Creative Builds", 
					headingImage: "heading-image", 
					siteBackground: "background_header_main" 
				});
			}
		});
	} else {
		Map.find({category: "creative-builds"}, function(err, foundMaps) {
			const newMaps = foundMaps.sort(function(a, b) {
			  a = a.date;
			  b = b.date;
			  return a>b ? -1 : a<b ? 1 : 0;
			});
			if(!err) {
				res.render('maps', { 
					newestActive: "underline-active", 
					viewsActive: "", 
					tilesDisplay: newMaps, 
					headingDisplay: "Creative Builds", 
					headingImage: "heading-image", 
					siteBackground: "background_header_main" 
				});
			}
		});
	}
});

app.get('/popular', function(req, res) {
	Map.find({}, function(err, foundMaps) {
		const newMaps = foundMaps.sort(function(a, b) {
		  a = a.views;
		  b = b.views;
		  return a>b ? -1 : a<b ? 1 : 0;
		});
		if(!err) {
			res.render('maps_filter', { 
				tilesDisplay: newMaps, 
				headingDisplay: "Popular", 
				headingImage: "heading-image-sniper", 
				siteBackground: "background_header_main" 
			});
		}
	});
});

app.get('/new', function(req, res) {
	Map.find({}, function(err, foundMaps) {
		let newMaps = foundMaps.sort(function(a, b) {
			return b.date - a.date;
		});
		if(!err) {
			res.render('maps_filter', { 
				tilesDisplay: newMaps, 
				headingDisplay: "New", 
				headingImage: "heading-image-zombies", 
				siteBackground: "background_header_main" 
			});
		}
	});
});

app.get('/submit', function(req, res) {
	res.render('submit', { 
		headingDisplay: "Submit An Island", 
		headingImage: "heading-image-submit", 
		siteBackground: "background_header_submit" 
	});
});

app.post('/search', function(req, res) {
	searchInput = req.body.searchInput;
	Map.find({name: {$regex: searchInput, $options: "$i"}}, function(err, foundMaps) {
		if(!err) {
			res.render('maps_filter', { 
				tilesDisplay: foundMaps, 
				headingDisplay: "Search results for: " + searchInput, 
				headingImage: "heading-image", 
				siteBackground: "background_header_main" 
			});
		}
	});
});

app.post('/submit', upload.single('mapPhoto'), function(req, res) {
	const mapName = req.body.mapName;
	const authorName = req.body.authorName;
	const islandCode = req.body.islandCode;
	const category = req.body.category;
	const date = new Date();
	const filePath = req.file.path.substring(7);
	if (!req.file) {
		console.log("no file recieved");
	} else {
		console.log('file received');
	}
	const map = new Map({
		name: mapName,
		author: authorName,
		code: islandCode,
		photo: filePath,
		category: category,
		date: date,
		views: 1,
		bio: "default"
	});
	Map.find({code: islandCode}, function(err, foundMaps) {
		if(!err) {
			if (foundMaps.length !== 0) {
				console.log("Map already in database");
			} else {
				console.log("Map is okay to add");
				const options = {
				  uri: `https://fortnite.com/fn/` + islandCode,
				  transform: function (body) {
				    return cheerio.load(body);
				  }
				};
				rp(options)
				.then(($) => {
					const bio = $('.island-header-tagline').text();
					Map.update({ code: islandCode }, { $set: { bio: bio }}, function(err, result) {
						// console.log(result);
					});
				})
				.catch((err) => {
					console.log(err);
				});
				map.save();
			}
		}
	});
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});