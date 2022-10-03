import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import Cluster from "../components/Cluster";
import MapSelector from "../components/MapSelector";
import PostcardContainer from "../components/PostcardContainer";
import L from "leaflet";
import "../styles/Map.css";
import ResetViewControl from "@20tab/react-leaflet-resetview";
import mapData from './../data/countries.json';
import sample from './../data/sample.json'

function Map(props) {
  const center = [45.975589, 8.194927];

  // the map bounces back if it goes over the bounds
  const maxBounds = [
    [82.850494, -165.727342],
    [-62.657999, 182.551385],
  ];

  const [map, setMap] = useState(null); // current map

  // if selected is true, cards should display on the right side
  const [selected, setSelected] = useState(false);

  // selected cards after clicking on a cluster
  const [selectedCards, setSelectedCards] = useState(null);

  const map_url =
    "https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=f2a5a891c0c746f0a0eb01bb238b99b9";

  // update selected cards if a cluster is clicked
  const showSelected = (selectedCardsData) => {
    setSelected(true);
    setSelectedCards(selectedCardsData);
  };

  // update selected cards if deselected
  const hideSelected = () => {
    setSelected(false);
    setSelectedCards(null);
  };

  useEffect(() => {
    if (map) {
      // custom zoom in zoom out icons
      L.control.zoom({ zoomInText: "", zoomOutText: "" }).addTo(map);
      map.setMaxBounds(maxBounds);
    }
  }, [map]);

  const highlight1 = {
    fillColor: "#FF0000",
    color: "#FF0000",
  }
  
  const highlight2 = {
    fillColor: "#FF9933",
    color: "#FF9933",
  }

  const highlight3 = {
    fillColor: "#FFFF00",
    color: "#FFFF00",
  }

  const highlight4 = {
    stroke: false,
    fill: false,
  }

  function hideLayers (){
    this.layer.eachLayer(function(layer){
      if(!layer.feature.properties.highlight){
        map.removeLayer(layer);
      }
    });
  }

  const onEachCountry = (country, layer) => {
    var res = []
    if(sample.some(x => x.country === country.properties.ADMIN)){
      res = sample.filter(x => x.country === country.properties.ADMIN)
    }
    else{
      layer.setStyle(highlight4)
    }
    if(res.length > 0){
      if(res[0].size <= 30){
        layer.setStyle(highlight3);
        }
        else if(res[0].size > 30 && res[0].size <= 60){
          layer.setStyle(highlight2);
        }
        else if(res[0].size > 60){
          layer.setStyle(highlight1);
        }
    }
  }

  return (
    <div id="map-page-container">
      {/* Map Container on left side */}
      <div id="map">
        <MapContainer
          center={center}
          zoom={2}
          zoomSnap={0}
          scrollWheelZoom={true}
          maxZoom={17}
          minZoom={2}
          zoomControl={false} // default zoom disabled
          whenCreated={(map) => setMap(map)}
        >
          <TileLayer
            tileSize={256}
            zoomOffset={0}
            url={map_url}
            crossOrigin={true}
          />
          {/* Reset Button */}
          <ResetViewControl title="Reset view" icon="↺" />

          {/* Postcard Cluster Layer */}
          {/*<Cluster
            showSelected={showSelected}
            hideSelected={hideSelected}
            type="postcard"
            data={props.data}
          />*/}

          {/* Tradecard Cluster Layer */}
         {/*<Cluster
            showSelected={showSelected}
            hideSelected={hideSelected}
            type="tradecard"
          /> */}
          <GeoJSON data = {mapData.features} onEachFeature = {onEachCountry} style = {{fillOpacity: 0.5}}/>
        </MapContainer>

        {/* Location selectors to fly to when selected */}
        <MapSelector map={map} />
      </div>

      {/* Postcard container on right side */}
      <div id="postcards-panel-container">
        <PostcardContainer selected={selected} cardData={selectedCards} />
      </div>
    </div>
  );
}

export default Map;
