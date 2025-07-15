const SectionTag = ({ tagName = 'HEYYY' }) => {
	return (
		<span className="my-2 bg-orange-100 w-auto text-orange-500 rounded-xl px-4 py-2">
			{tagName}
		</span>
	);
};

export default SectionTag;
