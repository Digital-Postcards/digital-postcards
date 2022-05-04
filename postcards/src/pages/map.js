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
  const map_url = "https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=f2a5a891c0c746f0a0eb01bb238b99b9";
  // const map_url = "https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg";
  // const map_url = "https://api.maptiler.com/maps/voyager/{z}/{x}/{y}.png?key=AHHipthqDgqa12G5Hj12";
  // const map_url = "https://api.mapbox.com/styles/v1/maymmmaung/cl1qvt16r002u15ngt3pj3l8b/tiles/512/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWF5bW1tYXVuZyIsImEiOiJjbDBoMDVzZGMwM3QxM2NtcXJncW91cW03In0.nvujfUMFU26BQm7X3ypyCQ";

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
            tileSize={256}
            zoomOffset={0}
            url={map_url}
            crossOrigin={true}
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
