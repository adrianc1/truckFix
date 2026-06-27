import { extractServicesFromShop } from '../utils/serviceExtractor';
import { Shop, ShopReview } from '../types';

function makeShop(overrides: Partial<Shop> = {}): Shop {
	const base: Shop = {
		placeId: 'test-place-id',
		name: '',
		formatted_address: '123 Test St',
		vicinity: 'Testville',
		geometry: { location: { lat: 0, lng: 0 } },
		rating: 0,
		user_ratings_total: 0,
		reviews: [],
		opening_hours: { open_now: false },
		current_opening_hours: { open_now: false, weekday_text: [] },
		services: [],
		types: [],
		business_status: 'OPERATIONAL',
		distance: 0,
		photos: [],
	};

	return { ...base, ...overrides };
}

/**  helper  review fixtures stay short and readable */
function makeReview(text: string): ShopReview {
	return {
		rating: 5,
		text,
		authorAttribution: { displayName: 'Test Driver' },
		relativePublishTimeDescription: 'a week ago',
	};
}

describe('extractServicesFromShop', () => {
	it('returns an empty array when there is nothing to match', () => {
		const shop: Shop = makeShop({ name: 'Generic Repair' });

		const result: string[] = extractServicesFromShop(shop);

		expect(result).toEqual([]);
	});

	it('detects a service keyword found in the shop name', () => {
		const shop: Shop = makeShop({ name: "Joe's Brake Specialists" });

		const result: string[] = extractServicesFromShop(shop);

		expect(result).toContain('brakes');
	});

	it('detects a service keyword found in the editorial summary', () => {
		const shop: Shop = makeShop({
			name: 'Roadside Pros',
			editorial_summary: { overview: 'We handle transmission rebuilds.' },
		});

		const result: string[] = extractServicesFromShop(shop);

		expect(result).toContain('transmission');
	});

	it('detects a service keyword found in a review', () => {
		const shop: Shop = makeShop({
			name: 'Quick Fix',
			reviews: [makeReview('They replaced my flat tire fast.')],
		});

		const result: string[] = extractServicesFromShop(shop);

		expect(result).toContain('tires');
	});

	it('is case-insensitive', () => {
		const shop: Shop = makeShop({ name: 'ENGINE MASTERS' });

		const result: string[] = extractServicesFromShop(shop);

		expect(result).toContain('engine');
	});

	it('adds the name-based "roadside" tag when the name mentions mobile service', () => {
		const shop: Shop = makeShop({ name: 'Mobile Truck Service' });

		const result: string[] = extractServicesFromShop(shop);

		expect(result).toContain('roadside');
	});

	it('returns each matched service only once (no duplicates)', () => {
		const shop: Shop = makeShop({
			name: 'Tire Town',
			reviews: [
				makeReview('best tire shop, fixed my flat and did a wheel alignment'),
			],
		});

		const result: string[] = extractServicesFromShop(shop);

		// 'tires' is triggered by several keywords but should appear a single time
		const tireCount: number = result.filter((s) => s === 'tires').length;
		expect(tireCount).toBe(1);
	});
});
