import Truck from '../../assets/images/TruckFix.png';
const Footer = () => {
	return (
		<footer className="w-full flex flex-col justify-center gap-8 items-center border-t border-gray-300 mt-4">
			<div className="flex gap-2 mt-4">
				<img src={Truck} alt="" className="h-32 w-32" />
				{/* <h6 className="text-2xl font-bold">TruckFix</h6> */}
			</div>
			<ul className="w-2/3 flex justify-around">
				<li>Terms</li>
				<li>Privacy</li>
				<li>Cookies</li>
			</ul>
			<span className="text-gray-400 mb-2">
				&copy; 2025 TruckFix. All rights reserved.
			</span>
		</footer>
	);
};

export default Footer;
