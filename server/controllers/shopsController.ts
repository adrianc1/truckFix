import { searchGooglePlaces } from '../services/placesServices';
import { getAllShops, getNearbyShops } from '../services/shopService';
import { Request, Response } from 'express';

// get all shops
const getShops = async (req: Request, res: Response) => {
	try {
		const shops = await getAllShops();
		res.json(shops);
	} catch (error) {
		console.error('Error fetching shops:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

// get nearby shops based on lat, lng, and radius
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

		if (results.length === 0) {
			console.log(
				'No nearby shops found in DB, falling back to Google Places.',
			);
			const googlePlaces = await searchGooglePlaces(Number(lat), Number(lng));
			console.log(`Found ${googlePlaces.length} places from Google.`);
			res.json({ places: googlePlaces });
		} else if (results.length < 20) {
			const googlePlaces = await searchGooglePlaces(Number(lat), Number(lng));
			console.log(
				`Supplementing ${results.length} DB shops with Google Places results.`,
			);
			res.json({ places: results.concat(googlePlaces) });
		} else {
			console.log(`Found ${results.length} nearby shops in DB.`);
			res.json({ places: results });
		}
	} catch (error) {
		console.error('Error fetching nearby shops:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

export { getShops, nearbyShops };
