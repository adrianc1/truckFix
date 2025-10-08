import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Results from './pages/Results';
import LandingPage from './pages/LandingPage';
const App = () => {
	const [darkMode, setDarkMode] = useState(false);

	return (
		<div className="w-full h-full">
			<Header darkMode={darkMode} setDarkMode={setDarkMode} />
			<Routes>
				<Route index element={<LandingPage />} />
				<Route path="results" element={<Results />} />
			</Routes>
		</div>
	);
};

export default App;
