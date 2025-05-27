// import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { useRef } from 'react';
import MyMap from '../Map';
function Hero() {
	// const { isLoaded, loadError } = useLoadScript({
	// 	googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
	// 	libraries: ['places'],
	// });

	const autocompleteRef = useRef(null);

	// if (!isLoaded) return <div className="">Loading Maps...</div>;
	// if (loadError) return <div className="">Loading Maps...</div>;

	window.Geolocation;

	return (
		<div className="flex flex-col justify-between pt-24 h-[70vh] bg-[url(../../public/truck-hero.jpg)] bg-cover bg-no-repeat bg-center text-white gap-24">
			<div className="mx-auto flex flex-col gap-4">
				<h1 className="main-title text-3xl mx-auto font-bold">
					Find A Shop Near You Now!
				</h1>
				<p className="mx-auto">
					Find a repair shop or service near you instantly
				</p>
			</div>
			<div className="search-container flex flex-col w-[80%] mx-auto flex-2">
				<label className="font-bold" htmlFor="">
					Enter your location:{' '}
				</label>
				<br />
				{/* <Autocomplete
					onLoad={(ref) => (autocompleteRef.current = ref)}
					onPlaceChanged={() => {
						const place = autocompleteRef.current.getPlace();
						console.log('selected place:', place);
					}}
				>
					<input
						type="text"
						placeholder="Enter city or location"
						className="border-2 border-blue-800 rounded-md  pl-2 w-full bg-white text-black"
					/>
				</Autocomplete> */}
				<p className="flex justify-end text-blue-300">Use Current Location</p>

				<button
					type="button"
					class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-[80%] mx-auto mt-20"
				>
					Find Shops Nearby
				</button>
			</div>
		</div>
	);
}

export default Hero;
