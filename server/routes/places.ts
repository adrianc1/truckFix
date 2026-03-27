import { Router, Request, Response } from 'express';

const router = Router();

// proxy to Google Places API
router.post('/', async (req: Request, res: Response) => {
	const {
		locationBias,
		maxResultCount,
		textQuery = 'diesel truck mechanic',
	} = req.body;

	if (!locationBias?.lat || !locationBias?.lng) {
		res
			.status(400)
			.json({ error: 'locationBias with lat and lng is required' });
		return;
	}

	const apiKey = process.env.VITE_GOOGLE_MAPS_API_KEY;
	if (!apiKey) {
		res.status(500).json({ error: 'GMA key not configured' });
		return;
	}

	const googleRequestBody = {
		textQuery,
		locationBias: {
			circle: {
				center: {
					latitude: Number(locationBias.lat),
					longitude: Number(locationBias.lng),
				},
				radius: 50000,
			},
		},
		maxResultCount,
		languageCode: 'en-US',
		regionCode: 'us',
	};

	const fields = [
		'places.id',
		'places.displayName',
		'places.location',
		'places.formattedAddress',
		'places.businessStatus',
		'places.rating',
		'places.userRatingCount',
		'places.types',
		'places.reviews',
		'places.regularOpeningHours',
		'places.internationalPhoneNumber',
	].join(',');

	try {
		const response = await fetch(
			'https://places.googleapis.com/v1/places:searchText',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Goog-Api-Key': apiKey,
					'X-Goog-FieldMask': fields,
				},
				body: JSON.stringify(googleRequestBody),
			},
		);

		if (!response.ok) {
			const error = await response.text();
			res.status(response.status).json({ error });
			return;
		}

		const data = await response.json();
		res.json(data);
	} catch (err) {
		console.error('Places API error:', err);
		res.status(500).json({ error: 'Failed to fetch places' });
	}
});

export default router;
