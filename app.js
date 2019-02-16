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
          submitIsland: "hvr_underline_reveal",
          contact: "hvr_underline_reveal",
          hide_navbar_sort: "nav_hide",
          newestActive: "hvr_underline_reveal", 
          viewsActive: "underline_active",
          map: map, 
          siteBackground: "background_header_main" 
        });
      }
    });
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
    hide_navbar_sort: "nav_hide",
    newestActive: "", 
    viewsActive: "",
  	headingDisplay: "Submit An Island", 
  	headingImage: "heading_image_submit", 
  	siteBackground: "background_header_submit"
	});
});

app.get('/contact', function(req, res) {
  res.render('contact', {
    newSort: "hvr-circle-to-top",
    popularSort: "hvr-circle-to-top",
    obstacleParkour: "hvr-circle-to-top",
    racing: "hvr-circle-to-top",
    minigame: "hvr-circle-to-top",
    battleArena: "hvr-circle-to-top",
    editCourses: "hvr-circle-to-top",
    creativeBuilds: "hvr-circle-to-top",
    submitIsland: "hvr_underline_reveal",
    contact: "underline_active", 
    hide_navbar_sort: "nav_hide",
    newestActive: "", 
    viewsActive: "",
    headingDisplay: "Submit An Island", 
    headingImage: "heading_image_submit", 
    siteBackground: "background_header_submit"
  });
});

app.post('/search', function(req, res) {
	searchInput = req.body.searchInput;
	Map.find({name: {$regex: searchInput, $options: "$i"}}, function(err, foundMaps) {
		if(!err && searchInput !== "" && foundMaps.length !== 0) {
			res.render('maps_search', { 
        newSort: "hvr_grow hvr-circle-to-top",
        popularSort: "hvr_grow hvr-circle-to-top",
        obstacleParkour: "hvr_grow hvr-circle-to-top",
        racing: "hvr_grow hvr-circle-to-top",
        minigame: "hvr_grow hvr-circle-to-top",
        battleArena: "hvr_grow hvr-circle-to-top",
        editCourses: "hvr_grow hvr-circle-to-top",
        creativeBuilds: "hvr_grow hvr-circle-to-top",
        submitIsland: "hvr_underline_reveal",
        contact: "hvr_underline_reveal",
        hide_navbar_sort: "nav_hide",
        newestActive: "underline_active", 
        viewsActive: "hvr_underline_reveal", 
        tilesDisplay: foundMaps, 
        headingDisplay: "Search results for: " + searchInput, 
        headingImage: "heading_image", 
        siteBackground: "background_header_main" 
      });
		} else if(!err && searchInput!== "") {
      res.render('no_results', { 
        newSort: "hvr_grow hvr-circle-to-top",
        popularSort: "hvr_grow hvr-circle-to-top",
        obstacleParkour: "hvr_grow hvr-circle-to-top",
        racing: "hvr_grow hvr-circle-to-top",
        minigame: "hvr_grow hvr-circle-to-top",
        battleArena: "hvr_grow hvr-circle-to-top",
        editCourses: "hvr_grow hvr-circle-to-top",
        creativeBuilds: "hvr_grow hvr-circle-to-top",
        submitIsland: "hvr_underline_reveal",
        contact: "hvr_underline_reveal",
        hide_navbar_sort: "nav_hide",
        newestActive: "", 
        viewsActive: "",
        tilesDisplay: foundMaps, 
        headingDisplay: "No results for: " + searchInput, 
        headingImage: "heading_image", 
        siteBackground: "background_header_main" 
      });
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
  // console.log(req.body.contactName, req.body.contactEmail, req.body.contactSubject, req.body.contactMessage);
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