import { AdvancedMarker } from '@vis.gl/react-google-maps';

export default function CurrentLocationMarker({ position }) {
	return (
		<AdvancedMarker position={position} zIndex={1000}>
			<div className="relative">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-blue-500/30 animate-[ping_2s_ease-out_infinite]" />
				<div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-lg relative" />
			</div>
		</AdvancedMarker>
	);
}
