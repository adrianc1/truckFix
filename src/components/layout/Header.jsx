import settingsIcon from '../../assets/images/settings.svg';
import { Link } from 'react-router-dom';
// import { Truck } from 'lucide-react';
import Truck from '../../assets/images/TruckFix.png';

const Header = () => {
	return (
		<header className="fixed mb-24 z-200 top-0 left-0 right-0  flex justify-between items-center py-1 px-4 bg-white/80 backdrop-blur-sm border-b border-gray-300/60">
			<Link to="/" className="flex items-center gap-1 lg:pl-24">
				<img src={Truck} alt="TruckFix Logo" className="w-20 h-20 m-0 p-0" />
				{/* <Truck color="#ff6900" size={32} /> */}
				{/* <h1 className="text-2xl text-center font-bold">TruckFix</h1> */}
			</Link>

			<div
				className="settings-icon flex justify-center pr-12"
				onClick={() => {
					alert(
						'Hey there! This page is still under construction. Please feel free to take a look around.'
					);
				}}
			>
				<img src={settingsIcon} className="w-6 h-6" alt="" />
			</div>
		</header>
	);
};

export default Header;
