import { useState } from 'react';
import Truck from '../../assets/images/TruckFix.png';
import TruckDark from '../../assets/images/TruckFix-Dark_Mode.png';
import { Link } from 'react-router';
import { Copy, Check } from 'lucide-react';

const EMAIL = 'info@trytruckfix.com';

const Footer = () => {
	const [copied, setCopied] = useState<string | null>(null);

	const copyEmail = (label: string) => {
		navigator.clipboard.writeText(EMAIL);
		setCopied(label);
		setTimeout(() => setCopied(null), 2000);
	};

	return (
		<footer className="w-full flex flex-col justify-center gap-8 items-center pt-12 dark:bg-vs-bg">
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
					<button
						onClick={() => copyEmail('list')}
						className="flex items-center gap-1.5 text-sm text-orange-500 hover:text-orange-400 transition-colors font-medium cursor-pointer"
					>
						{copied === 'list' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
						{copied === 'list' ? 'Copied!' : 'Want to list your shop?'}
					</button>
					<span className="text-gray-300 dark:text-vs-border">|</span>
					<button
						onClick={() => copyEmail('correction')}
						className="flex items-center gap-1.5 text-sm text-orange-500 hover:text-orange-400 transition-colors font-medium cursor-pointer"
					>
						{copied === 'correction' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
						{copied === 'correction' ? 'Copied!' : 'Submit a correction'}
					</button>
				</div>
				<span className="text-xs text-gray-400 dark:text-vs-muted select-all">
					{EMAIL}
				</span>
			</div>
			<ul className="w-2/3 flex justify-around dark:text-vs-text">
				<Link to="/features">
					<li>Features</li>
				</Link>
				<Link to="/faq">
					<li>FAQ</li>
				</Link>
				<Link to="/terms-of-service">
					<li>Terms</li>
				</Link>
				<Link to="/privacy-policy">
					<li>Privacy</li>
				</Link>
				<Link to="/cookies">
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
