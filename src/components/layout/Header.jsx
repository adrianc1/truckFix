import settingsIcon from '../../assets/images/settings.svg';
import { Link } from 'react-router-dom';
import { Truck } from 'lucide-react';

const Header = () => {
	return (
		<header className="fixed mb-24 z-200 top-0 left-0 right-0  flex justify-between items-center py-4 px-4 bg-white/80 backdrop-blur-sm border-b border-gray-300/60">
			<Link to="/" className="flex items-center gap-1 lg:pl-24">
				<Truck color="#ff6900" size={32} />
				<h1 className="text-2xl text-center font-bold">RepairFind</h1>
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
