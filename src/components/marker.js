import React from "react";
import { Rect, Text, Group, Star, Circle} from "react-konva";
import Konva from "konva";
import { useState, useEffect } from "react";

const Marker = (props) => {
  const [selectedCards, setSelectedCards] = useState(null);
  const [finalCards, setFinalCards] = useState(null);
  const [stroke, setStroke] = useState(false);

  //fetching data
  useEffect(() => {
    console.log("calling");
    if (props.data != null) {
      console.log(props.data);
      setSelectedCards(props.data);
    } else {
      console.log("no data");
    }
  }, [props.data]);

  //pass up the filtered cards
  useEffect(() => {
    props.showSelected(finalCards);
  }, [finalCards]);

  const handleColor = (empire) => {
    switch (empire) {
      case "British":
        return "#FF0000";
      case "French":
        return "#0000FF";
      case "Ottoman":
        return "#00FF00";
      case "American":
        return "#A020F0";
      case "Dutch":
        return "#FFA500";
      default:
        return "#00ABB3";
    }
  };

  //mouse clicked
  const handleMouseDown = () => {
    console.log(props.country.name);
    console.log(selectedCards);
    setFinalCards(
      selectedCards.filter((card) => props.country.name == card.data.location)
    );
    props.handleSelectCountry(props.country.name);
  };

  //mouse hovered
  const handleMouseOver = () => {
    setStroke(true);
    props.handleHoverCountry(props.country.name);
  };

  //mouse out
  const handleMouseOut = () => {
    setStroke(false);
    props.handleHoverCountry("Hover over a country")
  };

  return (
    <Group>
      <Circle
        x={props.country.coordinates[0]}
        y={props.country.coordinates[1]}
        radius = {props.country.size}
        fill={handleColor(props.country.empire)}
        onMouseDown={handleMouseDown}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        stroke={stroke ? "#5e3713" : "transparent"}
        strokeWidth = {2}
      />
    </Group>
  );
};

export default Marker;
