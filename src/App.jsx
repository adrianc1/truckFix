import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import RepairSearchForm from './features/shops/RepairSearchForm';
import MapWidget from './features/shops/MapWidget';
import ShopList from './features/shops/ShopList';
import Home from './pages/Home';
const App = () => {
	return (
		<div className="w-full h-auto">
			<Header />
			<Home />
		</div>
	);
};

export default App;
