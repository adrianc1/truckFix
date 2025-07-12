import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './Header';
import RepairSearchForm from './RepairSearchForm';
import MapWidget from './MapWidget';
import ShopList from './ShopList';
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
