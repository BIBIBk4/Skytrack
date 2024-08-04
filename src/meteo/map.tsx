import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerRetina from 'leaflet/dist/images/marker-icon-2x.png';

const defaultIcon = new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerRetina,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const WeatherMap = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    map.setView(center, 13);
    return null;
};

export const MeteoMap = ({ lat, long, name, country }: { lat: any, long: any, name: any, country: any }) => {
    return (
        <MapContainer
            style={{ height: "300px", width: "100%" }}
            className="rounded-lg shadow-lg"
        >
            <WeatherMap center={[lat, long]} />
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                position={[lat, long]}
                icon={defaultIcon}
            >
                <Popup>
                    {name}, {country}
                </Popup>
            </Marker>
        </MapContainer>
    );
};
