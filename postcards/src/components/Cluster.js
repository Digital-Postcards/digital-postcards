import React, { useState, useEffect } from "react";
import { Marker, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";

export default function Cluster(props) {
  // refer to leaflet doc: The child component of MapContainer has access to the map through this function
  const map = useMap();

  // current layer to draw polygon on
  const [currLayer, setCurrLayer] = useState(null);

  // selected cards after clicking on a cluster
  const [selectedCards, setSelectedCards] = useState(null);

  // draw polygon on map if current layer is updated
  useEffect(() => {
    currLayer && map.addLayer(currLayer);
  }, [currLayer]);

  // if user clicks anywhere on the map, remove polygon and update selected cards
  map.on("popupclose", () => {
    currLayer && map.removeLayer(currLayer);
    setCurrLayer(null);
    setSelectedCards(null);
  });

  // function to customize clusters
  const createClusterCustomIcon = (cluster) => {
    // clusters will display proportional to their child counts
    let size = 2 * cluster.getChildCount();

    return L.divIcon({
      html: "<span>" + cluster.getChildCount() + "</span>",
      className: "marker-cluster-custom-" + props.type,
      iconSize: L.point(size, size, true),
    });
  };

  const handleClickCluster = (cluster) => {

    // if a cluster has too many children, break it down
    if (cluster.layer.getChildCount() > 30) {
      cluster.layer.zoomToBounds({ padding: [20, 20] });
    } else {

      // else update current layer and selected cards
      setCurrLayer(L.polygon(cluster.layer.getConvexHull()));
      setSelectedCards(cluster.layer.getAllChildMarkers());
      cluster.layer.bindPopup().openPopup();
    }
  };

  // update parent's state if selectedCards has changed
  useEffect(() => {
    if (selectedCards) {
      props.showSelected(selectedCards);
    } else {
      props.hideSelected();
    }
  }, [selectedCards]);

  return (
    <MarkerClusterGroup
      disableClusteringAtZoom={9}
      zoomToBoundsOnClick={false}
      showCoverageOnHover={true} // shows polygon on hover 
      maxClusterRadius={120}
      animate={true}
      singleMarkerMode={true} // single marker will be displayed as cluster of one
      iconCreateFunction={createClusterCustomIcon}
      onClick={handleClickCluster}
    >
      {props.data
        ? Object.keys(props.data).map((id) => {
            let loc = props.data[id];
            return (
              <Marker
                key={loc.id}
                position={[loc.data.lat, loc.data.lng]}
                name={loc.Name}
                id={loc.id}
                type={loc.Type}
                imageFront={loc.data.value.imageFront}
              />
            );
          })
        : ""}
    </MarkerClusterGroup>
  );
}
