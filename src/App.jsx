import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import RepairSearchForm from './features/shops/RepairSearchForm';
import MapWidget from './features/shops/MapWidget';
import ShopList from './features/shops/ShopList';
const App = () => {
	return (
		<div className="w-full h-auto">
			<Header />
			<RepairSearchForm />
			<MapWidget />
			<ShopList />
		</div>
	);
};

export default App;
