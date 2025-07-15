import settingsIcon from '../../assets/images/settings.svg';
import { Truck } from 'lucide-react';

const Header = () => {
	return (
		<header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-4 px-4 bg-white/80 backdrop-blur-sm border-b border-gray-300/60">
			<Truck color="#ff8805" size={32} />
			<h1 className="text-xl text-center font-bold">Find A Shop Today</h1>
			<div className="settings-icon flex justify-center">
				<img src={settingsIcon} className="w-6 h-6" alt="" />
			</div>
		</header>
	);
};

export default Header;
