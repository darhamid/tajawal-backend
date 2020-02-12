// import 'mocha';
// import chai from 'chai';
// import { MilestoneController } from './../../src/controllers/milestone.controller';
// import { FormulaService } from './../../src/services/FormullaService';
// import { FormulaProcessor } from '../../src/utils/FormullaProcessor';
// import { ValidationError } from '../../src/exceptions/ValidationError';
// import { MilestoneService } from '../../src/services/MilestoneService';
// import { KafkaHelper } from '../../src/utils/KafkaHelper';
// import config from '../../src/config';
// import { NotificationService } from '../../src/services/NotificationService';
// import { ServerError } from './../../src/exceptions/ServerError';

// chai.use(require('sinon-chai'));
// const expect = chai.expect;
// const httpMocks = require('node-mocks-http');
// const sinon = require('sinon');
// // tslint:disable-next-line: quotemark

// const kafkaConfig = {
// 	clientId: config.kafkaClientId,
// 	brokers: [`${config.kafkaHost}:${config.kafkaPort}`],
// 	logLevel: 2 // ERROR
// };

// // const kafkaHelper = new KafkaHelper(kafkaConfig, config.kafkaClientId, config.redisHost, config.redisPort);

// const milestone = {
// 	_id: "5db186d85319ca007a87768e",
// 	user_id: "abdulhamid",
// 	type: "rewards_added",
// 	source: "chellange",
// 	points: 105,
// 	milestoneId: "milestone100",
// 	createdAt: "2019-10-24T11:11:20.249Z",
// 	updatedAt: "2019-10-24T11:11:20.249Z",
// 	__v: 0
// };

// const formulaData = {
// 	_id: 'test@1.0.0',
// 	type: 'test',
// 	version: '1.0.0',
// 	isEnabled: true,
// 	milestones: [
// 		{
// 			id: "milestone100",
// 			title: "You've earned your first 100 points.💯",
// 			message: "Great start! 🙂",
// 			expression: "{{previousValue}} < {{stastics.milestoneValue}} && {{currentValue}} >= {{stastics.milestoneValue}}",
// 			stastics: {
// 				milestoneValue: 100
// 			}
// 		},
// 		{
// 			id: "milestone500",
// 			title: "You've earned your first 500 points.✔",
// 			message: "Well done! You're getting the hang of it.😉",
// 			expression: "{{previousValue}} < {{stastics.milestoneValue}} && {{currentValue}} >= {{stastics.milestoneValue}}",
// 			stastics: {
// 				milestoneValue: 500
// 			}
// 		},
// 	],
// 	createdAt: '2019-10-24T11:41:15.055Z',
// 	updatedAt: '2019-10-24T11:41:15.055Z',
// 	__v: 0
// };

// const kafkaMilestoneData = {
// 	name: 'test',
// 	time: Date.now(),
// 	data: {
// 		type: 'test',
// 		version: '1.0.0',
// 		user_id: 'test',
// 		rewards_from: 'practice',
// 		params: {
// 			previousValue: 98,
// 			currentValue: 105,
// 			points: 7
// 		}
// 	}
// };

// const milestoneAchieved = {
// 	results: [{
// 		id: "milestone100",
// 		title: "You've earned your first 100 points.💯",
// 		message: "Great start! 🙂",
// 		value: true
// 	},
// 	{
// 		id: "milestone500",
// 		title: "You've earned your first 500 points.✔",
// 		message: "Well done! You're getting the hang of it.😉",
// 		value: false
// 	}]
// };
// const eventData: any = {
// 	name: 'test',
// 	time: Date.now(),
// 	value: {
// 		type: 'test',
// 		version: '1.0.0',
// 		user_id: 'test',
// 		rewards_from: 'practice',
// 		params: {
// 			previousValue: 98,
// 			currentValue: 105,
// 			points: 7
// 		}
// 	}
// };


// describe('Co-learn Milestone Controller test', () => {
// 	afterEach(() => {
// 		sinon.restore();
// 	});

// 	const processor = new FormulaProcessor();
// 	const formulaService = new FormulaService(processor);
// 	const milestoneService = new MilestoneService();
// 	const notificationService = new NotificationService();
// 	const controller = new MilestoneController(milestoneService, formulaService, notificationService);

// 	it('Save Milestone - Internal server error!', async () => {
// 		sinon.stub(formulaService, 'processMilestoneAchievement').rejects(new ServerError('Internal server error'));
// 		try {
// 			await controller.processMilestones(kafkaMilestoneData);
// 		} catch (error) {
// 			expect(error).not.equal(undefined);
// 			expect(error.type).to.equal('server_error');
// 			expect(error.statusCode).to.equal(500);
// 			expect(error.message).to.equal('Internal server error');
// 		}
// 	});

// 	it('Save Milestone - Validation error!', async () => {
// 		const validationError = [{
// 			type: 'string',
// 			field: 'source',
// 			message: 'source is required',
// 		}];
// 		sinon.stub(formulaService, 'evaluate').resolves(milestoneAchieved);
// 		sinon.stub(milestoneService, 'findUserMileStone').resolves(undefined);
// 		sinon.stub(milestoneService, 'add').rejects(new ValidationError(validationError));
// 		try {
// 			await controller.processMilestones(kafkaMilestoneData);
// 		} catch (error) {
// 			expect(error.statusCode).to.equal(400);
// 			expect(error.type).to.equal('invalid_request');
// 			expect(error.validations).not.to.have.length(0);
// 		}
// 	});

// 	it('Save Milestone - No milestone is achieved!', async () => {
// 		try {
// 			const data = await controller.processMilestones(undefined);
// 			expect(data).to.equal(false);
// 		} catch (error) {
// 			expect(error).to.equal(undefined);
// 		}
// 	});

// 	it('Save Milestone - Save milestone data!', async () => {
// 		sinon.stub(formulaService, 'processMilestoneAchievement').resolves(milestoneAchieved.results[0]);
// 		sinon.stub(milestoneService, 'findUserMileStone').resolves(milestone);
// 		sinon.stub(milestoneService, 'add').resolves(milestone);
// 		sinon.stub(notificationService, 'sendNotification').resolves(true);
// 		try {
// 			const data = await controller.processMilestones(kafkaMilestoneData);
// 			expect(data).not.to.equal(undefined);
// 			expect(data).deep.equals(milestone);
// 		} catch (error) {
// 			expect(error).to.equal(undefined);
// 		}
// 	});
// });
