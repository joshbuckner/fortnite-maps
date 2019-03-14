const handleContactGet = (req, res, renderOptions) => {
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
}

const handleContact = (req, res, nodeMailer) => {
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
}

module.exports = {
	handleContactGet: handleContactGet,
	handleContact: handleContact
};