import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Cluster from "../components/Cluster";
import MapSelector from "../components/MapSelector";
import PostcardContainer from "../components/PostcardContainer";
import L from "leaflet";
import "../styles/Map.css";
import ResetViewControl from "@20tab/react-leaflet-resetview";

function Map() {
  const center = [45.975589, 8.194927];
  const maxBounds = [[82.850494, -165.727342], [-62.657999, 182.551385]];
  const [map, setMap] = useState(null);
  const [selected, setSelected] = useState(false);
  const [selectedCards, setSelectedCards] = useState(null);

  const showSelected = (selectedCardsData) => {
    setSelected(true);
    setSelectedCards(selectedCardsData);
  }

  const hideSelected = () => {
    setSelected(false);
    setSelectedCards(null);
  }

  useEffect(()=>{
    if (map){
      L.control.zoom({zoomInText: "", zoomOutText: ""}).addTo(map);
      map.setMaxBounds(maxBounds);
    }
  }, [map]);

  return (
    <div id="map-page-container">
      <div id="map">
        <MapContainer
          center={center}
          zoom={2}
          zoomSnap={0}
          scrollWheelZoom={true}
          maxZoom={6}
          minZoom={2}
          zoomControl={false}
          whenCreated={(map) => setMap(map)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ResetViewControl title="Reset view" icon="↺" />
          <Cluster showSelected={showSelected} hideSelected={hideSelected} type="postcard" />
          <Cluster showSelected={showSelected} hideSelected={hideSelected} type="tradecard" />
        </MapContainer>
        <MapSelector map={map} />
      </div>
      <div id="postcards-panel-container">
        <PostcardContainer selected={selected} cardData={selectedCards} />
      </div>
    </div>
  );
}

export default Map;
