import Validator from 'fastest-validator';
import { ValidationError } from '../../exceptions/ValidationError';
import { IHotel } from '../../models/Hotel';

const hotelSchema: any = {
	name: {
		type: 'string',
		min: 1
	},
	price: {
		type: 'number',
		min: 1
	},
	city: {
		type: 'string',
		min: 1
	},
	availability: {
		type: 'array',
		items: {
			type: 'object',
			props: {
				from: {
					type: 'date'
				},
				to: {
					type: 'date'
				}
			}
		}
	}
};

const validator = new Validator();
const validateCreate = validator.compile(hotelSchema);

export const validateCreateHotel = async (request: IHotel): Promise<any> => {
	const isValidationPassed: any = validateCreate(request);
	if (typeof isValidationPassed === 'boolean') {
		return isValidationPassed;
	} else {
		throw new ValidationError(isValidationPassed);
	}
};