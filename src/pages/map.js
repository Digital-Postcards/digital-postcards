import React from "react";
import { Stage, Layer, Text } from "react-konva";
import Konva from "konva";
import Marker from "../components/marker";
import "../styles/map.css";
import { useState, useEffect, useRef } from "react";
import collection from "../data/countries2.json";
import PostcardContainer from "../components/PostcardContainer";
import { useWindowSize } from "../hooks/useWindowSize";
import Key from "../components/Key";

const Map = (props) => {
  const [selected, setSelected] = useState(false);
  const [selectedCards, setSelectedCards] = useState(null);
  const [scale, setScale] = useState(0);
  const [width, height] = useWindowSize();
  const [empire, setEmpire] = useState("None");
  const [selectedCountry, setSelectedCountry] = useState("Select a country");
  const [hoverCountry, setHoverCountry] = useState("Hover over a country");

  const handleChangeEmpire = (key) => {
    console.log(key);
    setEmpire(key);
    setSelectedCountry("Select a country");
    hideSelected();
    console.log(empire);
  };

  const handleHoverCountry = (key) => {
    setHoverCountry(key);
  };

  const handleSelectCountry = (key) => {
    setSelectedCountry(key);
  };

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

  const ref = useRef(null);

  const CANVAS_VIRTUAL_WIDTH = 1440;
  const CANVAS_VIRTUAL_HEIGHT = 871;

  useEffect(() => {
    setScale(ref.current.offsetWidth / CANVAS_VIRTUAL_WIDTH);
    console.log(scale);
    console.log(hoverCountry);
  }, [width, height, hoverCountry]);

  return (
    <div className = "main-container">
      <div className="sub-container">
        <Key handleChangeEmpire={handleChangeEmpire} country={hoverCountry} />
        <div className="map-container">
          <div className="stage-container" ref={ref}>
            <Stage
              width={CANVAS_VIRTUAL_WIDTH * scale}
              height={CANVAS_VIRTUAL_HEIGHT * scale}
              scaleX={scale}
              scaleY={scale}
              className="stage"
            >
              <Layer>
                {collection.countries
                  .filter(
                    (country) => country.empire == empire || empire == "None"
                  )
                  .map((country) => {
                    return (
                      <Marker
                        country={country}
                        postcardData={props.postcardData}
                        tradecardData={props.tradecardData}
                        showSelected={showSelected}
                        hideSelected={hideSelected}
                        type="postcard"
                        handleSelectCountry={handleSelectCountry}
                        handleHoverCountry={handleHoverCountry}
                      ></Marker>
                    );
                  })}
              </Layer>
            </Stage>
          </div>
        </div>
      </div>
      <div id="side-panel">
        <div id="country-panel">
          <h2>{selectedCountry}</h2>
        </div>
        <div id="postcards-panel-container">
          <PostcardContainer selected={selected} cardData={selectedCards} />
        </div>
      </div>
    </div>
  );
};

export default Map;
