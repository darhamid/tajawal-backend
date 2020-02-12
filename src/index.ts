// NPM imports
import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import Http from 'http';
import jwt from 'jsonwebtoken';

// Application imports
import config from './config';
import loggerFactory from './utils/logging';
import initialize from './initializer';
// Routes ...
import defaultRoute from './routes/default.route';
import hotelRoute from './routes/hotel.route';
import { errorHandler } from './utils/middlewares/ErrorHandler';

import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './docs/swag';
import * as path from 'path';
// Intializations
const logger = loggerFactory.getLogger();
const app = express();
const http = Http.createServer(app);

// Swagger UI
const swaggerDocumentJson = swaggerDocument();
swaggerDocumentJson.host = config.swaggerUrl;
if (config.enableSwagger) {
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentJson));
}

// logger
app.use(
	loggerFactory.connectLogger(loggerFactory.getLogger('http'), {
		level: 'auto'
	})
);

app.all('/*', (req, res, next) => {
	// CORS headers
	res.header('Access-Control-Allow-Origin', '*');
	// restrict it to the required domain
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	// Set custom headers for CORS
	res.header(
		'Access-Control-Allow-Headers',
		'Content-type,Accept,X-Access-Token,X-Key,Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.status(200).end();
	} else {
		next();
	}
});

// To avoid client to know about express
app.disable('x-powered-by');

// To avoid 304 content not modified status.
app.disable('etag');

initialize(config).then(_ => {
	app.set('mongoDb', config.mongoDbName);
	// parse application/json
	app.use(bodyParser.json());
	app.use('/', defaultRoute());
	app.use('/hotels', hotelRoute());
	app.use(errorHandler);

	exports.server = http.listen(process.env.PORT || config.port, () => {
		logger.info(`Started on port ${config.port}`);
	});
})
.catch(err => {
	logger.error('Failed to Initialize:', err);
	process.exit(1);
});

process.on('SIGINT', (err) => {
	console.error((new Date()).toUTCString() + ' uncaughtException:', err);
	console.error(err);
	process.exit(1);
});

process.on('uncaughtException', (err) => {
	console.error((new Date()).toUTCString() + ' uncaughtException:', err.message);
	console.error(err.stack);
	process.exit(1);
});
