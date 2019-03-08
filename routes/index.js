const express = require('express');
const router = express.Router();
const Submission = require('../models/submission');
const Map = require('../models/map');
const multer = require('multer');
const rp = require('request-promise');
const cloudinary = require('cloudinary');
const cheerio = require('cheerio');
const nodeMailer = require('nodemailer');

const upload = multer({ dest: 'public/uploads'});

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET
});

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/login');
};

let renderOptions = {
	newSort: 'hvr_grow hvr-circle-to-top',
	popularSort: 'hvr_grow hvr-circle-to-top',
	obstacleParkour: 'hvr_grow hvr-circle-to-top', // category_active rotate
	racing: 'hvr_grow hvr-circle-to-top',
	minigame: 'hvr_grow hvr-circle-to-top',
	battleArena: 'hvr_grow hvr-circle-to-top',
	editCourses: 'hvr_grow hvr-circle-to-top',
	creativeBuilds: 'hvr_grow hvr-circle-to-top',
	submitIsland: 'hvr_underline_reveal',
	contact: 'hvr_underline_reveal',
	hide_navbar_sort: '',
	newestActive: 'underline_active', // underline_active
	viewsActive: 'hvr_underline_reveal', //hvr_underline_reveal
	tilesDisplay: [], // newMaps
	headingDisplay: '', // Obstacle & Parkour
	headingImage: 'heading_image_freefall', 
	siteBackground: 'background_header_main',
	adminTitle: 'Live Maps',
	selectOp: '',
	selectRacing: '',
	selectMg: '',
	selectBa: '',
	selectEc: '',
	selectCb: '',
	adminView: 'live_maps',
	adminLoginMessage: ''
};

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

module.exports = function(passport) {

	router.get('/', function(req, res) {
		res.redirect('/new');
	});

	router.get('/obstacle', function(req, res) {
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
	});

	router.get('/racing', function(req, res) {
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
	});

	router.get('/minigame', function(req, res) {
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
	});

	router.get('/pvp', function(req, res) {
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
	});

	router.get('/practice', function(req, res) {
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
	});

	router.get('/creative', function(req, res) {
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
	});

	router.get('/popular', function(req, res) {
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
	});

	router.get('/new', function(req, res) {
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
	});

	router.get('/maps/:mapName', function(req, res) {
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
	});

	router.get('/contact', function(req, res) {
		renderOptions.hide_navbar_sort = 'nav_hide';
		renderOptions.contact = 'underline_active';
		renderOptions.siteBackground = 'background_header_submit';
		renderOptions.headingDisplay = 'Contact';
		res.render('contact', renderOptions);
		setTimeout(function() {
			renderOptions.hide_navbar_sort = '';
			renderOptions.siteBackground = 'background_header_main';
			renderOptions.contact = 'hvr_underline_reveal';
		}, 100);
	});

	router.get('/submit', function(req, res) {
		renderOptions.hide_navbar_sort = 'nav_hide';
		renderOptions.submitIsland = 'underline_active';
		renderOptions.siteBackground = 'background_header_submit';
		renderOptions.headingDisplay = 'Submit Island';
		res.render('submit', renderOptions);
		setTimeout(function() {
			renderOptions.hide_navbar_sort = '';
			renderOptions.siteBackground = 'background_header_main';
			renderOptions.submitIsland = 'hvr_underline_reveal';
		}, 100);
	});

	router.get('/submitsuccess', function(req, res) {
		renderOptions.hide_navbar_sort = 'nav_hide';
		renderOptions.submitIsland = 'underline_active';
		renderOptions.siteBackground = 'background_header_submit';
		renderOptions.headingDisplay = 'Map Successfully Submitted!';
		res.render('submit_success', renderOptions);
		setTimeout(function() {
			renderOptions.hide_navbar_sort = '';
			renderOptions.siteBackground = 'background_header_main';
			renderOptions.submitIsland = 'hvr_underline_reveal';
		}, 100);
	});

	router.get('/submitfailure', function(req, res) {
		renderOptions.hide_navbar_sort = 'nav_hide';
		renderOptions.submitIsland = 'underline_active';
		renderOptions.siteBackground = 'background_header_submit';
		renderOptions.headingDisplay = 'Map Already Submitted.';
		res.render('submit_failure', renderOptions);
		setTimeout(function() {
			renderOptions.hide_navbar_sort = '';
			renderOptions.siteBackground = 'background_header_main';
			renderOptions.submitIsland = 'hvr_underline_reveal';
		}, 100);
	});

	router.post('/search', function(req, res) {
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
	});

	router.post('/contact', function(req, res) {
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
			html: 'from: ' + contactName + '<br> (' + contactEmail + ') <br>' + contactMessage // html body
		};
		transporter.sendMail(mailOptions, () => {
			res.redirect('contact');
		});
	});

	router.post('/submit', upload.single('mapPhoto'), function(req, res) {
		const mapName = req.body.mapName;
		const authorName = req.body.authorName;
		const islandCode = req.body.islandCode;
		const category = req.body.category;
		const youtubeLink = req.body.youtubeLink;
		const youtubeUrl = youtubeLink.slice(32, youtubeLink.length);
		const date = new Date();
    
		const submission = new Submission({
			name: mapName,
			author: authorName,
			code: islandCode,
			photo: '',
			category: category,
			date: date,
			views: 1,
			bio: 'default',
			youtubeLink: youtubeUrl
		});
		Map.find({code: islandCode}, function(err, foundMaps) {
			if(!err) {
				if (foundMaps.length !== 0) {
					res.redirect('submitfailure');
				} else {
					const options = {
						uri: 'https://fortnite.com/fn/' + islandCode,
						transform: function (body) {
							return cheerio.load(body);
						}
					};
					rp(options)
						.then(($) => {
							const bio = $('.island-header-tagline').text();
							Submission.update({ code: islandCode }, { $set: { bio: bio }}, function() {
							});
						})
						.catch((err) => {
							console.log(err);
						});
					cloudinary.uploader.upload(req.file.path, function(result) {
						const securePhoto = result.url.slice(0,4) + 's' + result.url.slice(4,result.url.length);
						Submission.update({ code: islandCode }, { $set: { photo: securePhoto }}, function() {
						});
					});
					submission.save();
					res.redirect('submitsuccess');
				}
			}
		});
	});

	// ADMIN PORTAL

	router.get('/login', function(req, res) {
		res.render('admin_login', renderOptions);
	});

	router.get('/admin', isAuthenticated, function(req, res) {
		Map.find({}, function(err, foundMaps) {
			const newMaps = sortNew(foundMaps);
			if (!err) {
				renderOptions.tilesDisplay = newMaps;
				renderOptions.adminLoginMessage = '';
				res.render('admin_portal', renderOptions);
			}
		});
	});

	router.get('/admin/livemaps', isAuthenticated, function(req, res) {
		renderOptions.adminTitle = 'Live Maps';
		Map.find({}, function(err, foundMaps) {
			const newMaps = sortNew(foundMaps);
			if(!err) {
				renderOptions.tilesDisplay = newMaps;
				renderOptions.adminView = 'live_maps';
				res.render('admin_portal', renderOptions);
			}
		});
	});

	router.get('/admin/submittedmaps', isAuthenticated, function(req, res) {
		renderOptions.adminTitle = 'Submitted Maps';
		Submission.find({}, function(err, foundMaps) {
			const newMaps = sortNew(foundMaps);
			if(!err) {
				renderOptions.tilesDisplay = newMaps;
				renderOptions.adminView = 'submitted_maps';
				res.render('admin_portal', renderOptions);
			}
		});
	});

	router.get('/admin/editsubmission/:mapName', isAuthenticated, function(req, res) {
		const requestedMap = req.params.mapName;
		const currentMaps = [];
		Submission.find({}, function(err, foundMaps) {
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
					renderOptions.adminTitle = 'Submitted Maps';
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
	});

	router.get('/admin/editlive/:mapName', isAuthenticated, function(req, res) {
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
	});

	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});

	router.post('/login', passport.authenticate('login', {
		successRedirect: '/admin',
		failureRedirect: '/login',
		failureFlash: true
	}));

	router.post('/admin/editsubmission/:mapName', upload.single('mapPhoto'), function(req, res) {
		const requestedMap = req.params.mapName;
		const mapName = req.body.mapName;
		const authorName = req.body.authorName;
		const islandCode = req.body.islandCode;
		const category = req.body.category;
		const youtubeLink = req.body.youtubeLink;
		const youtubeUrl = youtubeLink.slice(32, youtubeLink.length);
    
		if (!req.file) {
			Submission.update({ code: requestedMap }, { name: mapName, author: authorName, code: islandCode, category: category, youtubeLink: youtubeUrl}, function() {
			});
		} else {
			cloudinary.uploader.upload(req.file.path, function(result) {
				const securePhoto = result.url.slice(0,4) + 's' + result.url.slice(4,result.url.length);
				Submission.update({ code: requestedMap }, { $set: { photo: securePhoto }}, function() {
				});
			});
			Submission.update({ code: requestedMap }, { name: mapName, author: authorName, code: islandCode, category: category, youtubeLink: youtubeUrl}, function() {
			});
		}
		res.redirect('/admin/editsubmission/' + requestedMap);
	});

	router.post('/admin/editlive/:mapName', upload.single('mapPhoto'), function(req, res) {
		const requestedMap = req.params.mapName;
		const mapName = req.body.mapName;
		const authorName = req.body.authorName;
		const islandCode = req.body.islandCode;
		const category = req.body.category;
		const youtubeLink = req.body.youtubeLink;
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
	});

	router.post('/admin/approve/:mapName', upload.single('mapPhoto'), function(req, res) {
		const requestedMap = req.params.mapName;
		Submission.find({}, function(err, foundMaps) {
			foundMaps.forEach(function(map) {
				const storedCode = map.code;
				if (requestedMap === storedCode) {
					Submission.find({ name: map.name }, function(err, result) {
						const results = result[0];
						const approved = new Map({
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
					Submission.remove({ name: map.name }, function() {
					});
				}
			});
		});
		res.redirect('/admin/submittedmaps');
	});

	router.post('/admin/archive/:mapName', upload.single('mapPhoto'), function(req, res) {
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
	});

	router.post('/admin/deletesubmission/:mapName', function(req, res) {
		const requestedMap = req.params.mapName;
		Submission.find({}, function(err, foundMaps) {
			foundMaps.forEach(function(map) {
				const storedCode = map.code;
				if (requestedMap === storedCode) {
					Submission.remove({ name: map.name }, function() {
					});
					res.redirect('/admin/submittedmaps');
				}
			});
		});
	});

	router.post('/admin/deletelive/:mapName', function(req, res) {
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
	});
	return router;
};