import { GiHamburgerMenu } from 'react-icons/gi';
import { IoCloseSharp } from 'react-icons/io5';

function Nav({ showNav, onClick, showTitle }) {
	return (
		<div>
			<div
				className={`nav-menu fixed w-full text-center text-[#FFD600] bg-black transition-all duration-400 -top-100 ${
					showNav ? 'top-16' : '-top-96'
				}`}
			>
				<ul
					className="flex flex-col gap-8 pb-4 pt-4 font-bold"
					onClick={onClick}
				>
					<li className="text-red">
						<a href="#about">Home</a>
					</li>
					<li>
						<a href="#services">Find A Shop</a>
					</li>

					<li>
						<a href="#contact">Contact</a>
					</li>
				</ul>
			</div>
			{/* <div
				className="text-[#FFD600] font-bold text-2xl transition-opacity duration-300 fixed top-4 px-5 z-51"
				style={{ opacity: showTitle ? 1 : 0 }}
			>
				Find A Shop Today!
			</div> */}

			<div className="nav fixed top-0 right-0 w-full h-10 bg-white flex justify-between items-center px-6 py-8 z-50 border-b-4 border-amber-600">
				<h1 className="text-2xl font-bold text-[#de8518]">
					Find A Shop Today!
				</h1>
				{showNav ? (
					<IoCloseSharp
						className="text-black text-3xl cursor-pointer transition-all duration-400"
						onClick={onClick}
					/>
				) : (
					<GiHamburgerMenu
						className="text-black text-3xl cursor-pointer transition-all duration-400"
						onClick={onClick}
					/>
				)}
			</div>
		</div>
	);
}

export default Nav;
