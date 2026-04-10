import prisma from '../db';
import { calculateDistance } from '../utils/distanceCalculator';

const getAllShops = async () => {
	try {
		const shops = await prisma.shop.findMany({
			where: { status: 'verified' },
			select: {
				id: true,
				name: true,
				lat: true,
				lng: true,
				formattedAddress: true,
			},
		});
		return shops;
	} catch (error) {
		console.error('Error fetching shops:', error);
		throw new Error('Internal server error');
	}
};

const getNearbyShops = async (lat: number, lng: number, radius: number) => {
	try {
		const latDelta = radius / 69;
		const lngDelta = radius / (69 * Math.cos((lat * Math.PI) / 180));

		const minLat = lat - latDelta;
		const maxLat = lat + latDelta;
		const minLng = lng - lngDelta;
		const maxLng = lng + lngDelta;

		const nearbyShops = await prisma.shop.findMany({
			where: {
				status: 'verified',
				lat: { gte: minLat, lte: maxLat },
				lng: { gte: minLng, lte: maxLng },
			},
			include: {
				hours: true,
				services: true,
				photos: true,
				reviews: true,
			},
		});

		return nearbyShops.filter((shop) => {
			const distance = calculateDistance(lat, lng, shop.lat, shop.lng);
			return distance <= radius;
		});
	} catch (error) {
		console.error('Error fetching nearby shops:', error);
		throw new Error('Internal server error');
	}
};

export { getAllShops, getNearbyShops };
