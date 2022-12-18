import React from "react";
import sample from "./../data/color.json";
import mapData from './../data/countries.json';
import { GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css"
import { useState, useEffect } from "react";

const Polygon = (props) => {
  const [selectedCards, setSelectedCards] = useState(null);
  const [finalCards, setFinalCards] = useState(null);

  //fetching data
  useEffect(() => {
  console.log('calling')
  if(props.data != null){
    console.log(props.data)
    setSelectedCards(props.data)
  }else{
    console.log('no data')
  }
  }, [props.data]);

  //pass up the filtered cards 
  useEffect(() => {
    props.showSelected(finalCards);
  }, [finalCards]);
  
  //color of the polygon
  const red = {
    fillColor: "#FF0000",
    color: "#FF0000",
  };

  const blue = {
    fillColor: "#0000FF",
    color: "#0000FF",
  };

  const green = {
    fillColor: "#00FF00",
    color: "#00FF00",
  };
  
  const teal = {
    fillColor: "#00ABB3",
    color: "#00ABB3",
  };

  const purple = {
    fillColor: "#A020F0",
    color: "#A020F0",
  };

  const orange = {
    fillColor: "#FFA500",
    color: "#FFA500"
  };

  const none = {
    stroke: false,
    fill: false,
    iconAllowOverlap: true
  };

  //filter json countries based on color.json data
  const onEachCountry = (country, layer) => {
    var res = [];
    if (sample.some((x) => x.country === country.properties.ADMIN)) {
      res = sample.filter((x) => x.country === country.properties.ADMIN);
    } else {
      layer.setStyle(none);
    }
    if (res.length > 0) {
      if (res[0].empire == 'British') {
        layer.setStyle(red);
      } else if (res[0].empire == 'French') {
        layer.setStyle(blue);
      } else if (res[0].empire  == 'Ottoman') {
        layer.setStyle(green);
      } else if (res[0].empire  == 'Dutch') {
        layer.setStyle(orange);
      } else if (res[0].empire  == 'American') {
        layer.setStyle(purple);
      } else if (res[0].empire  == 'noEmpire') {
        layer.setStyle(teal);
      } else{
        layer.setStyle(none);
      }
    }

    //when a country is clicked, show the filtered cards based on the country data
    layer.on({
      click: (event) => {
        console.log(event.target.feature.properties.ADMIN);
        console.log(selectedCards);
        setFinalCards(selectedCards.filter(card => event.target.feature.properties.ADMIN == card.data.location))
      }
    });
  };

  return (
    //if selected cards is not null, render the polygons
    selectedCards?
    <GeoJSON
      data={mapData.features}
      onEachFeature={onEachCountry}
      className = "geo"
    />:null
  );
};

export default Polygon;
