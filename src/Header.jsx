import settingsIcon from './assets/images/settings.svg';
const Header = () => {
	return (
		<header className="flex justify-between my-4 px-2">
			<h1 className="text-3xl text-center w-auto font-bold">
				Find A Shop Today
			</h1>
			<div className="settings-icon w-auto">
				<img src={settingsIcon} className="w-2/3" alt="" />
			</div>
		</header>
	);
};

export default Header;
