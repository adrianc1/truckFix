import { Routes, Route } from 'react-router';
import Header from './components/layout/Header';
import Home from './pages/Results';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
const App = () => {
	return (
		<div className="w-full h-auto">
			<Header />
			<Routes>
				<Route index element={<LandingPage />} />
				<Route path="results" element={<Home />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
