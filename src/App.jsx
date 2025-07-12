import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './Header';
import RepairSearchForm from './RepairSearchForm';
const App = () => {
	return (
		<>
			<Header />
			<RepairSearchForm />
		</>
	);
};

export default App;
