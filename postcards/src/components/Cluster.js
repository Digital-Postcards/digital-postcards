import React, { useState, useEffect } from "react";
import { Marker, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import locations from "../resources/locations.json";

export default function Cluster() {
  const map = useMap();

  const [currLayer, setCurrLayer] = useState(null);

  useEffect(() => {
    currLayer && map.addLayer(currLayer);
  }, [currLayer]);

  map.on("popupclose", () => {
    currLayer && map.removeLayer(currLayer);
    //setCurrLayer(null);
  });

  const createClusterCustomIcon = (cluster) => {
    let size = 10 * cluster.getChildCount();
    return L.divIcon({
      html: "<span>" + cluster.getChildCount() + "</span>",
      className: "marker-cluster-custom",
      iconSize: L.point(size, size, true),
    });
  };

  const handleClickCluster = (cluster) => {
    if (cluster.layer.getChildCount() > 4) {
      cluster.layer.zoomToBounds({ padding: [20, 20] });
    } else {
      setCurrLayer(L.polygon(cluster.layer.getConvexHull()));
      let customPopUp = `<p>${cluster.layer
        .getAllChildMarkers()
        .map((marker) => marker.options.name)}</p>`;
      cluster.layer.bindPopup(customPopUp).openPopup();
    }
  };

  return (
    <MarkerClusterGroup
      disableClusteringAtZoom={14}
      zoomToBoundsOnClick={false}
      showCoverageOnHover={true}
      animate={true}
      singleMarkerMode={true}
      iconCreateFunction={createClusterCustomIcon}
      onClick={handleClickCluster}
    >
      {Object.keys(locations).map((id) => {
        let loc = locations[id];
        //console.log(loc.Name);
        return (
          <Marker
            key={loc.Name}
            position={[loc.Latitude, loc.Longitude]}
            name={loc.Name}
          />
        );
      })}
    </MarkerClusterGroup>
  );
}
