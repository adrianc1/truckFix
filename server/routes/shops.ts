import { Router, Request, Response } from 'express';
import prisma from '../db';

const router = Router();

// return all verified shops
router.get('/', async (_req: Request, res: Response) => {
	const shops = await prisma.shop.findMany({
		where: { status: 'verified' },
		include: {
			hours: true,
			services: true,
			photos: true,
		},
	});

	res.json(shops);
});

export default router;
