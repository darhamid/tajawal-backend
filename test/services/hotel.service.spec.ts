import 'mocha';
import chai, { assert } from 'chai';

chai.use(require('sinon-chai'));

import sinon from 'sinon';

const expect = chai.expect;

import { HotelService } from '../../src/services/HotelService';
import { hotel } from '../data/Hotel';
import { UnauthorizedError } from '../../src/exceptions/UnauthorizedError';
import { Hotel } from '../../src/models/Hotel';
import mongoose from 'mongoose';

// tslint:disable-next-line: no-big-function
describe('Hotel Service', () => {

	let hotelService: HotelService;
	const _hotel = hotel();

	beforeEach(() => {
		hotelService = new HotelService();
	});

	afterEach(() => {
		sinon.restore();
	});

	it('Should be able to add hotel', async () => {
		try {
			const hotel: any = _hotel;
			sinon.stub(mongoose.Model, "create").resolves(Promise.resolve(_hotel));
			const result = await hotelService.add(hotel);
			expect(result).deep.equals(_hotel);
		} catch (error) {
			expect(error).to.not.equal(undefined);
		}
	});

	it('Should be able to update hotel', async () => {
		try {
			const hotel: any = _hotel;
			sinon.stub(mongoose.Model, "update").resolves(Promise.resolve(_hotel));
			const result = await hotelService.update({_id: hotel._id }, hotel);
			expect(result).deep.equals(_hotel);
		} catch (error) {
			expect(error).to.not.equal(undefined);
		}
	});

	it('Should be able to get hotel', async () => {
		try {
			const _hotel = hotel();
			sinon.stub(mongoose.Model, 'findOne').resolves(Promise.resolve(_hotel));
			const resp = await hotelService.get(_hotel._id);
			expect(resp).to.be.deep.equals(_hotel);
		} catch (error) {
			expect(error).to.not.equal(undefined);
		}
	});

	it('Should be able to delete hotel', async () => {
		try {
			const _hotel = hotel();
			sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(_hotel);
			const resp = await hotelService.delete(_hotel._id);
			expect(resp).not.equals(undefined);
			expect(resp).to.be.deep.equals(_hotel);
		} catch (error) {
			expect(error).to.not.equal(undefined);
		}
	});

	it('Should be able to get all hotels', async () => {
		try {
			const _hotel = hotel();
			sinon.stub(mongoose.Model, 'find').resolves([_hotel]);
			const defaultPaging = { index: 0, size: 10 };
			const condition = { name: 'Hyatt', price: 700, city: 'Dubai', availableFrom: '2020-10-05T11:12:23.000', availableTo: '2020-10-15T11:12:23.000' };
			const resp = await hotelService.list(condition, defaultPaging);
			expect(resp).not.equals(undefined);
			expect(resp.length).not.equals(0);
			expect(resp).to.be.deep.equals([_hotel]);
		} catch (error) {
			expect(error).to.not.equal(undefined);
		}
	});

});