import { searchGooglePlaces, saveGooglePlace } from '../services/placesServices';
import { getAllShops, getNearbyShops } from '../services/shopService';
import { Request, Response } from 'express';
import { calculateDistance } from '../../src/utils/distanceCalculator';

// Transforms a Prisma DB shop into the frontend Shop shape
function normalizeDbShop(shop: any, userLat: number, userLng: number) {
	return {
		placeId: shop.placeId ?? shop.id,
		name: shop.name,
		formatted_address: shop.formattedAddress ?? '',
		vicinity: shop.formattedAddress ?? '',
		geometry: { location: { lat: shop.lat, lng: shop.lng } },
		rating: shop.rating ?? 0,
		user_ratings_total: shop.userRatingsTotal ?? 0,
		reviews: [],
		opening_hours: { open_now: false },
		current_opening_hours: {
			open_now: false,
			weekday_text: shop.hours?.map((h: any) => `Day ${h.dayOfWeek}: ${h.openTime}–${h.closeTime}`) ?? [],
		},
		services: shop.services?.map((s: any) => s.service) ?? [],
		types: [],
		business_status: shop.businessStatus ?? 'OPERATIONAL',
		distance: calculateDistance(userLat, userLng, shop.lat, shop.lng),
		photos: [],
		formatted_phone_number: shop.phone ?? undefined,
		website: shop.website ?? undefined,
		source: shop.source ?? 'database',
	};
}

// Transforms a raw Google Places API result into the frontend Shop shape
function normalizeGooglePlace(place: any, userLat: number, userLng: number) {
	const lat: number = place.location?.latitude ?? 0;
	const lng: number = place.location?.longitude ?? 0;
	return {
		placeId: place.id,
		name: place.displayName?.text ?? place.displayName ?? '',
		formatted_address: place.formattedAddress ?? '',
		vicinity: place.formattedAddress ?? '',
		geometry: { location: { lat, lng } },
		rating: place.rating ?? 0,
		user_ratings_total: place.userRatingCount ?? 0,
		reviews: place.reviews ?? [],
		opening_hours: { open_now: false },
		current_opening_hours: {
			open_now: false,
			weekday_text: place.regularOpeningHours?.weekdayDescriptions ?? [],
		},
		services: [],
		types: place.types ?? [],
		business_status: place.businessStatus ?? 'OPERATIONAL',
		distance: calculateDistance(userLat, userLng, lat, lng),
		photos: [],
		formatted_phone_number: place.internationalPhoneNumber ?? undefined,
		source: 'google',
	};
}

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

	const userLat = Number(lat);
	const userLng = Number(lng);

	try {
		const results = await getNearbyShops(userLat, userLng, Number(radius));

		if (results.length === 0) {
			console.log('No nearby shops found in DB, falling back to Google Places.');
			const googlePlaces = await searchGooglePlaces(userLat, userLng);
			await saveGooglePlace(googlePlaces);
			const normalized = googlePlaces.map((p: any) => normalizeGooglePlace(p, userLat, userLng));
			console.log(`Found ${normalized.length} places from Google. Saved to DB.`);
			res.json({ places: normalized });
		} else if (results.length < 20) {
			console.log(`Supplementing ${results.length} DB shops with Google Places results.`);
			const googlePlaces = await searchGooglePlaces(userLat, userLng);
			await saveGooglePlace(googlePlaces);
			const dbNormalized = results.map((s) => normalizeDbShop(s, userLat, userLng));
			const googleNormalized = googlePlaces.map((p: any) => normalizeGooglePlace(p, userLat, userLng));
			res.json({ places: dbNormalized.concat(googleNormalized) });
		} else {
			console.log(`Found ${results.length} nearby shops in DB.`);
			const normalized = results.map((s) => normalizeDbShop(s, userLat, userLng));
			res.json({ places: normalized });
		}
	} catch (error) {
		console.error('Error fetching nearby shops:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

export { getShops, nearbyShops };
