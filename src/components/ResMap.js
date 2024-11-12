import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "./ResMap.css";
import "leaflet/dist/leaflet.css";
import {
  initMap,
  addResourceMarkers,
  getNearestResource,
  showRoute,
  getUserLocation,
} from "./ResMapUtils";

const Api_URL = "https://563j7r-5000.csb.app";

const ResMap = () => {
  const mapRef = useRef(null);
  const [resources, setResources] = useState([]);
  const [selectedResourceType, setSelectedResourceType] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  // Fetch resources from the backend
  useEffect(() => {
    async function fetchResources() {
      try {
        const response = await fetch(`${Api_URL}/resources`);
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error("Failed to fetch resources:", error);
      }
    }
    fetchResources();
  }, []);

  // Initialize the map and get user location
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = initMap(); // Initialize map
      getUserLocation(mapRef.current, setUserLocation); // Set user location on map load
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update map with filtered resources and show route to nearest resource
  useEffect(() => {
    if (mapRef.current && resources.length > 0) {
      const filteredResources = resources.filter((resource) =>
        selectedResourceType ? resource.type === selectedResourceType : true
      );

      // Clear all previous markers and routes
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker || layer instanceof L.Routing.Control) {
          mapRef.current.removeLayer(layer);
        }
      });

      // Add filtered resource markers
      addResourceMarkers(mapRef.current, filteredResources);
      console.log("nearest ul");
      // Show route to the nearest resource if user location is set
      console.log(userLocation);
      console.log("nearest abcd");
      if (userLocation) {
        console.log("nearest ul");
        const nearestResource = getNearestResource(
          userLocation,
          filteredResources
        );
        console.log(nearestResource);
        if (nearestResource) {
          console.log("nearest RK");
          showRoute(mapRef.current, userLocation, nearestResource);
        }
      }
    }
  }, [resources, selectedResourceType, userLocation]);

  // Handle resource type dropdown change
  const handleResourceTypeChange = (e) => {
    setSelectedResourceType(e.target.value);
  };

  return (
    <div className="res-map-container">
      <select className="map-dropdown" onChange={handleResourceTypeChange}>
        <option value="">Select Resource Type</option>
        <option value="Food">Food</option>
        <option value="Medical">Medical</option>
        <option value="Shelter">Shelter</option>
      </select>
      <div className="map-container">
        <div id="map"></div>
      </div>
    </div>
  );
};

export default ResMap;
