export default function checkIfOpen(regularOpeningHours) {
  if (!regularOpeningHours?.weekdayDescriptions) {
    return undefined; // No hours data
  }

  const now = new Date();
  const currentDay = now.getDay();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  // Adjusted weekdays to Mon - Sun: Sunday(0) -> index 6, Monday(1) -> index 0, etc.
  const dayIndex = currentDay === 0 ? 6 : currentDay - 1;
  const todayHours = regularOpeningHours.weekdayDescriptions[dayIndex];

  console.log(`Today's hours: ${todayHours}`);

  // Check for 24 hours
  if (todayHours.includes("Open 24 hours")) {
    return true;
  }

  // Check for closed
  if (todayHours.includes("Closed")) {
    return false;
  }

  // Parse hours like "Monday: 7:00 AM – 7:00 PM"
  // or "Monday: 7:00 AM – 7:00 PM, 8:00 PM – 10:00 PM" (multiple periods)
  const hourRegex =
    /(\d{1,2}):(\d{2})\s*(AM|PM)\s*[–-]\s*(\d{1,2}):(\d{2})\s*(AM|PM)/gi;
  const matches = [...todayHours.matchAll(hourRegex)];

  if (matches.length === 0) {
    return undefined; // No valid hours found
  }

  // Check each time period
  for (const match of matches) {
    const [_, openHour, openMin, openPeriod, closeHour, closeMin, closePeriod] =
      match;

    // Convert to 24-hour format
    let openHour24 = parseInt(openHour);
    if (openPeriod === "PM" && openHour24 !== 12) openHour24 += 12;
    if (openPeriod === "AM" && openHour24 === 12) openHour24 = 0;

    let closeHour24 = parseInt(closeHour);
    if (closePeriod === "PM" && closeHour24 !== 12) closeHour24 += 12;
    if (closePeriod === "AM" && closeHour24 === 12) closeHour24 = 0;

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
