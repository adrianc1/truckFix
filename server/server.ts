import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// POST /api/places
app.post('/api/places', async (req: Request, res: Response) => {
	// req from frontend
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
		res.status(500).json({ error: 'Google Maps API key not configured' });
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

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`TruckFix server listening on port ${PORT}!`);
});
