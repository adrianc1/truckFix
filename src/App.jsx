import { Routes, Route } from 'react-router';
import Header from './components/layout/Header';
import Home from './pages/Results';
import LandingPage from './pages/LandingPage';
const App = () => {
	return (
		<div className="w-full h-full">
			<Header />
			<Routes>
				<Route index element={<LandingPage />} />
				<Route path="results" element={<Home />} />
			</Routes>
		</div>
	);
};

export default App;
