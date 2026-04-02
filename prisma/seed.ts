import { PrismaClient } from '../src/generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
	const shops = [
		{
			placeId: 'ChIJseed001LAlocaltest',
			source: 'manual',
			name: 'LA Truck & Diesel Repair',
			formattedAddress: '1234 S Alameda St, Los Angeles, CA 90021',
			lat: 34.0194,
			lng: -118.2229,
			phone: '+1 213-555-0101',
			website: 'https://latruckdiesel.com',
			businessStatus: 'OPERATIONAL',
			priceLevel: 2,
			rating: 4.5,
			userRatingsTotal: 312,
			specializesInTrucks: true,
			acceptsLargeVehicles: true,
			status: 'verified',
			hours: {
				create: [
					{ dayOfWeek: 0, isClosed: true },
					{ dayOfWeek: 1, openTime: '07:00', closeTime: '18:00', isClosed: false },
					{ dayOfWeek: 2, openTime: '07:00', closeTime: '18:00', isClosed: false },
					{ dayOfWeek: 3, openTime: '07:00', closeTime: '18:00', isClosed: false },
					{ dayOfWeek: 4, openTime: '07:00', closeTime: '18:00', isClosed: false },
					{ dayOfWeek: 5, openTime: '07:00', closeTime: '18:00', isClosed: false },
					{ dayOfWeek: 6, openTime: '08:00', closeTime: '14:00', isClosed: false },
				],
			},
			services: {
				create: [
					{ service: 'diesel' },
					{ service: 'engine' },
					{ service: 'brakes' },
					{ service: 'tires' },
					{ service: 'transmission' },
				],
			},
		},
		{
			placeId: 'ChIJseed002LAlocaltest',
			source: 'manual',
			name: 'Valley Heavy Truck Service',
			formattedAddress: '5678 Van Nuys Blvd, Van Nuys, CA 91401',
			lat: 34.1858,
			lng: -118.4497,
			phone: '+1 818-555-0202',
			website: 'https://valleyheavytruck.com',
			businessStatus: 'OPERATIONAL',
			priceLevel: 2,
			rating: 4.2,
			userRatingsTotal: 187,
			specializesInTrucks: true,
			acceptsLargeVehicles: true,
			status: 'verified',
			hours: {
				create: [
					{ dayOfWeek: 0, isClosed: true },
					{ dayOfWeek: 1, openTime: '06:00', closeTime: '17:00', isClosed: false },
					{ dayOfWeek: 2, openTime: '06:00', closeTime: '17:00', isClosed: false },
					{ dayOfWeek: 3, openTime: '06:00', closeTime: '17:00', isClosed: false },
					{ dayOfWeek: 4, openTime: '06:00', closeTime: '17:00', isClosed: false },
					{ dayOfWeek: 5, openTime: '06:00', closeTime: '17:00', isClosed: false },
					{ dayOfWeek: 6, isClosed: true },
				],
			},
			services: {
				create: [
					{ service: 'diesel' },
					{ service: 'brakes' },
					{ service: 'suspension' },
					{ service: 'electrical' },
				],
			},
		},
		{
			placeId: 'ChIJseed003LAlocaltest',
			source: 'manual',
			name: 'Harbor Diesel & Fleet Repair',
			formattedAddress: '910 E Anaheim St, Long Beach, CA 90813',
			lat: 33.7903,
			lng: -118.1937,
			phone: '+1 562-555-0303',
			website: 'https://harbordieselfleet.com',
			businessStatus: 'OPERATIONAL',
			priceLevel: 3,
			rating: 4.7,
			userRatingsTotal: 540,
			specializesInTrucks: true,
			acceptsLargeVehicles: true,
			status: 'verified',
			hours: {
				create: [
					{ dayOfWeek: 0, isClosed: true },
					{ dayOfWeek: 1, openTime: '07:00', closeTime: '19:00', isClosed: false },
					{ dayOfWeek: 2, openTime: '07:00', closeTime: '19:00', isClosed: false },
					{ dayOfWeek: 3, openTime: '07:00', closeTime: '19:00', isClosed: false },
					{ dayOfWeek: 4, openTime: '07:00', closeTime: '19:00', isClosed: false },
					{ dayOfWeek: 5, openTime: '07:00', closeTime: '19:00', isClosed: false },
					{ dayOfWeek: 6, openTime: '08:00', closeTime: '15:00', isClosed: false },
				],
			},
			services: {
				create: [
					{ service: 'diesel' },
					{ service: 'engine' },
					{ service: 'tires' },
					{ service: 'brakes' },
					{ service: 'transmission' },
					{ service: 'refrigeration' },
				],
			},
		},
		{
			placeId: 'ChIJseed004LAlocaltest',
			source: 'manual',
			name: 'East LA Truck Works',
			formattedAddress: '321 Cesar Chavez Ave, Los Angeles, CA 90033',
			lat: 34.0592,
			lng: -118.1978,
			phone: '+1 323-555-0404',
			website: null,
			businessStatus: 'OPERATIONAL',
			priceLevel: 1,
			rating: 3.9,
			userRatingsTotal: 98,
			specializesInTrucks: false,
			acceptsLargeVehicles: true,
			status: 'verified',
			hours: {
				create: [
					{ dayOfWeek: 0, isClosed: true },
					{ dayOfWeek: 1, openTime: '08:00', closeTime: '17:00', isClosed: false },
					{ dayOfWeek: 2, openTime: '08:00', closeTime: '17:00', isClosed: false },
					{ dayOfWeek: 3, openTime: '08:00', closeTime: '17:00', isClosed: false },
					{ dayOfWeek: 4, openTime: '08:00', closeTime: '17:00', isClosed: false },
					{ dayOfWeek: 5, openTime: '08:00', closeTime: '17:00', isClosed: false },
					{ dayOfWeek: 6, isClosed: true },
				],
			},
			services: {
				create: [
					{ service: 'brakes' },
					{ service: 'tires' },
					{ service: 'diesel' },
				],
			},
		},
		{
			placeId: 'ChIJseed005LAlocaltest',
			source: 'manual',
			name: 'Pomona Freightliner Service',
			formattedAddress: '4455 Arrow Hwy, Montclair, CA 91763',
			lat: 34.0736,
			lng: -117.6875,
			phone: '+1 909-555-0505',
			website: 'https://pomonafreightliner.com',
			businessStatus: 'OPERATIONAL',
			priceLevel: 3,
			rating: 4.6,
			userRatingsTotal: 423,
			specializesInTrucks: true,
			acceptsLargeVehicles: true,
			status: 'verified',
			hours: {
				create: [
					{ dayOfWeek: 0, isClosed: true },
					{ dayOfWeek: 1, openTime: '06:00', closeTime: '20:00', isClosed: false },
					{ dayOfWeek: 2, openTime: '06:00', closeTime: '20:00', isClosed: false },
					{ dayOfWeek: 3, openTime: '06:00', closeTime: '20:00', isClosed: false },
					{ dayOfWeek: 4, openTime: '06:00', closeTime: '20:00', isClosed: false },
					{ dayOfWeek: 5, openTime: '06:00', closeTime: '20:00', isClosed: false },
					{ dayOfWeek: 6, openTime: '07:00', closeTime: '16:00', isClosed: false },
				],
			},
			services: {
				create: [
					{ service: 'diesel' },
					{ service: 'engine' },
					{ service: 'transmission' },
					{ service: 'brakes' },
					{ service: 'electrical' },
					{ service: 'suspension' },
					{ service: 'tires' },
				],
			},
		},
	];

	for (const shop of shops) {
		await prisma.shop.upsert({
			where: { placeId: shop.placeId },
			update: {},
			create: shop,
		});
	}

	console.log('Seeded 5 LA truck repair shops');
}

main()
	.catch(console.error)
	.finally(() => prisma.$disconnect());
