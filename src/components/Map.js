import { Map as LeafletMap, TileLayer } from "react-leaflet";
import '../css/Map.css';
import { showDataOnMap } from './../util';


const Map = ({ countries, center, zoom }) => {

    return (
        <div className="map">
            <LeafletMap
                center={center}
                zoom={zoom}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDataOnMap(countries)}
            </LeafletMap >
        </div>
    );
}

export default Map;