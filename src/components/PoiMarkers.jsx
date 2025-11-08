import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
const PoiMarkers = ({
	pois,
	onMarkerClick,
	setShowShopDetails,
	setIsModalOpen,
}) => {
	return (
		<>
			{pois.map((poi) => {
				if (!poi) return;
				<AdvancedMarker
					key={poi.place_id}
					position={poi.geometry.location}
					onClick={() => {
						onMarkerClick(poi);
						setShowShopDetails(true);
						setIsModalOpen(true);
					}}
				>
					<Pin
						background={'#ff6900'}
						glyphColor={'#000'}
						borderColor={'#000'}
					/>
				</AdvancedMarker>;
			})}
		</>
	);
};

export default PoiMarkers;
