import { useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
} from "react-leaflet";
import L, { icon } from "leaflet";
import { EditControl } from "react-leaflet-draw";
import { Link } from "react-router-dom";

L.drawLocal.draw.toolbar.buttons.circle = "Select area to find stations";

const drawOptions = {
  circle: true,
  rectangle: false,
  polyline: false,
  polygon: false,
  marker: false,
  circlemarker: false,
};

const createCustomIcon = (color) => {
  return icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

const Map = ({ stations, setCircle, controls, center, zoom }) => {
  const drawnCircleRef = useRef(null);

  const handleCreated = (e) => {
    const layerType = e.layerType;
    if (layerType === "circle") {
      const circleLayer = e.layer;

      if (drawnCircleRef.current) {
        drawnCircleRef.current.remove();
      }

      drawnCircleRef.current = circleLayer;

      setCircle({
        lat: circleLayer.getLatLng().lat,
        lng: circleLayer.getLatLng().lng,
        radius: circleLayer.getRadius(),
      });
    }
  };

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      className="h-96 w-full"
    >
      {controls && (
        <FeatureGroup>
          <EditControl
            position="topright"
            draw={drawOptions}
            onCreated={handleCreated}
            onDeleted={() => setCircle(null)}
            edit={{ edit: false }}
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
          icon={
            station.markerColor
              ? createCustomIcon(station.markerColor)
              : createCustomIcon("black")
          }
        >
          <Popup>
            <Link to={`/stations/${station.id}`}>{station.name}</Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
