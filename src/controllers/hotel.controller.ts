
import loggerFactory from '../utils/logging';
import { HotelService } from '../services/HotelService';
import { Response } from 'express';
import { IPaging } from '../models/entities/Paging';
import { ServerError } from '../exceptions/ServerError';
import { InvalidRequestError } from '../exceptions/InvalidRequestError';
import { IHotel } from '../../dist/models/Hotel';
const logger = loggerFactory.getLogger('HotelController');

export class HotelController {

	constructor(protected hotelService: HotelService) {

	}

	async post(req: any, res: Response, next: (err?: any) => void) {
		try {
			const { body } = req;
			logger.info('Add/Update hotel', JSON.stringify(body));
			if (!Object.keys(body).length) {
				return next(new InvalidRequestError('request body is missing', 400));
			}
			body.availability.forEach((dataAvailable: any) => {
				dataAvailable.from = new Date(dataAvailable.from);
				dataAvailable.to = new Date(dataAvailable.to);
			});
			let result: IHotel;
			if (body._id) {
				result = await this.hotelService.update({_id: body._id }, body);
			} else {
				result = await this.hotelService.add(body);
			}
			return res.status(200).json(result);
		} catch (error) {
			return next(error);
		}
	}

	async get(req: any, res: Response, next: (err?: any) => void) {
		try {
			const { params: { id = '' } = {} } = req;
			if (!id) {
				return next(new InvalidRequestError('id is missing in request', 400));
			}
			logger.info(`Get hotel for id :: ${id}`);
			const result = await this.hotelService.get(id);
			return res.status(200).json(result || {});
		} catch (error) {
			return next(new ServerError(error));
		}
	}

	async list(req: any, res: Response, next: (err?: any) => void) {
		try {
			const { query: { name = '', price = 0, city = '', availableFrom = '', availableTo = '', sortBy = 'createdAt', orderBy = 'desc' } } = req;
			const result = await this.hotelService.list({ name, price, city, availableFrom, availableTo, sortBy, orderBy }, this.extractPaging(req.query));
			return res.status(200).json(result);
		} catch (error) {
			return next(new ServerError(error));
		}
	}

	async delete(req: any, res: Response, next: (err?: any) => void) {
		try {
			const { params: { id = '' } = {} } = req;
			if (!id) {
				return next(new InvalidRequestError('id is missing in request', 400));
			}
			logger.info(`Delete hotel with id :: ${id}`);
			const result = await this.hotelService.delete(req.params.id);
			return res.status(200).json(result);
		} catch (error) {
			return next(new ServerError(error));
		}
	}

	extractPaging(object: any) {
		const { index, size } = object;
		let parsedIndex = parseInt(index);
		let parsedSize = parseInt(size);
		if (!parsedIndex || parsedIndex < 1 || isNaN(parsedIndex)) parsedIndex = 0;
		else parsedIndex -= 1;
		if (!parsedSize || parsedSize < 1 || isNaN(parsedSize)) parsedSize = 10;

		return <IPaging>{
			index: parsedIndex,
			size: parsedSize
		};
	}
}
