const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const _ = require('lodash');
const multer = require('multer');
const rp = require("request-promise");
const cheerio = require("cheerio");
const nodeMailer = require('nodemailer');

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
	bio: String,
  youtubeLink: String
};

const Map = mongoose.model("Map", mapsSchema);

app.get('/', function(req, res) {
	Map.find({}, function(err, foundMaps) {
		if(!err) {
			res.redirect('/popular');
		}
	});
});

let renderOptions = {
  newSort: "hvr_grow hvr-circle-to-top",
  popularSort: "hvr_grow hvr-circle-to-top",
  obstacleParkour: "hvr_grow hvr-circle-to-top", // category_active rotate
  racing: "hvr_grow hvr-circle-to-top",
  minigame: "hvr_grow hvr-circle-to-top",
  battleArena: "hvr_grow hvr-circle-to-top",
  editCourses: "hvr_grow hvr-circle-to-top",
  creativeBuilds: "hvr_grow hvr-circle-to-top",
  submitIsland: "hvr_underline_reveal",
  contact: "hvr_underline_reveal",
  hide_navbar_sort: "",
  newestActive: "underline_active", // underline_active
  viewsActive: "hvr_underline_reveal", //hvr_underline_reveal
  tilesDisplay: [], // newMaps
  headingDisplay: "", // Obstacle & Parkour
  headingImage: "heading_image_freefall", 
  siteBackground: "background_header_main"
}

function sortPopular(e) {
  return e.sort(function(a, b) {
    a = a.views;
    b = b.views;
    return a>b ? -1 : a<b ? 1 : 0;
  });
}

function sortNew(e) {
  return e.sort(function(a, b) {
    a = a.date;
    b = b.date;
    return a>b ? -1 : a<b ? 1 : 0;
  });
}

app.get('/obstacle-parkour', function(req, res) {
	const sortBy = req.query.sortby;
  renderOptions.obstacleParkour = "category_active rotate";
	if (sortBy === "views") {
		Map.find({category: "obstacle-parkour"}, function(err, foundMaps) {
			const newMaps = sortPopular(foundMaps);
			if(!err) {
        renderOptions.tilesDisplay = newMaps;
        renderOptions.viewsActive = "underline_active";
        renderOptions.newestActive = "hvr_underline_reveal";
				res.render('maps', renderOptions);
			}
		});
	} else {
		Map.find({category: "obstacle-parkour"}, function(err, foundMaps) {
			const newMaps = sortNew(foundMaps);
			if(!err) {
        renderOptions.tilesDisplay = newMaps;
        renderOptions.viewsActive = "hvr_underline_reveal";
        renderOptions.newestActive = "underline_active";
				res.render('maps', renderOptions);
			}
		});
	} 
  setTimeout(function() {
    renderOptions.obstacleParkour = "hvr_grow hvr-circle-to-top";
  }, 10);
});

app.get('/racing', function(req, res) {
	const sortBy = req.query.sortby;
  renderOptions.racing = "category_active rotate";
	if (sortBy === "views") {
		Map.find({category: "racing"}, function(err, foundMaps) {
			const newMaps = sortPopular(foundMaps);
			if(!err) {
        renderOptions.tilesDisplay = newMaps;
        renderOptions.viewsActive = "underline_active";
        renderOptions.newestActive = "hvr_underline_reveal";
        res.render('maps', renderOptions);
			}
		});
	} else {
		Map.find({category: "racing"}, function(err, foundMaps) {
			const newMaps = sortNew(foundMaps);
			if(!err) {
        renderOptions.tilesDisplay = newMaps;
        renderOptions.viewsActive = "hvr_underline_reveal";
        renderOptions.newestActive = "underline_active";
        res.render('maps', renderOptions);
			}
		});
	}
  setTimeout(function() {
    renderOptions.racing = "hvr_grow hvr-circle-to-top";
  }, 10);
});

app.get('/minigame', function(req, res) {
	const sortBy = req.query.sortby;
  renderOptions.minigame = "category_active rotate";
  if (sortBy === "views") {
    Map.find({category: "minigame"}, function(err, foundMaps) {
      const newMaps = sortPopular(foundMaps);
      if(!err) {
        renderOptions.tilesDisplay = newMaps;
        renderOptions.viewsActive = "underline_active";
        renderOptions.newestActive = "hvr_underline_reveal";
        res.render('maps', renderOptions);
      }
    });
  } else {
    Map.find({category: "minigame"}, function(err, foundMaps) {
      const newMaps = sortNew(foundMaps);
      if(!err) {
        renderOptions.tilesDisplay = newMaps;
        renderOptions.viewsActive = "hvr_underline_reveal";
        renderOptions.newestActive = "underline_active";
        res.render('maps', renderOptions);
      }
    });
  }
  setTimeout(function() {
    renderOptions.minigame = "hvr_grow hvr-circle-to-top";
  }, 10);
});

app.get('/battle-arena', function(req, res) {
	const sortBy = req.query.sortby;
  renderOptions.battleArena = "category_active rotate";
  if (sortBy === "views") {
    Map.find({category: "battle-arena"}, function(err, foundMaps) {
      const newMaps = sortPopular(foundMaps);
      if(!err) {
        renderOptions.tilesDisplay = newMaps;
        renderOptions.viewsActive = "underline_active";
        renderOptions.newestActive = "hvr_underline_reveal";
        res.render('maps', renderOptions);
      }
    });
  } else {
    Map.find({category: "battle-arena"}, function(err, foundMaps) {
      const newMaps = sortNew(foundMaps);
      if(!err) {
        renderOptions.tilesDisplay = newMaps;
        renderOptions.viewsActive = "hvr_underline_reveal";
        renderOptions.newestActive = "underline_active";
        res.render('maps', renderOptions);
      }
    });
  }
  setTimeout(function() {
    renderOptions.battleArena = "hvr_grow hvr-circle-to-top";
  }, 10);
});

app.get('/edit-courses', function(req, res) {
	const sortBy = req.query.sortby;
  renderOptions.editCourses = "category_active rotate";
  if (sortBy === "views") {
    Map.find({category: "edit-courses"}, function(err, foundMaps) {
      const newMaps = sortPopular(foundMaps);
      if(!err) {
        renderOptions.tilesDisplay = newMaps;
        renderOptions.viewsActive = "underline_active";
        renderOptions.newestActive = "hvr_underline_reveal";
        res.render('maps', renderOptions);
      }
    });
  } else {
    Map.find({category: "edit-courses"}, function(err, foundMaps) {
      const newMaps = sortNew(foundMaps);
      if(!err) {
        renderOptions.tilesDisplay = newMaps;
        renderOptions.viewsActive = "hvr_underline_reveal";
        renderOptions.newestActive = "underline_active";
        res.render('maps', renderOptions);
      }
    });
  }
  setTimeout(function() {
    renderOptions.editCourses = "hvr_grow hvr-circle-to-top";
  }, 10);
});

app.get('/creative-builds', function(req, res) {
	const sortBy = req.query.sortby;
  renderOptions.creativeBuilds = "category_active rotate";
  if (sortBy === "views") {
    Map.find({category: "creative-builds"}, function(err, foundMaps) {
      const newMaps = sortPopular(foundMaps);
      if(!err) {
        renderOptions.tilesDisplay = newMaps;
        renderOptions.viewsActive = "underline_active";
        renderOptions.newestActive = "hvr_underline_reveal";
        res.render('maps', renderOptions);
      }
    });
  } else {
    Map.find({category: "creative-builds"}, function(err, foundMaps) {
      const newMaps = sortNew(foundMaps);
      if(!err) {
        renderOptions.tilesDisplay = newMaps;
        renderOptions.viewsActive = "hvr_underline_reveal";
        renderOptions.newestActive = "underline_active";
        res.render('maps', renderOptions);
      }
    });
  }
  setTimeout(function() {
    renderOptions.creativeBuilds = "hvr_grow hvr-circle-to-top";
  }, 10);
});

app.get('/popular', function(req, res) {
  renderOptions.popularSort = "category_active rotate";
  renderOptions.hide_navbar_sort = "nav_hide";
	Map.find({}, function(err, foundMaps) {
		const newMaps = sortPopular(foundMaps);
		if(!err) {
      renderOptions.tilesDisplay = newMaps;
      res.render('maps_filter', renderOptions);
		}
	});
  setTimeout(function() {
    renderOptions.popularSort = "hvr_grow hvr-circle-to-top";
    renderOptions.hide_navbar_sort = "";
  }, 10);
});

app.get('/new', function(req, res) {
	renderOptions.newSort = "category_active rotate";
  renderOptions.hide_navbar_sort = "nav_hide";
  Map.find({}, function(err, foundMaps) {
    const newMaps = sortNew(foundMaps);
    if(!err) {
      renderOptions.tilesDisplay = newMaps;
      res.render('maps_filter', renderOptions);
    }
  });
  setTimeout(function() {
    renderOptions.newSort = "hvr_grow hvr-circle-to-top";
    renderOptions.hide_navbar_sort = "";
  }, 10);
});

app.get('/maps/:mapName', function(req, res) {
  const requestedMap = req.params.mapName;
  const currentMaps = [];
  renderOptions.hide_navbar_sort = "nav_hide";
  Map.find({}, function(err, foundMaps) {
    foundMaps.forEach(function(map) {
      const storedCode = map.code;
      if (requestedMap === storedCode) {
        Map.update({ name: map.name }, { $inc: { views: 1 }}, function(err, result) {
        });
        currentMaps.push(map);
        renderOptions.map = map;
        console.log(map.youtubeLink);
        renderOptions.youtubeLink = map.youtubeLink;
        res.render('map', renderOptions);
      }
    });
    if (currentMaps.length === 0) {
        res.render('404', renderOptions);
      }
  });
  setTimeout(function() {
    renderOptions.hide_navbar_sort = "";
  }, 10);
});

app.get('/submit', function(req, res) {
  renderOptions.hide_navbar_sort = "nav_hide";
  renderOptions.submitIsland = "underline_active";
  renderOptions.siteBackground = "background_header_submit";
  res.render('submit', renderOptions);
  setTimeout(function() {
    renderOptions.hide_navbar_sort = "";
    renderOptions.siteBackground = "background_header_main";
    renderOptions.submitIsland = "hvr_underline_reveal";
  }, 10);
});

app.get('/contact', function(req, res) {
  renderOptions.hide_navbar_sort = "nav_hide";
  renderOptions.contact = "underline_active";
  renderOptions.siteBackground = "background_header_submit";
  res.render('contact', renderOptions);
  setTimeout(function() {
    renderOptions.hide_navbar_sort = "";
    renderOptions.siteBackground = "background_header_main";
    renderOptions.contact = "hvr_underline_reveal";
  }, 10);
});

app.post('/search', function(req, res) {
	searchInput = req.body.searchInput;
	Map.find({name: {$regex: searchInput, $options: "$i"}}, function(err, foundMaps) {
    renderOptions.hide_navbar_sort = "nav_hide";
    renderOptions.tilesDisplay = foundMaps;
		if(!err && searchInput !== "" && foundMaps.length !== 0) {
      renderOptions.headingDisplay = "Search results for: " + searchInput;
      res.render('maps_search', renderOptions);
		} else if(!err && searchInput!== "") {
      renderOptions.headingDisplay = "No results for: " + searchInput;
      res.render('no_results', renderOptions);
    }
	});
});

app.post('/contact', function(req, res) {
  const contactName = req.body.contactName;
  const contactEmail = req.body.contactEmail;
  const contactSubject = req.body.contactSubject;
  const contactMessage = req.body.contactMessage;
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'fortnitecreativecodes1@gmail.com',
      pass: 'welikefortnite'
    }
  });
  let mailOptions = {
    from: contactEmail, // sender address
    to: 'joshgbuckner@gmail.com', // list of receivers
    subject: contactSubject, // Subject line
    text: contactMessage, // plain text body
    html: '<b>NodeJS Email Tutorial</b>' // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
      res.redirect('contact');
    });
});

app.post('/submit', upload.single('mapPhoto'), function(req, res) {
	const mapName = req.body.mapName;
	const authorName = req.body.authorName;
	const islandCode = req.body.islandCode;
	const category = req.body.category;
  const youtubeLink = req.body.youtubeLink;
  const youtubeUrl = youtubeLink.slice(32, youtubeLink.length);
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
		bio: "default",
    youtubeLink: youtubeUrl
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