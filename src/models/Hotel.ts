import mongoose, { Model } from 'mongoose';
import { IAppModel } from './AppModel';
import loggerFactory from '../utils/logging';

const logger: any = loggerFactory.getLogger('HotelSchema');

export interface IHotel extends IAppModel {
	name: string;
	price: number;
	city: string;
	availability: IHotelAvailability[];
}

export interface IHotelAvailability {
	from: Date;
	to: Date;
}

const availabilitySchema = new mongoose.Schema({
	from: {
		type: Date,
		required: true
	},
	to: {
		type: Date,
		required: true
	}
}, { _id : false });

availabilitySchema.index({ from: 1, to: 1 }, { background: true, sparse: true });

/**
 * Hotel Schema
 */
const hotelSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	availability: [availabilitySchema]
	}, {
	timestamps: true
});

hotelSchema.index({ name: 1, price: 1, city: 1, createdAt: 1, availability : 1 }, { background: true, sparse: true });

// tslint:disable-next-line: variable-name
export const Hotel: Model<IHotel> = <any>mongoose.model<IHotel>('Hotel', hotelSchema);