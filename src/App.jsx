import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import RepairSearchForm from './components/common/RepairSearchForm';
import MapWidget from './components/common/MapWidget';
import ShopList from './components/shops/ShopList';
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
