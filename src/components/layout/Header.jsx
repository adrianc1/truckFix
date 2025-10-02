import settingsIcon from '../../assets/images/settings.svg';
import { Link } from 'react-router-dom';
// import { Truck } from 'lucide-react';
import Truck from '../../assets/images/TruckFix.png';

const Header = () => {
	return (
		<header className="fixed mb-24 z-200 top-0 left-0 right-0 flex justify-between items-center py-1 px-4 bg-white/80 backdrop-blur-sm border-b border-gray-300/60">
			{/* 1. Left Element: Logo (Must be present for spacing) */}
			<Link to="/" className="flex items-center gap-1 lg:pl-24">
				<img src={Truck} alt="TruckFix Logo" className="w-16 h-16 m-0 p-0" />
			</Link>

			{/* 2. Center Element: TRUCKFIX Text */}
			{/* ✅ CHANGE: Use 'absolute' to place the text independently in the center */}
			<div className="absolute left-1/2 transform -translate-x-1/2">
				<h1 className="text-2xl text-center font-bold">
					TRUCK
					<span className="text-orange-500">FIX</span>
				</h1>
			</div>

			{/* 3. Right Element: Settings Icon (Pushes the logo and itself to the sides) */}
			<div
				className="settings-icon flex justify-center pr-4"
				onClick={() => {
					alert(
						'Hey there! This page is still under construction. Please feel free to take a look around.'
					);
				}}
			>
				<img src={settingsIcon} className="w-6 h-6" alt="Settings Icon" />
			</div>
		</header>
	);
};

export default Header;
