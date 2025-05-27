import { useState } from 'react';
import React from 'react';
import Nav from './components/Nav/Nav';
import Hero from './components/Hero/Hero';
import Cards from './Cards';
import ReportMissingShop from './components/reportMissingShop/ReportMissingShop';

import './App.css';

function App() {
	const [count, setCount] = useState(0);
	React.useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) =>
			console.log(position)
		);
	});

	return (
		<div className="flex flex-col h-full">
			<Nav />
			<Hero />
			<Cards />
		</div>
	);
}

export default App;
