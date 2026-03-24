// lat/lng coordinate pair — used for map positioning
export interface LatLng {
	lat: number;
	lng: number;
}

// single photo reference from Google Places
export interface ShopPhoto {
	photo_reference: string;
	width: number;
	height: number;
}

// single customer review
export interface ShopReview {
	rating: number;
	text: string;
	authorAttribution: {
		displayName: string;
	};
	relativePublishTimeDescription: string;
	publishTime?: string;
}

// Basic open/closed status (the simple version from Google)
export interface OpeningHours {
	open_now: boolean;
}

// Full hours breakdown with per-day text (e.g. "Monday: 6:00 AM – 10:00 PM")
export interface CurrentOpeningHours {
	open_now: boolean;
	weekday_text: string[];
}
export interface RegularOpeningHours {
	weekdayDescriptions: string[];
}

// Main shop object from Google Places API
export interface Shop {
	// Info
	place_id: string;
	name: string;
	source?: string; // "google_places" or undefined for mock data

	// Address
	formatted_address: string;
	vicinity: string;

	//  Location - used by  map
	geometry: {
		location: LatLng;
	};

	//  Rating & Reviews
	rating: number;
	user_ratings_total: number;
	reviews: ShopReview[];

	// Shop Hours
	opening_hours: OpeningHours;
	current_opening_hours: CurrentOpeningHours;
	regularOpeningHours?: unknown;

	//  Services from custom extract list
	services: string[];

	//  Google Place Categories
	types: string[];

	//  Shop Contact
	formatted_phone_number?: string;
	phone?: string;
	website?: string;

	//  Business Details
	business_status: string; // ex: "OPERATIONAL"
	price_level?: number;

	//  Computed Distance
	distance: number;
	specializes_in_trucks?: boolean;
	accepts_large_vehicles?: boolean;

	//  Photos
	photos: ShopPhoto[];

	//  Editorial summary
	editorial_summary?: {
		overview: string;
	};
}

// load more results capability for scroll
export interface SearchCapability {
	loadMore: () => void;
	canLoadMore: boolean;
	currentLimit: number;
}

// service filter values
// empty string "" means "All Services"
export type FilterTag =
	| ''
	| 'brakes'
	| 'engine'
	| 'def'
	| 'tires'
	| 'diesel'
	| 'electrical'
	| 'roadside';
