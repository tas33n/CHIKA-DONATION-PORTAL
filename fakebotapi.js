//Fake bot api endpoint example for experiment
const express = require('express');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const app = express();
const bodyParser = require('body-parser');
const port = 8000;

//You can use your bot's email sending function instead if you want
async function sendEMail(tO, subject, content) {
	const transporter = nodemailer.createTransport({
		host: 'smtp-relay.brevo.com',
		port: 587,
		secure: false,
		auth: {
			user: '7cd7de02@smtp-brevo.com', //Replace it with yours
			pass: 'xsmtpsib-79c156bf994a83c96602d084410842da76d45764cdd7127bd8476795fcebd5-KBjJEtAQ9WwIG8Ds', //And this one too
		},
	});

	const mailOptions = {
		from: `"Chika's subscription" <meherab999plus@gmail.com>`, //your sender email and sender name
		to: tO,
		subject: subject,
		html: content,
	};
	const inf = await transporter.sendMail(mailOptions);
	return inf;
}

app.use(bodyParser.json());
const checkAuth = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	if (authHeader && authHeader.startsWith('Bearer ')) {
		const token = authHeader.split(' ')[1];
		if (token === 'superad') {
			next();
		} else {
			return res.status(403).json({ message: 'Forbidden' });
		}
	} else {
		return res.status(403).json({ message: 'Forbidden' });
	}
};
app.use(checkAuth);
const filesend = (req, res, fullPath) => {
	if (!fullPath.startsWith(path.resolve(__dirname))) {
		return res.status(403).send('Access denied');
	}
	fs.stat(fullPath, (err, stats) => {
		if (err || !stats.isFile()) {
			return res.status(404).send('data not found');
		}
		res.sendFile(fullPath);
	});
};
app.all('/web/api/*', async (req, res) => {
	const par = req.params[0];
	const parts = par.split('/');

	const end = parts[0];
	const end2 = parts[1];
	const end3 = parts[2];
	const data = req.body;
	//do the logics of bot activation

	let fullPath = null;
	try {
		if (end && end == 'me') {
			if (!end2 || !['1', '2', '3'].includes(end2)) {
				res.status(404).json('This id not found');
				return;
			}
			fullPath = path.resolve(__dirname, 'data', `me${end2}.json`);
			filesend(req, res, fullPath);
		} else if (end && end2 && end == 'user') {
			fullPath = path.resolve(__dirname, 'data', 'user.json');
			filesend(req, res, fullPath);
		} else if (end && end2 && end == 'thread') {
			fullPath = path.resolve(__dirname, 'data', 'thread.json');
			filesend(req, res, fullPath);
		} else if (end && end2 && end3 && end == 'active') {
			console.log(data);
			const responsePayload = {
				status: 'success',
				message: `Bots have been successfully activated for this user:${end2}, thread ${end3}`,
			};
			return res.status(200).json(responsePayload);
		} else {
			res.status(400).json({ message: 'Wrong endpoint' });
			return;
		}
	} catch (err) {
		res.status(500).json('Error');
		console.log(err);
	}
});
app.post('/sendmail', async (req, res) => {
	const { to, subject, content } = req.body;
	try {
		if (!to || !subject || !content) {
			res.status(400).json({ Error: 'All params required' });
			return;
		}
		const ress = await sendEMail(to, subject, content);
		if (ress) {
			return res.status(200).json({ status: 'success', infoMessage: ress });
		} else {
			return res.status(404).json({ status: 'failed', message: 'Internal server error' });
		}
	} catch (err) {
		console.log(err);
		res.status(404).json({ Error: err, ErrorMessage: 'Internal server error' });
	}
});
app.listen(port, () => {
	console.log('listening on port', port);
});
