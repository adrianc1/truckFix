import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { setItem, getItem } from './utils/localStorage';
import Header from './components/layout/Header';
import Results from './pages/Results';
import LandingPage from './pages/LandingPage';
const App = () => {
	return (
		<div className="w-full h-full">
			<Header />
			<Routes>
				<Route index element={<LandingPage />} />
				<Route path="results" element={<Results />} />
			</Routes>
		</div>
	);
};

export default App;
