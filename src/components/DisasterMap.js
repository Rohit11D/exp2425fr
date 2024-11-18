import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Api_URL = "http://localhost:5000";

const DisasterMap = () => {
  useEffect(() => {
    // Initialize map
    const map = L.map("map", {
      center: [23.8402, 91.6341], // Latitude and Longitude of Tripura, centered on India
      zoom: 8.3, // Initial zoom level to cover India
      maxBounds: [
        [6.4627, 68.1264], // Southwest coordinates (bottom-left) for India
        [37.6, 97.4], // Northeast coordinates (top-right) for India
      ],
      maxBoundsViscosity: 1.0, // Allows smooth boundary restrictions
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Fetch disaster data from backend
    fetch(Api_URL + `/disastersData`)
      .then((res) => res.json())
      .then((disasters) => {
        disasters.forEach((disaster) => {
          const [longitude, latitude] = disaster.location.coordinates;

          // Create a marker and bind a popup with disaster details
          const marker = L.marker([latitude, longitude]);
          marker.bindPopup(
            `${disaster.type} - Severity: ${disaster.severity || "Unknown"}`
          );
          marker.addTo(map);
        });
      })
      .catch((error) => {
        console.error("Error fetching disaster data:", error);
      });

    // Cleanup function to remove map and markers when the component unmounts
    return () => {
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer); // Remove all markers
        }
      });
      map.remove(); // Remove the map itself
    };
  }, []);

  return <div id="map" style={{ height: "500px" }}></div>;
};

export default DisasterMap;
