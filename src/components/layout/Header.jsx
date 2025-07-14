import settingsIcon from '../../assets/images/settings.svg';
import { Truck } from 'lucide-react';

const Header = () => {
	return (
		<header className="flex justify-between items-center my-4 px-2">
			<Truck color="#ff8805" size={32} />
			<h1 className="text-xl text-center w-auto font-bold">
				Find A Shop Today
			</h1>
			<div className="settings-icon w-auto flex justify-center">
				<img src={settingsIcon} className="w-2/3" alt="" />
			</div>
		</header>
	);
};

export default Header;
