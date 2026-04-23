import { RegularOpeningHours } from '../types';

export default function checkIfOpen(
	regularOpeningHours: RegularOpeningHours | null | undefined,
): boolean | undefined {
	if (!regularOpeningHours?.weekdayDescriptions?.length) {
		return undefined; // No hours data
	}

	const now = new Date();
	const currentDay = now.getDay();
	const currentHour = now.getHours();
	const currentMinute = now.getMinutes();
	const currentTimeInMinutes = currentHour * 60 + currentMinute;

	// Adjust weekdays to Mon - Sun: Sunday(0) -> index 6, Monday(1) -> index 0, etc.
	const dayIndex: number = currentDay === 0 ? 6 : currentDay - 1;
	const todayHours: string | undefined = regularOpeningHours.weekdayDescriptions[dayIndex];

	if (!todayHours) return undefined;

	// Check for 24 hours
	if (todayHours.includes('Open 24 hours')) {
		return true;
	}

	// Check for closed
	if (todayHours.includes('Closed')) {
		return false;
	}

	// Try AM/PM format: "Monday: 9:00 AM – 6:00 PM" (Google Places)
	const ampmRegex = /(\d{1,2}):(\d{2})\s*(AM|PM)\s*[–-]\s*(\d{1,2}):(\d{2})\s*(AM|PM)/gi;
	const ampmMatches = [...todayHours.matchAll(ampmRegex)];

	// Fall back to 24h format: "Monday: 09:00–18:00" (DB-sourced shops)
	const h24Regex = /(\d{1,2}):(\d{2})\s*[–-]\s*(\d{1,2}):(\d{2})/g;
	const h24Matches = ampmMatches.length === 0 ? [...todayHours.matchAll(h24Regex)] : [];

	if (ampmMatches.length === 0 && h24Matches.length === 0) {
		return undefined;
	}

	// Normalise 24h matches into the same 6-capture-group shape as AM/PM matches
	// by injecting sentinel period strings that the AM/PM conversion below ignores
	type TimeMatch = [string, string, string, string, string, string, string];
	const matches: TimeMatch[] = ampmMatches.length > 0
		? (ampmMatches as RegExpMatchArray[]).map((m) => [m[0], m[1], m[2], m[3], m[4], m[5], m[6]] as TimeMatch)
		: (h24Matches as RegExpMatchArray[]).map((m) => [m[0], m[1], m[2], '24H', m[3], m[4], '24H'] as TimeMatch);

	// Check each time period
	for (const match of matches) {
		const [_, openHour, openMin, openPeriod, closeHour, closeMin, closePeriod] = match;

		// Convert to 24-hour format
		let openHour24 = parseInt(openHour);
		if (openPeriod === 'PM' && openHour24 !== 12) openHour24 += 12;
		if (openPeriod === 'AM' && openHour24 === 12) openHour24 = 0;

		let closeHour24 = parseInt(closeHour);
		if (closePeriod === 'PM' && closeHour24 !== 12) closeHour24 += 12;
		if (closePeriod === 'AM' && closeHour24 === 12) closeHour24 = 0;

		const openTimeInMinutes = openHour24 * 60 + parseInt(openMin);
		let closeTimeInMinutes = closeHour24 * 60 + parseInt(closeMin);

		// Handle closing after midnight (e.g., 9 AM - 2 AM next day)
		if (closeTimeInMinutes < openTimeInMinutes) {
			closeTimeInMinutes += 24 * 60;

			// If current time is after midnight, add 24 hours
			if (currentTimeInMinutes < openTimeInMinutes) {
				const adjustedCurrentTime = currentTimeInMinutes + 24 * 60;
				if (
					adjustedCurrentTime >= openTimeInMinutes &&
					adjustedCurrentTime < closeTimeInMinutes
				) {
					return true;
				}
			}
		}

		// Normal case: check if current time is within this period
		if (
			currentTimeInMinutes >= openTimeInMinutes &&
			currentTimeInMinutes < closeTimeInMinutes
		) {
			return true;
		}
	}

	return false; // Not within any open period
}
