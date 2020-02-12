import 'mocha';
import chai from 'chai';
import { HotelController } from '../../src/controllers/hotel.controller';
import { HotelService } from '../../src/services/HotelService';
import { hotel } from '../data/Hotel';
import { ValidationError } from '../../src/exceptions/ValidationError';

chai.use(require('sinon-chai'));
const expect = chai.expect;
const httpMocks = require('node-mocks-http');
const sinon = require('sinon');
// tslint:disable-next-line: quotemark
const hotelData = hotel();


describe('Tajawal Hotel Controller Test', () => {
	beforeEach(() => {
		//
	});

	afterEach(() => {
		sinon.restore();
	});

	const hotelService = new HotelService();
	const controller = new HotelController(hotelService);

	it('Post Hotel - Should return bad request error if body is not provided!', (done) => {
		const res = httpMocks.createResponse();
		const req = httpMocks.createRequest({
			method: 'GET',
			url: '/hotels',
		});

		controller.post(req, res, (err) => {
			expect(err.statusCode).to.equal(400);
			expect(err.type).to.equal('invalid_request');
			expect(err.message).to.equal('request body is missing');
			done();
		});
	});

	it('Post Hotel - Should return validation error', (done) => {
		const res = httpMocks.createResponse();
		const req = httpMocks.createRequest({
			method: 'POST',
			url: '/hotels',
			body: {
				name : "Hotel Grand Hyatt",
				availability : [
					{
						from : "2020-10-05T11:12:23.000",
						to : "2020-10-10T11:12:23.000"
					},
					{
						from : "2020-10-15T11:12:23.000",
						to : "2020-10-25T11:12:23.000"
					}
				]
			}
		});
		const validationError = [
			{
				type: 'number',
				field: 'price',
				message: 'price is required',
			},
			{
				type: 'string',
				field: 'city',
				message: 'city is required',
			}
		];
		sinon.stub(hotelService, 'add').rejects(new ValidationError(validationError));

		controller.post(req, res, (err) => {
			expect(err.statusCode).to.equal(400);
			expect(err.type).to.equal('invalid_request');
			expect(err.validations).not.to.have.length(0);
			expect(err.validations).deep.equal(validationError);
			done();
		});
	});

	it('Post Hotel - Save hotel positive scenario!', (done) => {
		const data = { ...hotelData };
		delete data._id;
		delete data.__v;
		const res = httpMocks.createResponse();
		const req = httpMocks.createRequest({
			method: 'POST',
			url: '/hotels',
			body: data
		});

		sinon.stub(hotelService, 'add').resolves(hotelData);

		res.json = (obj: any) => {
			expect(obj).to.not.equal(undefined);
			expect(obj).deep.equal(hotelData);
			done();
		};

		controller.post(req, res, (err) => {
			done();
		});
	});

	it('Put Hotel - Update hotel positive scenario!', (done) => {
		const data = { ...hotelData };
		data.price = 800;
		data.city = 'Ajman';
		const res = httpMocks.createResponse();
		const req = httpMocks.createRequest({
			method: 'PUT',
			url: '/hotels',
			body: data
		});

		sinon.stub(hotelService, 'update').resolves(data);

		res.json = (obj: any) => {
			expect(obj).to.not.equal(undefined);
			expect(obj).deep.equal(data);
			done();
		};

		controller.post(req, res, (err) => {
			done();
		});
	});

	it('Get Hotel details - Should return error if id is not provided!', (done) => {
		const res = httpMocks.createResponse();
		const req = httpMocks.createRequest({
			method: 'GET',
			url: '/hotels',
			params: { id: undefined }
		});

		controller.get(req, res, (err) => {
			expect(err).to.not.equals(undefined);
			expect(err.statusCode).to.equal(400);
			expect(err.type).to.equal('invalid_request');
			expect(err.message).to.equals('id is missing in request');
			done();
		});
	});

	it('Get hotel - internal server error!', (done) => {
		const res = httpMocks.createResponse();
		const req = httpMocks.createRequest({
			method: 'GET',
			url: '/hotels',
			params: { id: hotelData._id }
		});

		sinon.stub(hotelService, 'get').rejects(new Error('Internal server error'));

		controller.get(req, res, (err) => {
			expect(err).not.equals(undefined);
			expect(err.type).to.equal('server_error');
			expect(err.statusCode).to.equal(500);
			expect(err.message).equal('Internal server error');
			done();
		});
	});

	it('Get Hotel - Should return the hotel details for id given!',  (done) => {
		const res = httpMocks.createResponse();
		const req = httpMocks.createRequest({
			method: 'GET',
			url: '/hotels',
			params: { id: hotelData._id }
		});

		sinon.stub(hotelService, 'get').resolves(hotelData);

		res.json = (obj: any) => {
			expect(obj).to.not.equals(undefined);
			expect(obj).deep.equal(hotelData);
			done();
		};

		controller.get(req, res, (err) => {
			done(err);
		});
	});

	it('List Hotels - Internal server error', (done) => {
		const res = httpMocks.createResponse();
		const req = httpMocks.createRequest({
			method: 'GET',
			url: '/hotels'
		});

		sinon.stub(hotelService, 'list').rejects(new Error('Internal server error'));

		controller.list(req, res, (err) => {
			expect(err).not.equals(undefined);
			expect(err.type).to.equal('server_error');
			expect(err.statusCode).to.equal(500);
			expect(err.message).equal('Internal server error');
			done();
		});
	});

	it('List Hotels - Should return all the hotels with pagination!',  (done) => {
		const res = httpMocks.createResponse();
		const req = httpMocks.createRequest({
			method: 'GET',
			url: '/hotels'
		});

		sinon.stub(hotelService, 'list').resolves([hotelData]);

		res.json = (obj: any) => {
			expect(obj).to.not.equals(undefined);
			expect(obj).deep.equal([hotelData]);
			done();
		};

		controller.list(req, res, (err) => {
			done(err);
		});
	});

	it('Delete hotel - Should return error if id is not provided!', (done) => {
		const res = httpMocks.createResponse();
		const req = httpMocks.createRequest({
			method: 'GET',
			url: '/hotels'
		});

		controller.delete(req, res, (err) => {
			expect(err).to.not.equals(undefined);
			expect(err.statusCode).to.equal(400);
			expect(err.type).to.equal('invalid_request');
			expect(err.message).to.equals('id is missing in request');
			done();
		});
	});

	it('Delete hotels - internal server error!', (done) => {
		const res = httpMocks.createResponse();
		const req = httpMocks.createRequest({
			method: 'GET',
			url: '/hotels',
			params: { id: hotelData._id }
		});

		sinon.stub(hotelService, 'delete').rejects(new Error('Internal server error'));

		controller.delete(req, res, (err) => {
			expect(err).not.equals(undefined);
			expect(err.type).to.equal('server_error');
			expect(err.statusCode).to.equal(500);
			expect(err.message).equal('Internal server error');
			done();
		});
	});

	it('Delete hotel - positive scenario', (done) => {
		const res = httpMocks.createResponse();
		const req = httpMocks.createRequest({
			method: 'GET',
			url: '/hotels',
			params: { id: hotelData._id }
		});

		sinon.stub(hotelService, 'delete').resolves(hotelData);

		res.json = (obj: any) => {

			expect(obj).to.not.equal(undefined);
			expect(obj).to.deep.equal(hotelData);
			done();
		};

		controller.delete(req, res, (err) => {
			done();
		});
	});
});
