import React from "react";
import Konva from "konva";
import { Stage, Layer} from "react-konva";
import { useWindowSize } from "../hooks/useWindowSize";
import { useState, useEffect, useRef } from "react";
import Marker from "../components/marker";
import CardContainer from "../components/cardContainer";
import Key from "../components/key";
import collection from "../data/countries.json";
import "../styles/map.css";

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
    <div
      className={
        props.screen.width < 450 && props.screen.width < 950
          ? "mobile-main-container"
          : "main-container"
      }
    >
      <div
        className={
          props.screen.width < 450 && props.screen.width < 950
            ? "mobile-sub-container"
            : "sub-container"
        }
      >
        <Key handleChangeEmpire={handleChangeEmpire} country={hoverCountry} screen ={props.screen}/>
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
      <div
        className={
          props.screen.width < 450 && props.screen.height < 950
            ? "mobile-side-panel"
            : "side-panel"
        }
      >
        <div className="country-panel">
          <h2>{selectedCountry}</h2>
        </div>
        <div
          className={
            props.screen.width < 450 && props.screen.height < 950
              ? "mobile-postcards-panel-container"
              : "postcards-panel-container"
          }
        >
          <CardContainer selected={selected} cardData={selectedCards} screen ={props.screen}/>
        </div>
      </div>
    </div>
  );
};

export default Map;
