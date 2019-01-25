const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const _ = require('lodash');
const multer = require('multer');

const upload = multer({ dest: 'public/uploads'});

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/maps', express.static('public'));

mongoose.connect('mongodb://localhost:27017/fortniteMapsDB', {useNewUrlParser: true});

const mapsSchema = {
	name: String,
	author: String,
	code: String,
	photo: String,
	category: String,
	date: Date,
	views: Number
};

const Map = mongoose.model("Map", mapsSchema);




app.get('/', function(req, res) {
	Map.find({}, function(err, foundMaps) {
		if(!err) {
			
			res.render('home', { tilesDisplay: foundMaps, headingDisplay: "Fortnite Creative Codes" });
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
					console.log(result);
				});
				console.log (map.views);
				res.render('userMap', { map: map, headingDisplay: map.category });
				// console.log(map);
			}
		});
	});
});

app.get('/all', function(req, res) {
	Map.find({}, function(err, foundMaps) {
		if(!err) {
			res.render('maps', { tilesDisplay: foundMaps, headingDisplay: "All Maps" });
		}
	});
});

app.get('/obstacle-parkour', function(req, res) {
	Map.find({category: "obstacle-parkour"}, function(err, foundMaps) {
		if(!err) {
			res.render('maps', { tilesDisplay: foundMaps, headingDisplay: "Obstacle & Parkour Maps" });
		}
	});
});

app.get('/racing', function(req, res) {
	Map.find({category: "racing"}, function(err, foundMaps) {
		if(!err) {
			res.render('maps', { tilesDisplay: foundMaps, headingDisplay: "Racing Maps" });
		}
	});
});

app.get('/multiplayer', function(req, res) {
	Map.find({category: "multiplayer"}, function(err, foundMaps) {
		if(!err) {
			res.render('maps', { tilesDisplay: foundMaps, headingDisplay: "Multiplayer Maps" });
		}
	});
});

app.get('/edit-courses', function(req, res) {
	Map.find({category: "edit-courses"}, function(err, foundMaps) {
		if(!err) {
			res.render('maps', { tilesDisplay: foundMaps, headingDisplay: "Edit Courses" });
		}
	});
});

app.get('/creative-builds', function(req, res) {
	Map.find({category: "creative-builds"}, function(err, foundMaps) {
		if(!err) {
			res.render('maps', { tilesDisplay: foundMaps, headingDisplay: "Creative Builds" });
		}
	});
});

app.get('/submit', function(req, res) {
	// console.log("submit clicked");
	res.render('submit', {headingDisplay: "Submit A Map"});
});

app.post('/submit', upload.single('mapPhoto'), function(req, res) {
	const mapName = req.body.mapName;
	const authorName = req.body.authorName;
	const islandCode = req.body.islandCode;
	const category = req.body.category;
	const date = new Date();

	// const 
	// host = req.host;
	const filePath = req.file.path.substring(7);
	// console.log(filePath);


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
		views: 1
	});

	

	Map.find({code: islandCode}, function(err, foundMaps) {
		if(!err) {
			if (foundMaps.length !== 0) {
				console.log("Map already in database");
			} else {
				console.log("Map is okay to add");
				console.log(map);
				map.save();
				// res.redirect('/maps/' + map.code);
				// , { map: map, headingDisplay: map.name }
			}
		}
	});
});








app.listen(3000, function() {
  console.log("Server started on port 3000");
});