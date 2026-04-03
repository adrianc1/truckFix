import { calculateDistance } from '../utils/distanceCalculator';

describe('calculateDistance', () => {
	it('returns 0 when both points are the same', () => {
		const result: number = calculateDistance(
			40.7128,
			-74.006,
			40.7128,
			-74.006,
		);
		expect(result).toBe(0);
	});

	it('calculates distance between New York and Los Angeles (~2445 miles)', () => {
		const newYorkLat = 40.7128;
		const newYorkLng = -74.006;
		const losAngelesLat = 34.0522;
		const losAngelesLng = -118.2437;

		const result: number = calculateDistance(
			newYorkLat,
			newYorkLng,
			losAngelesLat,
			losAngelesLng,
		);

		// equation gives ~2445 miles for this pair, allowing ±10 miles tolerance
		expect(result).toBeGreaterThan(2435);
		expect(result).toBeLessThan(2455);
	});

	it('returns the same distance regardless of direction (symmetry)', () => {
		const lat1 = 29.7604; // Houston
		const lng1 = -95.3698;
		const lat2 = 41.8781; // Chicago
		const lng2 = -87.6298;

		const distanceAtoB: number = calculateDistance(lat1, lng1, lat2, lng2);
		const distanceBtoA: number = calculateDistance(lat2, lng2, lat1, lng1);

		expect(distanceAtoB).toBeCloseTo(distanceBtoA, 5);
	});
});
