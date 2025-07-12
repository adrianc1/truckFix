import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './Header';
import SearchBar from './SearchBar';
import Categories from './Categories';
const App = () => {
	return (
		<>
			<Header />
			<SearchBar />
			<Categories />
		</>
	);
};

export default App;
