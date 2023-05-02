import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

const drawOptions = {
  circle: true,
  rectangle: false,
  polyline: false,
  polygon: false,
  marker: false,
  circlemarker: false,
};

const Map = ({ stations }) => {
  const position = [60.192059, 24.945831];

  return (
    <MapContainer
      center={position}
      zoom={11}
      scrollWheelZoom={false}
      className="h-96 w-full"
    >
      <FeatureGroup>
        <EditControl position="topright" draw={drawOptions} />
      </FeatureGroup>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stations.map((station) => (
        <Marker
          key={station.id}
          position={[station.yCoordinate, station.xCoordinate]}
        >
          <Popup>{station.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
