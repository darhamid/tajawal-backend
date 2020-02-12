
import { AppError } from '../../exceptions/AppError';
import { ServerError } from '../../exceptions/ServerError';
import { Response, Request } from 'express';

export const respondeWithError = (req: Request, res: Response, err: any) => {
	if (err instanceof AppError) {
		res.status(err.getStatusCode()).json(err.getResponse());
	} else {
		const serverError = new ServerError(err, 500);
		res.status(serverError.getStatusCode()).json(serverError.getResponse());
	}
};

export const errorHandler = ((err: any, req: Request, res: Response, next: (err?: any) => void) => {
	if (!err) {
		return next();
	} else {
		return respondeWithError(req, res, err);
	}
});