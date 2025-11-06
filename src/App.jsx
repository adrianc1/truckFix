import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Results from './pages/Results';
import LandingPage from './pages/LandingPage';
import Terms from './pages/Terms.jsx';
import CookiesPage from './pages/CookiesPage.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';

const App = () => {
	const [darkMode, setDarkMode] = useState(false);

	return (
		<div className="w-full h-full">
			<Header darkMode={darkMode} setDarkMode={setDarkMode} />
			<Routes>
				<Route index element={<LandingPage />} />
				<Route path="results" element={<Results />} />
				<Route path="terms-of-service" element={<Terms />} />
				<Route path="cookies" element={<CookiesPage />} />
				<Route path="privacy-policy" element={<PrivacyPolicy />} />
			</Routes>
		</div>
	);
};

export default App;
