import React, { useEffect, useRef } from "react";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS

function PagePlan() {
  const mapRef = useRef(null); // Create a ref to store the map instance
  const mapContainer = useRef(null); // Create a ref for the div

  useEffect(() => {
    if (mapRef.current) return; // Prevent duplicate map creation

    mapRef.current = L.map(mapContainer.current).setView([51.505, -0.09], 13);
    
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(mapRef.current);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* Use ref instead of id */}
        <div ref={mapContainer} style={{ height: "500px", width: "100%" }}></div>
        <button id="testbtn">Click</button>
      </header>
    </div>
  );
}

export default PagePlan;
