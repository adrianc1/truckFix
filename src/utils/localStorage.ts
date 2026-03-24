export function setItem(key: string, value: string) {
	try {
		window.localStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		console.log(error);
	}
}

export function getItem<T>({ key }: { key: string }): T | null {
	const item = localStorage.getItem(key);
	if (item === null || item === 'undefined') {
		return null;
	}

	try {
		return JSON.parse(item) as T;
	} catch (error) {
		console.log(error);
	}
}
