import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './Header';
import SearchBar from './SearchBar';
const App = () => {
	return (
		<>
			<Header />
			<SearchBar />
		</>
	);
};

export default App;
