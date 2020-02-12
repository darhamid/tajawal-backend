import loggerFactory from '../utils/logging';
import mongoose from 'mongoose';

const logger = loggerFactory.getLogger('Initializer');

export default (config: any) => {
	return new Promise((resolve, reject) => {
		mongoose.connect(
			`${config.mongoDbUrl}`,
			{
				poolSize: config.mongoDbPoolSize,
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true
			},
			(err) => {
				if (err) return reject(err);
				mongoose.set('debug', config.mongooseDebug);
				return resolve();
			}
		);
	});
};