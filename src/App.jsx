import { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import React from 'react';
import Nav from './components/Nav/Nav';
import Hero from './components/Hero/Hero';
import NearbyShopsMap from './components/MapPage';
import Cards from './Cards';
import ReportMissingShop from './components/reportMissingShop/ReportMissingShop';

import './App.css';

function App() {
	return (
		<div className="flex flex-col h-full">
			<Nav />
			<Routes>
				{/* Home page route shows Hero + Cards */}
				<Route
					path="/"
					element={
						<>
							<Hero />
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
