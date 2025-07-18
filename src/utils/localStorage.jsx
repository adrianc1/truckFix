export function setItem(key, value) {
	try {
		window.localStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		console.log(error);
	}
}

export function getItem({ key }) {
	const item = localStorage.getItem(key);
	if (item === null || item === 'undefined') {
		return null;
	}

	try {
		return JSON.parse(item);
	} catch (error) {
		console.log(error);
	}
}
