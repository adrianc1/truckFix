import Truck from '../../assets/images/TruckFix.png';
import TruckDark from '../../assets/images/TruckFix-Dark_Mode.png';
import { Link } from 'react-router';

const Footer = () => {
	return (
		<footer className="w-full flex flex-col justify-center gap-8 items-center border-t border-gray-300 dark:border-vs-border mt-4 dark:bg-vs-bg">
			<div className="flex gap-2 mt-4">
				<img
					src={Truck}
					alt="TruckFix Logo"
					className="h-32 w-32 dark:hidden"
				/>
				<img
					src={TruckDark}
					alt="TruckFix Logo"
					className="h-32 w-32 hidden dark:block"
				/>
			</div>
			<div className="flex flex-col items-center gap-2 text-center">
				<div className="flex gap-6">
					<a
						href="mailto:info@trytruckfix.com?subject=List My Shop"
						className="text-sm text-orange-500 hover:text-orange-600 transition-colors font-medium"
					>
						Want to list your shop?
					</a>
					<span className="text-gray-300 dark:text-vs-border">|</span>
					<a
						href="mailto:info@trytruckfix.com?subject=Shop Correction"
						className="text-sm text-orange-500 hover:text-orange-600 transition-colors font-medium"
					>
						Submit a correction
					</a>
				</div>
				<span className="text-xs text-gray-400 dark:text-vs-muted select-all">
					info@trytruckfix.com
				</span>
			</div>
			<ul className="w-2/3 flex justify-around dark:text-vs-text">
				<Link to="features">
					<li>Features</li>
				</Link>
				<Link to="terms-of-service">
					<li>Terms</li>
				</Link>
				<Link to="privacy-policy">
					<li>Privacy</li>
				</Link>
				<Link to="cookies">
					<li>Cookies</li>
				</Link>
			</ul>
			<span className="text-gray-400 dark:text-vs-muted mb-2">
				&copy; 2026 TruckFix. All rights reserved. Developed & designed by{' '}
				<a
					className="text-orange-500"
					href="https://www.dreauxdigital.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					Dreaux Digital.
				</a>
			</span>
		</footer>
	);
};

export default Footer;
