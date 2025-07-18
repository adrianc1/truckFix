import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import { setItem, getItem } from './utils/localStorage';
import Header from './components/layout/Header';
import Results from './pages/Results';
import LandingPage from './pages/LandingPage';
const App = () => {
	const [currentLocation, setCurrentLocation] = useState(() => {
		const item = getItem('currentLocation');
		return (
			item || {
				latitude: '',
				longitude: '',
			}
		);
	});

	useEffect(() => {
		setItem('currentLocation', currentLocation);
	}, [currentLocation]);

	return (
		<div className="w-full h-full">
			<Header />
			<Routes>
				<Route
					index
					element={
						<LandingPage
							currentLocation={currentLocation}
							setCurrentLocation={setCurrentLocation}
						/>
					}
				/>
				<Route
					path="results"
					element={<Results currentLocation={currentLocation} />}
				/>
			</Routes>
		</div>
	);
};

export default App;
