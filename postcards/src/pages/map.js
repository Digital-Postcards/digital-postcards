import { map } from "leaflet";
import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Cluster from "../components/Cluster";
import "../styles/Map.css";
import mapselectors from "../resources/mapselectors.json";

function Map() {
  const center = [54.199793, -2.638488];
  const [map, setMap] = useState(null);

  return (
    <div>
      <div id="map">
        <MapContainer
          center={center}
          zoom={3}
          zoomSnap={0}
          scrollWheelZoom={true}
          maxZoom={6}
          minZoom={0}
          whenCreated={(map) => setMap(map)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Cluster />
        </MapContainer>
        <div id="map-selector-container">
        {Object.keys(mapselectors).map((id) => {
          let loc = mapselectors[id];
          //console.log(loc.Name);
          return (
            <p
              key={loc.Name}
              className="map-selector"
              onClick={() => map.flyTo([loc.Latitude, loc.Longitude])}
            >
              {loc.Name}
            </p>
          );
        })}
        </div>
      </div>
    </div>
  );
}

export default Map;
