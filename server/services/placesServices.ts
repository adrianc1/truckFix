import prisma from 'db';
import { Request, Response } from 'express';

// TODO: implement saving Google Places results to DB and returning them in nearbyShops if they are not already in the DB

// TODO: rewrite without req and res, and instead return the data or throw errors, and let the controller handle the HTTP response
const searchGooglePlaces = async (req: Request, res: Response) => {
	const {
		locationBias,
		maxResultCount,
		query = 'diesel truck repair shop',
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
		query,
		locationBias: {
			circle: {
				center: {
					latitude: Number(locationBias.lat),
					longitude: Number(locationBias.lng),
				},
				radius: 5000,
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
				method: 'GET',
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
};

const saveGooglePlace = async (unSavedPlaces: any[]) => {
	const savedPlaces = await prisma.shop.createMany({
		data: unSavedPlaces.map((place) => ({
			name: place.displayName.text ?? place.displayName,
			lat: place.location.latitude,
			lng: place.location.longitude,
			formattedAddress: place.formattedAddress,
			placeId: place.id,
			phone: place.internationalPhoneNumber,
			rating: place.rating,
			userRatingsTotal: place.userRatingCount,
			businessStatus: place.businessStatus,
			source: 'google',
			status: 'verified',
		})),
		skipDuplicates: true,
	});

	return savedPlaces;
};

export { searchGooglePlaces, saveGooglePlace };
