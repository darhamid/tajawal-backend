import loggerFactory, { configure } from 'log4js';

if (!process.env.LOGGER_CONFIG) {
	console.log('Missing LOGGER_CONFIG in environment ... setting logger config');
	process.env.LOGGER_CONFIG = `{"appenders":{"out":{"type":"stdout","layout":{"type":"pattern","pattern":"%[[%d] [%p] %c - %G{correlationId}%] - %m%n"}}},"categories":{"default":{"appenders":["out"],"level":"info"}}}`;
	configure(JSON.parse(process.env.LOGGER_CONFIG));
} else {
	configure(JSON.parse(process.env.LOGGER_CONFIG));
}

export default loggerFactory;
