import React, { useState, useEffect } from "react";
import { useMap } from "react-leaflet";

export default function MapControls(props) {
  const map = useMap();

  return (
    <div className="leaflet-top leaflet-control leaflet-control-zoom leaflet-bar">
        <button style={{zIndex: 1000}}onClick={() => console.log("Clicked")}>Click Me</button>
      <a
        className="leaflet-control-zoom-in"
        href="#"
        title="Zoom In"
        role="button"
        aria-label="Zoom in"
        onClick={(e) => {
            console.log("click");
          // map.zoomIn();
          //e.preventDefault();
        }}
      >
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.818 16.646c-1.273.797-2.726 1.256-4.202 1.354l-.537-1.983c2.083-.019 4.132-.951 5.49-2.724 2.135-2.79 1.824-6.69-.575-9.138l-1.772 2.314-1.77-6.469h6.645l-1.877 2.553c3.075 2.941 3.681 7.659 1.423 11.262l7.357 7.357-2.828 2.828-7.354-7.354zm-11.024-1.124c-1.831-1.745-2.788-4.126-2.794-6.522-.005-1.908.592-3.822 1.84-5.452 1.637-2.138 4.051-3.366 6.549-3.529l.544 1.981c-2.087.015-4.142.989-5.502 2.766-2.139 2.795-1.822 6.705.589 9.154l1.774-2.317 1.778 6.397h-6.639l1.861-2.478z" />
        </svg>
      </a>
    </div>
  );
}