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
		'places.regularOpeningHours.periods',
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
	// Save shops, skipping any that already exist by placeId
	await prisma.shop.createMany({
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

	// Save hours for each place that has structured periods
	// We look up each shop by placeId to get its DB id for the relation
	for (const place of unSavedPlaces) {
		const periods = place.regularOpeningHours?.periods;
		if (!periods || periods.length === 0) continue;

		const shop = await prisma.shop.findUnique({
			where: { placeId: place.id },
			select: { id: true },
		});
		if (!shop) continue;

		// Delete stale hours before reinserting so re-saves stay accurate
		await prisma.shopHours.deleteMany({ where: { shopId: shop.id } });

		await prisma.shopHours.createMany({
			data: periods.map((period: any) => ({
				shopId: shop.id,
				dayOfWeek: period.open.day,
				openTime: `${String(period.open.hour).padStart(2, '0')}:${String(period.open.minute).padStart(2, '0')}`,
				closeTime: period.close
					? `${String(period.close.hour).padStart(2, '0')}:${String(period.close.minute).padStart(2, '0')}`
					: null,
				isClosed: false,
			})),
		});

		// Save reviews — delete stale ones first
		const reviews = place.reviews ?? [];
		if (reviews.length > 0) {
			await prisma.shopReview.deleteMany({ where: { shopId: shop.id, source: 'google' } });

			await prisma.shopReview.createMany({
				data: reviews.map((r: any) => ({
					shopId: shop.id,
					source: 'google',
					authorName: r.authorAttribution?.displayName ?? null,
					authorPhoto: r.authorAttribution?.photoUri ?? null,
					rating: r.rating,
					text: r.text?.text ?? r.text ?? null,
					publishedAt: r.publishTime ? new Date(r.publishTime) : null,
				})),
			});
		}
	}
};

export { searchGooglePlaces, saveGooglePlace };
