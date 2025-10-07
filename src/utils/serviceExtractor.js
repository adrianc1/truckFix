const SERVICE_KEYWORDS = {
	def: ['def', 'diesel exhaust fluid', 'emissions'],
	engine: ['engine', 'motor', 'diesel engine'],
	tires: ['tire', 'wheel', 'alignment', 'flat'],
	diesel: ['diesel', 'heavy duty'],
	electrical: ['electrical', 'wiring', 'battery', 'alternator'],
	transmission: ['transmission', 'gearbox', 'clutch'],
	brakes: ['brake', 'braking'],
	suspension: ['suspension', 'shock', 'spring'],
	trailer: ['trailer', 'reefer'],
	roadside: ['roadside', 'mobile', 'emergency'],
	dot: ['dot inspection', 'inspection'],
};

export function extractServicesFromShop(shop) {
	const services = new Set();

	// Combine name and reviews into searchable text
	const text = [
		shop.name || '',
		shop.editorial_summary?.overview || '',
		...(shop.reviews || []).map((r) => r.text || ''),
	]
		.join(' ')
		.toLowerCase();

	// Check for each service keyword
	Object.entries(SERVICE_KEYWORDS).forEach(([service, keywords]) => {
		if (keywords.some((keyword) => text.includes(keyword))) {
			services.add(service);
		}
	});

	// Name-based heuristics
	const name = (shop.name || '').toLowerCase();
	if (name.includes('mobile') || name.includes('roadside')) {
		services.add('roadside');
	}
	if (name.includes('24') || name.includes('emergency')) {
		services.add('emergency');
	}
	if (name.includes('truck stop')) {
		services.add('truck stop');
	}

	return Array.from(services);
}
