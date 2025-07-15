import settingsIcon from '../../assets/images/settings.svg';
import { Link } from 'react-router';
import { Truck } from 'lucide-react';

const Header = () => {
	return (
		<header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-4 px-4 bg-white/80 backdrop-blur-sm border-b border-gray-300/60">
			<Link to="/">
				<Truck color="#ff6900" size={32} />
			</Link>
			<h1 className="text-xl text-center font-bold">Find A Shop Today</h1>
			<div className="settings-icon flex justify-center">
				<img src={settingsIcon} className="w-6 h-6" alt="" />
			</div>
		</header>
	);
};

export default Header;
