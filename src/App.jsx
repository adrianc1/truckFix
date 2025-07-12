import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './Header';
import RepairSearchForm from './RepairSearchForm';
import MapWidget from './MapWidget';
const App = () => {
	return (
		<>
			<Header />
			<RepairSearchForm />
			<MapWidget />
		</>
	);
};

export default App;
