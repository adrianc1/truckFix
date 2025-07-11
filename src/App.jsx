import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Nav from './Nav';
import Hero from './SearchArea';
const App = () => {
	return (
		<>
			<Nav />
			<Hero />
		</>
	);
};

export default App;
