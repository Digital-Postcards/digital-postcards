import React, { useState, useEffect } from "react";

export default function MapSelector(props) {
  // locations to display at the bottom of the map
  const [locations, setLocations] = useState(null);

  useEffect(() => {
    fetch("/locations").then((res)=>res.json())
      .then((res) => {
        setLocations(res.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  return (
    <div>
      {locations ? (
        <div id="map-selector-container">
          {Object.keys(locations).map((id) => {
            let loc = locations[id];
            return (
              <p
                key={loc.Name}
                className="map-selector"
                onClick={() => props.map.flyTo([loc.Latitude, loc.Longitude], 4)}
              >
                {loc.Name}
              </p>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
