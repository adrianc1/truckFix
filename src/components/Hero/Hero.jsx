import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import NearbyShopsMap from '../MapPage';

const libraries = ['places'];
function Hero({ navigate }) {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
		libraries,
	});
	const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });

	function useCurrentLocation() {
		if (userLocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setUserLocation({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
				},
				(error) => {
					console.log('erro bur', error);
					// setUserLocation({ lat: 37.7749, lng: -129.4194 });
				}
			);
		}
	}

	const [inputValue, setInputValue] = useState('');

	const autocompleteRef = useRef(null);

	if (!isLoaded) return <div className="">Loading Maps...</div>;
	if (loadError) return <div className="">Loading Maps...</div>;

	return (
		<div className="flex flex-col justify-between pt-24 h-auto bg-[url(../../public/truck-hero.jpg)] bg-cover bg-no-repeat bg-center text-white gap-22">
			<div className="mx-auto flex flex-col gap-4">
				<h1 className="main-title text-3xl mx-auto font-bold">
					Find A Shop Near You Now!
				</h1>
				<p className="mx-auto">
					Find a repair shop or service near you instantly
				</p>
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					navigate('/map', {
						state: {
							location: inputValue,
						},
					});
				}}
				className="search-container flex flex-col w-[80%] mx-auto flex-2 pb-16"
			>
				<label className="font-bold" htmlFor="">
					Enter your location:{' '}
				</label>
				<Autocomplete
					onLoad={(ref) => (autocompleteRef.current = ref)}
					onPlaceChanged={() => {
						const place = autocompleteRef.current.getPlace();
						console.log('selected place:', place);
					}}
				>
					<input
						type="text"
						name="query"
						placeholder="Enter city or location"
						onKeyDown={(e) => setInputValue(inputValue + e.target.value || '')}
						value={
							!userLocation.lat
								? inputValue
								: `${userLocation.lat}, ${userLocation.lng}`
						}
						className="border-2 border-blue-800 rounded-md py-2 pl-2 w-full bg-white text-black"
					/>
				</Autocomplete>
				<p
					className="flex justify-end text-blue-100 cursor-pointer"
					onClick={useCurrentLocation}
				>
					Use Current Location
				</p>

				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-[80%] mx-auto mt-20"
				>
					Find Shops Nearby
				</button>
			</form>
		</div>
	);
}

export default Hero;
