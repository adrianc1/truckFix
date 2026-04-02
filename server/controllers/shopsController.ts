import prisma from '../db';
import { getAllShops } from '../services/shopService';
import { Request, Response } from 'express';
const getShops = async (req: Request, res: Response) => {
	try {
		const shops = await getAllShops();
		res.json(shops);
	} catch (error) {
		console.error('Error fetching shops:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

export { getShops };
