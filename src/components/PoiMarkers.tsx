import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { Shop } from '../types';
const PoiMarkers = ({
	pois,
	onMarkerClick,
	setShowShopDetails,
	setIsModalOpen,
}: {
	pois: Shop[];
	onMarkerClick: (shop: Shop) => void;
	setShowShopDetails: (show: boolean) => void;
	setIsModalOpen: (open: boolean) => void;
}) => {
	return (
		<>
			{pois.map((poi) => {
				if (!poi) return null;
				return (
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
					</AdvancedMarker>
				);
			})}
		</>
	);
};

export default PoiMarkers;
