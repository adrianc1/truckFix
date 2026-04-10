import prisma from '../db';

// TODO: implement saving Google Places results to DB and returning them in nearbyShops if they are not already in the DB

const searchGooglePlaces = async (lat: number, lng: number, maxResultCount: number = 20, query: string = 'diesel truck repair shop') => {
	const apiKey = process.env.VITE_GOOGLE_MAPS_API_KEY;
	if (!apiKey) {
		throw new Error('Google Maps API key not configured');
	}

	const googleRequestBody = {
		textQuery: query,
		locationBias: {
			circle: {
				center: {
					latitude: lat,
					longitude: lng,
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
		throw new Error(`Google Places API error: ${error}`);
	}

	const data = await response.json();
	return data.places ?? [];
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
