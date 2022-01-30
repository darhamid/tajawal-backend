
import { Hotel, IHotel } from '../models/Hotel';
import validators from '../utils/validators';
import { defaultPaging } from '../models/entities/Paging';
import loggerFactory from '../utils/logging';
const logger = loggerFactory.getLogger('HotelService');

export class HotelService {

	async add(hotel: IHotel): Promise<IHotel> {
		await this.validate(hotel);
		return Hotel.create(hotel);
	}

	async update(query: object, hotel: IHotel): Promise<IHotel> {
		await this.validate(hotel);
		return Hotel.update(query, hotel);
	}

	async get(id: string): Promise<IHotel | null> {
		return Hotel.findOne({_id: id});
	}

	async delete(id: string): Promise<IHotel | null> {
		return Hotel.findOneAndDelete({ _id: id });
	}

	async list(condition: any = {}, paging = defaultPaging) {
		const query = this.constructQuery(condition);
		const { index, size: limit } = paging;
		const sort = {};
		if (condition.sortBy && condition.orderBy) {
			sort[condition.sortBy] = condition.orderBy === 'desc' ? -1 : 1;
		}
		const skip = index * limit;
		return Hotel.find(query, undefined, { limit, skip }).sort(sort);
	}

	protected async validate(hotel: IHotel) {
		return Promise.resolve(validators.validateCreateHotel(hotel));
	}

	protected constructQuery(condition) {
		const query: any = {};
		if (Object.keys(condition).length) {
			if (condition.name) {
				query.name = new RegExp(condition.name, 'i');
			}
			if (condition.price) {
				query.price = { $lte: condition.price };
			}
			if (condition.city) {
				query.city = new RegExp(condition.city, 'i');
			}
			if (condition.availableFrom && condition.availableTo) {
				query.availability =  {
					$elemMatch: { from: { $gte: new Date(condition.availableFrom) }, to: { $lte: new Date(condition.availableTo) }  }
				};
			} else if (condition.availableFrom && !condition.availableTo) {
				query.availability =  {
					$elemMatch: {  from: { $gte: new Date(condition.availableFrom) }  }
				};
			} else if (condition.availableTo && !condition.availableFrom) {
				query.availability =  {
					$elemMatch: {  to: { $lte: new Date(condition.availableTo) } }
				};
			}
		}
		return query;
	}

}