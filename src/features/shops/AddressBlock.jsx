const AddressBlock = ({ address }) => {
	return (
		<>
			<div className="address-block flex flex-col w-full px-3 py-4 border-2 border-gray-200 rounded-xl h-auto mb-0.5">
				<h6 className="font-bold">Address</h6>
				<span>{address}</span>
				<span>0.8 miles away</span>
			</div>
		</>
	);
};

export default AddressBlock;
