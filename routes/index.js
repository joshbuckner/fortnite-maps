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

//import routes
const category = require('./category');
const maps = require('./maps');
const contact = require('./contact');
const submit = require('./submit');
const search = require('./search');
const admin = require('./admin/admin');
const live = require('./admin/live');
const submitted = require('./admin/submitted');

module.exports = function(passport) {
	router.get('/', (req, res) => { res.redirect('/new') });
	router.get('/obstacle', (req, res) => { category.handleObstacleGet(req, res, renderOptions, Map, sortNew, sortPopular) });
	router.get('/racing', (req, res) => { category.handleRacingGet(req, res, renderOptions, Map, sortNew, sortPopular) });
	router.get('/minigame', (req, res) => { category.handleMinigameGet(req, res, renderOptions, Map, sortNew, sortPopular) });
	router.get('/pvp', (req, res) => { category.handlePvpGet(req, res, renderOptions, Map, sortNew, sortPopular) });
	router.get('/practice', (req, res) => { category.handlePracticeGet(req, res, renderOptions, Map, sortNew, sortPopular) });
	router.get('/creative', (req, res) => { category.handleCreativeGet(req, res, renderOptions, Map, sortNew, sortPopular) });
	router.get('/popular', (req, res) => { category.handlePopularGet(req, res, renderOptions, Map, sortPopular) });
	router.get('/new', (req, res) => { category.handleNewGet(req, res, renderOptions, Map, sortNew) });
	router.get('/maps/:mapName', (req, res) => { maps.handleMapsGet(req, res, renderOptions, Map) });
	router.get('/contact', (req, res) => { contact.handleContactGet(req, res, renderOptions) });
	router.get('/submit', (req, res) => { submit.handleSubmitGet(req, res, renderOptions) });
	router.get('/submitsuccess', (req, res) => { submit.handleSubmitSuccessGet(req, res, renderOptions) });
	router.get('/submitfailure', (req, res) => { submit.handleSubmitFailureGet(req, res, renderOptions) });
	router.post('/search', (req, res) => { search.handleSearch(req, res, renderOptions, Map) });
	router.post('/contact', (req, res) => { contact.handleContact(req, res, nodeMailer)});
	router.post('/submit', upload.single('mapPhoto'), (req, res) => { submit.handleSubmit(req, res, renderOptions, Map, Submission, cheerio, cloudinary, rp) });

	// ADMIN PORTAL
	router.get('/login', (req, res) => { res.render('admin_login', renderOptions) });
	router.get('/admin', isAuthenticated, (req, res) => { admin.handleAdminGet(req, res, renderOptions, Map, sortNew) });
	router.get('/admin/livemaps', isAuthenticated, (req, res) => { live.handleLiveGet(req, res, renderOptions, Map, sortNew) });
	router.get('/admin/submittedmaps', isAuthenticated, (req, res) => { submitted.handleSubmittedGet(req, res, renderOptions, Submission, sortNew) });
	router.get('/admin/editsubmission/:mapName', isAuthenticated, (req, res) => { submitted.handleEditSubmittedGet(req, res, renderOptions, Submission) });
	router.get('/admin/editlive/:mapName', isAuthenticated, (req, res) => { live.handleEditLiveGet(req, res, renderOptions, Map) });
	router.get('/signout', (req, res) => { req.logout(); res.redirect('/login'); });
	router.post('/login', passport.authenticate('login', { successRedirect: '/admin', failureRedirect: '/login', failureFlash: true }));
	router.post('/admin/editsubmission/:mapName', upload.single('mapPhoto'), (req, res) => { submitted.handleEditSubmitted(req, res, Submission, cloudinary) });
	router.post('/admin/editlive/:mapName', upload.single('mapPhoto'), (req, res) => { live.handleEditLive(req, res, Map, cloudinary) });
	router.post('/admin/approve/:mapName', upload.single('mapPhoto'), (req, res) => { submitted.handleApprove(req, res, Submission, Map) });
	router.post('/admin/archive/:mapName', upload.single('mapPhoto'), (req, res) => { live.handleArchive(req, res, Map, Submission) });
	router.post('/admin/deletesubmission/:mapName', (req, res) => { submitted.handleDeleteSubmitted(req, res, Submission) });
	router.post('/admin/deletelive/:mapName', (req, res) => { live.handleDeleteLive(req, res, Map) });
	return router;
};