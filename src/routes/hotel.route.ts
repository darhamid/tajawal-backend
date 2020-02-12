import { Response, Router, Request } from 'express';
import { ForbiddenError } from '../exceptions/ForbiddenError';
import { HotelService } from '../services/HotelService';
import { HotelController } from '../controllers/hotel.controller';
const router = Router();

export default () => {
	const controller = new HotelController(new HotelService());

	router.route('/')
		.post((req: Request, res: Response, next: (err?: any) => void) => {
			return controller.post(req, res, next);
		})
		.put((req: Request, res: Response, next: (err?: any) => void) => {
			return controller.post(req, res, next);
		})
		.get((req: Request, res: Response, next: (err?: any) => void) => {
			return controller.list(req, res, next);
		});

	router.route('/:id')
		.get((req: Request, res: Response, next: (err?: any) => void) => {
			return controller.get(req, res, next);
		})
		.delete((req: Request, res: Response, next: (err?: any) => void) => {
			return controller.delete(req, res, next);
		});

   	return router;
};