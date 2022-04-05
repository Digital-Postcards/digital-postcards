import React, { useState, useEffect } from "react";
import { Marker, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";

export default function Cluster(props) {

  const route = { postcard: "postcardMarkers", tradecard: "tradecardMarkers" };
  
  const axios = require("axios");
  const map = useMap();

  const [currLayer, setCurrLayer] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [selectedCards, setSelectedCards] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8000/' + route[props.type])
      .then((res) => {
        setMarkers(res.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  useEffect(() => {
    currLayer && map.addLayer(currLayer);
  }, [currLayer]);

  map.on("popupclose", () => {
    currLayer && map.removeLayer(currLayer);
    setCurrLayer(null);
    setSelectedCards(null);
  });

  const createClusterCustomIcon = (cluster) => {
    let size = 10 * cluster.getChildCount();
    return L.divIcon({
      html: "<span>" + cluster.getChildCount() + "</span>",
      className: "marker-cluster-custom-" + props.type,
      iconSize: L.point(size, size, true),
    });
  };

  const handleClickCluster = (cluster) => {
    if (cluster.layer.getChildCount() > 4) {
      cluster.layer.zoomToBounds({ padding: [20, 20] });
    } else {
      setCurrLayer(L.polygon(cluster.layer.getConvexHull()));
      setSelectedCards(cluster.layer.getAllChildMarkers());
      cluster.layer.bindPopup().openPopup();
    }
  };

  useEffect(() => {
    if (selectedCards) {
      props.showSelected(selectedCards);
    }
    else {
      props.hideSelected();
    }    
  }, [selectedCards])

  return (
    <MarkerClusterGroup
      disableClusteringAtZoom={14}
      zoomToBoundsOnClick={false}
      showCoverageOnHover={true}
      maxClusterRadius={120}
      animate={true}
      singleMarkerMode={true}
      iconCreateFunction={createClusterCustomIcon}
      onClick={handleClickCluster}
    >
      {markers
        ? Object.keys(markers).map((id) => {
            let loc = markers[id];
            return (
              <Marker
                key={id}
                position={[loc.Latitude, loc.Longitude]}
                name={loc.Name}
              />
            );
          })
        : ""}
    </MarkerClusterGroup>
  );
}
