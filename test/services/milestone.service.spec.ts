// import 'mocha';
// import chai, { assert } from 'chai';

// chai.use(require('sinon-chai'));

// import sinon from 'sinon';
// const expect = chai.expect;

// import { MilestoneService } from '../../src/services/MilestoneService';
// import { milestone } from '../data/Milestone';
// import mongoose from 'mongoose';
// import { KafkaHelper } from './../../src/utils/KafkaHelper';

// // tslint:disable-next-line: no-big-function
// describe('Milestone Service', () => {

// 	let kafkaHelper: any;
// 	let milestoneService: MilestoneService;
// 	const _milestone = milestone();

// 	const eventData: any = {
// 		name: 'test',
// 		time: Date.now(),
// 		value: {
// 			type: 'test',
// 			version: '1.0.0',
// 			user_id: 'test',
// 			rewards_from: 'practice',
// 			params: {
// 				previousValue: 98,
// 				currentValue: 105,
// 				points: 7
// 			}
// 		}
// 	};

// 	const returnFunc = (topic = 'defaultTopic', callback): Promise<any> => {
// 		eventData.value = Buffer.from(JSON.stringify(eventData.value));
// 		return callback(eventData);
// 	};

// 	beforeEach(() => {
// 		kafkaHelper = {
// 			consume: sinon.stub().callsFake(returnFunc)
// 		};
// 		milestoneService = new MilestoneService();
// 	});

// 	afterEach(() => {
// 		sinon.restore();
// 	});

// 	const kafkaData = {
// 		name: 'test',
// 		time: Date.now(),
// 		data: {
// 			type: 'test',
// 			version: '1.0.0',
// 			user_id: 'test',
// 			rewards_from: 'practice',
// 			params: {
// 				previousValue: 98,
// 				currentValue: 105,
// 				points: 7
// 			}
// 		}
// 	};

// 	it('Should be able to save new milestone', async () => {
// 		try {
// 			const milestone: any = _milestone;
// 			sinon.stub(mongoose.Model, "create").resolves(Promise.resolve(_milestone));
// 			const result = await milestoneService.add(milestone);
// 			expect(result).deep.equals(_milestone);
// 		} catch (error) {
// 			expect(error).to.not.equal(undefined);
// 		}
// 	});

// 	it('Should be able to find milestone by milestone id', async () => {
// 		try {
// 			const milestone: any = _milestone;
// 			sinon.stub(mongoose.Model, "findOne").resolves(Promise.resolve(_milestone));
// 			const result = await milestoneService.findUserMileStone(milestone.milestoneId, milestone.user_id);
// 			expect(result).deep.equals(_milestone);
// 		} catch (error) {
// 			expect(error).to.not.equal(undefined);
// 		}
// 	});
// });