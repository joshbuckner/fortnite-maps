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
			res.redirect('/popular');
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
          newSort: "hvr-circle-to-top",
          popularSort: "hvr-circle-to-top",
          obstacleParkour: "hvr-circle-to-top",
          racing: "hvr-circle-to-top",
          minigame: "hvr-circle-to-top",
          battleArena: "hvr-circle-to-top",
          editCourses: "hvr-circle-to-top",
          creativeBuilds: "hvr-circle-to-top",
					map: map, 
					siteBackground: "background_header_main" 
				});
			}
		});
	});
});

// app.get('/all', function(req, res) {
// 	const sortBy = req.query.sortby;
// 	if (sortBy === "views") {
// 		Map.find({}, function(err, foundMaps) {
// 			const newMaps = foundMaps.sort(function(a, b) {
// 			  a = a.views;
// 			  b = b.views;
// 			  return a>b ? -1 : a<b ? 1 : 0;
// 			});
// 			if(!err) {
// 				res.render('maps', { 
// 					newestActive: "hvr_underline_reveal", 
// 					viewsActive: "underline_active", 
// 					tilesDisplay: newMaps, 
// 					headingDisplay: "All", 
// 					headingImage: "heading_image", 
// 					siteBackground: "background_header_main" 
// 				});
// 			}
// 		});	
// 	} else {
// 		Map.find({}, function(err, foundMaps) {
// 			const newMaps = foundMaps.sort(function(a, b) {
// 			  a = a.date;
// 			  b = b.date;
// 			  return a>b ? -1 : a<b ? 1 : 0;
// 			});
// 			if(!err) {
// 				res.render('maps', { 
// 					newestActive: "underline_active", 
// 					viewsActive: "hvr_underline_reveal", 
// 					tilesDisplay: newMaps, 
// 					headingDisplay: "All", 
// 					headingImage: "heading_image", 
// 					siteBackground: "background_header_main" 
// 				});
// 			}
// 		});
// 	}
// });

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
          newSort: "hvr_grow hvr-circle-to-top",
          popularSort: "hvr_grow hvr-circle-to-top",
          obstacleParkour: "category_active rotate",
          racing: "hvr_grow hvr-circle-to-top",
          minigame: "hvr_grow hvr-circle-to-top",
          battleArena: "hvr_grow hvr-circle-to-top",
          editCourses: "hvr_grow hvr-circle-to-top",
          creativeBuilds: "hvr_grow hvr-circle-to-top",
          submitIsland: "hvr_underline_reveal",
          contact: "hvr_underline_reveal",
					newestActive: "hvr_underline_reveal", 
					viewsActive: "underline_active", 
					tilesDisplay: newMaps, 
					headingDisplay: "Obstacle & Parkour", 
					headingImage: "heading_image_freefall", 
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
          newSort: "hvr_grow hvr-circle-to-top",
          popularSort: "hvr_grow hvr-circle-to-top",
          obstacleParkour: "category_active rotate",
          racing: "hvr_grow hvr-circle-to-top",
          minigame: "hvr_grow hvr-circle-to-top",
          battleArena: "hvr_grow hvr-circle-to-top",
          editCourses: "hvr_grow hvr-circle-to-top",
          creativeBuilds: "hvr_grow hvr-circle-to-top",
          submitIsland: "hvr_underline_reveal",
          contact: "hvr_underline_reveal",
					newestActive: "underline_active", 
					viewsActive: "hvr_underline_reveal", 
					tilesDisplay: newMaps, 
					headingDisplay: "Obstacle & Parkour", 
					headingImage: "heading_image_freefall", 
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
          newSort: "hvr_grow hvr-circle-to-top",
          popularSort: "hvr_grow hvr-circle-to-top",
          obstacleParkour: "hvr_grow hvr-circle-to-top",
          racing: "category_active rotate",
          minigame: "hvr_grow hvr-circle-to-top",
          battleArena: "hvr_grow hvr-circle-to-top",
          editCourses: "hvr_grow hvr-circle-to-top",
          creativeBuilds: "hvr_grow hvr-circle-to-top",
          submitIsland: "hvr_underline_reveal",
          contact: "hvr_underline_reveal",
					newestActive: "hvr_underline_reveal", 
					viewsActive: "underline_active", 
					tilesDisplay: newMaps, 
					headingDisplay: "Racing", 
					headingImage: "heading_image_racing", 
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
          newSort: "hvr_grow hvr-circle-to-top",
          popularSort: "hvr_grow hvr-circle-to-top", 
          obstacleParkour: "hvr_grow hvr-circle-to-top",
          racing: "category_active rotate",
          minigame: "hvr_grow hvr-circle-to-top",
          battleArena: "hvr_grow hvr-circle-to-top",
          editCourses: "hvr_grow hvr-circle-to-top",
          creativeBuilds: "hvr_grow hvr-circle-to-top",
          submitIsland: "hvr_underline_reveal",
          contact: "hvr_underline_reveal",
					newestActive: "underline_active", 
					viewsActive: "hvr_underline_reveal", 
					tilesDisplay: newMaps, 
					headingDisplay: "Racing", 
					headingImage: "heading_image_racing", 
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
          newSort: "hvr_grow hvr-circle-to-top",
          popularSort: "hvr_grow hvr-circle-to-top",
          obstacleParkour: "hvr_grow hvr-circle-to-top",
          racing: "hvr_grow hvr-circle-to-top",
          minigame: "category_active rotate",
          battleArena: "hvr_grow hvr-circle-to-top",
          editCourses: "hvr_grow hvr-circle-to-top",
          creativeBuilds: "hvr_grow hvr-circle-to-top",
          submitIsland: "hvr_underline_reveal",
          contact: "hvr_underline_reveal",
					newestActive: "hvr_underline_reveal", 
					viewsActive: "underline_active", 
					tilesDisplay: newMaps, 
					headingDisplay: "Minigame", 
					headingImage: "heading_image_multiplayer", 
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
          newSort: "hvr_grow hvr-circle-to-top",
          popularSort: "hvr_grow hvr-circle-to-top", 
          obstacleParkour: "hvr_grow hvr-circle-to-top",
          racing: "hvr_grow hvr-circle-to-top",
          minigame: "category_active rotate",
          battleArena: "hvr_grow hvr-circle-to-top",
          editCourses: "hvr_grow hvr-circle-to-top",
          creativeBuilds: "hvr_grow hvr-circle-to-top",
          submitIsland: "hvr_underline_reveal",
          contact: "hvr_underline_reveal",
					newestActive: "underline_active", 
					viewsActive: "hvr_underline_reveal", 
					tilesDisplay: newMaps, 
					headingDisplay: "Minigame", 
					headingImage: "heading_image_multiplayer", 
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
          newSort: "hvr_grow hvr-circle-to-top",
          popularSort: "hvr_grow hvr-circle-to-top", 
          obstacleParkour: "hvr_grow hvr-circle-to-top",
          racing: "hvr_grow hvr-circle-to-top",
          minigame: "hvr_grow hvr-circle-to-top",
          battleArena: "category_active rotate",
          editCourses: "hvr_grow hvr-circle-to-top",
          creativeBuilds: "hvr_grow hvr-circle-to-top",
          submitIsland: "hvr_underline_reveal",
          contact: "hvr_underline_reveal",
					newestActive: "hvr_underline_reveal", 
					viewsActive: "underline_active", 
					tilesDisplay: newMaps, 
					headingDisplay: "Battle Arena", 
					headingImage: "heading_image_multiplayer", 
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
          newSort: "hvr_grow hvr-circle-to-top",
          popularSort: "hvr_grow hvr-circle-to-top",
          obstacleParkour: "hvr_grow hvr-circle-to-top",
          racing: "hvr_grow hvr-circle-to-top",
          minigame: "hvr_grow hvr-circle-to-top",
          battleArena: "category_active rotate",
          editCourses: "hvr_grow hvr-circle-to-top",
          creativeBuilds: "hvr_grow hvr-circle-to-top",
          submitIsland: "hvr_underline_reveal",
          contact: "hvr_underline_reveal",
					newestActive: "underline_active", 
					viewsActive: "hvr_underline_reveal", 
					tilesDisplay: newMaps, 
					headingDisplay: "Battle Arena", 
					headingImage: "heading_image_multiplayer", 
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
          newSort: "hvr_grow hvr-circle-to-top",
          popularSort: "hvr_grow hvr-circle-to-top",
          obstacleParkour: "hvr_grow hvr-circle-to-top",
          racing: "hvr_grow hvr-circle-to-top",
          minigame: "hvr_grow hvr-circle-to-top",
          battleArena: "hvr_grow hvr-circle-to-top",
          editCourses: "category_active rotate",
          creativeBuilds: "hvr_grow hvr-circle-to-top",
          submitIsland: "hvr_underline_reveal",
          contact: "hvr_underline_reveal",
					newestActive: "hvr_underline_reveal", 
					viewsActive: "underline_active", 
					tilesDisplay: newMaps, 
					headingDisplay: "Edit Courses", 
					headingImage: "heading_image_edit", 
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
          newSort: "hvr_grow hvr-circle-to-top",
          popularSort: "hvr_grow hvr-circle-to-top",
          obstacleParkour: "hvr_grow hvr-circle-to-top",
          racing: "hvr_grow hvr-circle-to-top",
          minigame: "hvr_grow hvr-circle-to-top",
          battleArena: "hvr_grow hvr-circle-to-top",
          editCourses: "category_active rotate",
          creativeBuilds: "hvr_grow hvr-circle-to-top",
          submitIsland: "hvr_underline_reveal",
          contact: "hvr_underline_reveal",
					newestActive: "underline_active", 
					viewsActive: "hvr_underline_reveal", 
					tilesDisplay: newMaps, 
					headingDisplay: "Edit Courses", 
					headingImage: "heading_image_edit", 
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
          newSort: "hvr_grow hvr-circle-to-top",
          popularSort: "hvr_grow hvr-circle-to-top",
          obstacleParkour: "hvr_grow hvr-circle-to-top",
          racing: "hvr_grow hvr-circle-to-top",
          minigame: "hvr_grow hvr-circle-to-top",
          battleArena: "hvr_grow hvr-circle-to-top",
          editCourses: "hvr_grow hvr-circle-to-top",
          creativeBuilds: "category_active rotate",
					newestActive: "hvr_underline_reveal", 
					viewsActive: "underline_active", 
					tilesDisplay: newMaps, 
					headingDisplay: "Creative Builds", 
					headingImage: "heading_image", 
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
          newSort: "hvr_grow hvr-circle-to-top",
          popularSort: "hvr_grow hvr-circle-to-top",
          obstacleParkour: "hvr_grow hvr-circle-to-top",
          racing: "hvr_grow hvr-circle-to-top",
          minigame: "hvr_grow hvr-circle-to-top",
          battleArena: "hvr_grow hvr-circle-to-top",
          editCourses: "hvr_grow hvr-circle-to-top",
          creativeBuilds: "category_active rotate",
          submitIsland: "hvr_underline_reveal",
          contact: "hvr_underline_reveal",
					newestActive: "underline_active", 
					viewsActive: "hvr_underline_reveal", 
					tilesDisplay: newMaps, 
					headingDisplay: "Creative Builds", 
					headingImage: "heading_image", 
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
        newSort: "hvr_grow hvr-circle-to-top",
        popularSort: "category_active rotate",
        obstacleParkour: "hvr_grow hvr-circle-to-top",
        racing: "hvr_grow hvr-circle-to-top",
        minigame: "hvr_grow hvr-circle-to-top",
        battleArena: "hvr_grow hvr-circle-to-top",
        editCourses: "hvr_grow hvr-circle-to-top",
        creativeBuilds: "hvr_grow hvr-circle-to-top",
        submitIsland: "hvr_underline_reveal",
        contact: "hvr_underline_reveal",
				tilesDisplay: newMaps, 
				headingDisplay: "Popular", 
				headingImage: "heading_image_sniper", 
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
        newSort: "category_active rotate",
        popularSort: "hvr_grow hvr-circle-to-top",
        obstacleParkour: "hvr_grow hvr-circle-to-top",
        racing: "hvr_grow hvr-circle-to-top",
        minigame: "hvr_grow hvr-circle-to-top",
        battleArena: "hvr_grow hvr-circle-to-top",
        editCourses: "hvr_grow hvr-circle-to-top",
        creativeBuilds: "hvr_grow hvr-circle-to-top",
        submitIsland: "hvr_underline_reveal",
        contact: "hvr_underline_reveal",
				tilesDisplay: newMaps, 
				headingDisplay: "New", 
				headingImage: "heading_image_zombies", 
				siteBackground: "background_header_main" 
			});
		}
	});
});

app.get('/submit', function(req, res) {
	res.render('submit', {
  newSort: "hvr-circle-to-top",
    popularSort: "hvr-circle-to-top",
    obstacleParkour: "hvr-circle-to-top",
    racing: "hvr-circle-to-top",
    minigame: "hvr-circle-to-top",
    battleArena: "hvr-circle-to-top",
    editCourses: "hvr-circle-to-top",
    creativeBuilds: "hvr-circle-to-top",
    submitIsland: "underline_active",
    contact: "hvr_underline_reveal", 
		headingDisplay: "Submit An Island", 
		headingImage: "heading_image_submit", 
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
				headingImage: "heading_image", 
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