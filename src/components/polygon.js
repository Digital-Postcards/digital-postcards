import React from "react";
import sample from "./../data/sample.json";
import mapData from './../data/countries.json';
import { GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css"
import { useState, useEffect } from "react";

const Polygon = (props) => {

  const map = useMap();

  const [currLayer, setCurrLayer] = useState(null);

  const [selectedCards, setSelectedCards] = useState(null);

  const [finalCards, setFinalCards] = useState(null);

  useEffect(() => {
  console.log('calling')
  if(props.data != null){
    console.log(props.data)
    setSelectedCards(props.data)
  }else{
    console.log('no data')
  }
  }, [props.data]);

  useEffect(() => {
    props.showSelected(finalCards);
    }, [finalCards]);

  const highlight1 = {
    fillColor: "#FF0000",
    color: "#FF0000",
  };

  const highlight2 = {
    fillColor: "#FF9933",
    color: "#FF9933",
  };

  const highlight3 = {
    fillColor: "#FFFF00",
    color: "#FFFF00",
  };

  const highlight4 = {
    stroke: false,
    fill: false,
  };

  const onEachCountry = (country, layer) => {
    var res = [];
    if (sample.some((x) => x.country === country.properties.ADMIN)) {
      res = sample.filter((x) => x.country === country.properties.ADMIN);
    } else {
      layer.setStyle(highlight4);
    }
    if (res.length > 0) {
      if (res[0].size <= 30) {
        layer.setStyle(highlight3);
      } else if (res[0].size > 30 && res[0].size <= 60) {
        layer.setStyle(highlight2);
      } else if (res[0].size > 60) {
        layer.setStyle(highlight1);
      }
    }

    layer.on({
      click: (event) => {
        console.log(event.target.feature.properties.ADMIN);
        setFinalCards(selectedCards.filter(card => event.target.feature.properties.ADMIN == card.data.location))
      }
    });
  };

  return (
    selectedCards?
    <GeoJSON
      data={mapData.features}
      onEachFeature={onEachCountry}
      className = "geo"
    />:null
  );
};

export default Polygon;
