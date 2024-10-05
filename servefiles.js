//fake cdn server for experiment
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 4000;
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8787');
	//	Replace with the origin of the request
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});
app.all('/*', (req, res) => {
	const requestedPath = req.params[0];
	if (!requestedPath) {
		res.status(400).json('filePath required');
		return;
	}
	try {
		const fullPath = path.resolve(__dirname, requestedPath);
		if (!fullPath.startsWith(path.resolve(__dirname))) {
			return res.status(403).send('Access denied');
		}
		fs.stat(fullPath, (err, stats) => {
			if (err || !stats.isFile()) {
				return res.status(404).send('File not found');
			}
			res.sendFile(fullPath);
		});
	} catch (err) {
		res.status(500).json('Error');
		console.log(err);
	}
});
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
