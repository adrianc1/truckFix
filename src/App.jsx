import { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Hero from './components/Hero/Hero';
import NearbyShopsMap from './components/MapPage';
import Cards from './Cards';

import './App.css';

function App() {
	const navigate = useNavigate();

	function useCurrentLocation() {
		console.log('ive been clicked!');
		// Get current location
		navigator.geolocation.getCurrentPosition((position) => {
			setCurrentLocation({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
		});
	}

	return (
		<div className="flex flex-col h-full">
			<Nav />
			<Routes>
				{/* Home page route shows Hero + Cards */}
				<Route
					path="/"
					element={
						<>
							<Hero navigate={navigate} />
							<Cards />
						</>
					}
				/>

				{/* Map route shows only map */}
				<Route path="/map" element={<NearbyShopsMap />} />
			</Routes>
		</div>
	);
}

export default App;
