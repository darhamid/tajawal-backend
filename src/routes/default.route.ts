import { Response, Router } from 'express';

export default () => {
	const router = Router();
	router.route('/')
		.get((req: any, res: Response) => {
			res.status(200).json({ data : 'OK', message: 'Express App Working', Date: Date()});
		});

   	return router;
};

