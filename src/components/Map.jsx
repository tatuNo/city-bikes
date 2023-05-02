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

const Map = ({ stations, setCircle, controls }) => {
  const position = [60.192059, 24.945831];

  const handleCreated = (e) => {
    const layerType = e.layerType;
    if (layerType === "circle") {
      const circleLayer = e.layer;
      setCircle({
        lat: circleLayer.getLatLng().lat,
        lng: circleLayer.getLatLng().lng,
        radius: circleLayer.getRadius(),
      });
    }
  };

  return (
    <MapContainer
      center={position}
      zoom={11}
      scrollWheelZoom={false}
      className="h-96 w-full"
    >
      {controls && (
        <FeatureGroup>
          <EditControl
            position="topright"
            draw={drawOptions}
            onCreated={handleCreated}
          />
        </FeatureGroup>
      )}
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
