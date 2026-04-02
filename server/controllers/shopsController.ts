import { getAllShops, getNearbyShops } from '../services/shopService';
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

const nearbyShops = async (req: Request, res: Response) => {
	const { lat, lng, radius } = req.query;

	if (!lat || !lng || !radius) {
		res.status(400).json({ error: 'lat, lng, and radius are required' });
		return;
	}
	try {
		const results = await getNearbyShops(
			Number(lat),
			Number(lng),
			Number(radius),
		);
		res.json(results);
	} catch (error) {
		console.error('Error fetching nearby shops:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

export { getShops, nearbyShops };
