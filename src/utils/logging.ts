import loggerFactory, { configure } from 'log4js';

if (!process.env.LOGGER_CONFIG) {
	console.log('Missing LOGGER_CONFIG in environment');
	process.exit(1);
} else {
	configure(JSON.parse(process.env.LOGGER_CONFIG));
}

export default loggerFactory;
