import loggerFactory from '../utils/logging';
const config: {
	host: string;
	port: string;
	mongoDbName: string;
	mongoDbUrl: string;
	redisPort: number;
	swaggerUrl: string;
	mongoDbPoolSize: 15;
	production: boolean;
	enableSwagger: boolean;
	nodeEnv: string;
} = <any>{
	port: 80,
	production: false,
	nodeEnv: 'development'
};

const logger = loggerFactory.getLogger('Config');

if (process.env.APP_HOST) {
	config.host = process.env.APP_HOST;
} else {
	logger.error('Missing parameter: APP_PORT! Exitißng...');
	process.exit(1);
}
if (process.env.APP_PORT) {
	config.port = process.env.APP_PORT;
} else {
	logger.error('Missing parameter: APP_PORT! Exitißng...');
	process.exit(1);
}

if (process.env.MONGO_DB_NAME) {
	config.mongoDbName = process.env.MONGO_DB_NAME;
} else {
	logger.error('Missing parameter: MONGO_DB_NAME! Exiting...');
	process.exit(1);
}

if (process.env.MONGO_DB_URL) {
	config.mongoDbUrl = process.env.MONGO_DB_URL;
} else {
	logger.error('Missing parameter: MONGO_DB_URL! Exiting...');
	process.exit(1);
}

if (process.env.SWAGGER_URL) {
	config.swaggerUrl = process.env.SWAGGER_URL;
} else {
	logger.error('Missing parameter: SWAGGER_URL! Exiting...');
	process.exit(1);
}

if (process.env.ENABLE_SWAGGER) {
	config.enableSwagger = (process.env.ENABLE_SWAGGER + '').toLowerCase() === 'true';
}

if (process.env.NODE_ENV) {
	config.nodeEnv = process.env.NODE_ENV;
}

logger.info(
	'----------------------------------------------------------------------------'
);
logger.info('Config for the app: %o', config);
logger.info(
	'----------------------------------------------------------------------------'
);

export default config;