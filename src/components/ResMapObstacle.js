import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "./ResMap.css";
import "leaflet/dist/leaflet.css";
import { addEvents } from "./AddEvents";
import { Link } from "react-router-dom";
import {
  initMap,
  addResourceMarkers,
  getNearestResource,
  showRoute,
  getUserLocation,
} from "./ResMapUtils";

const Api_URL = "http://localhost:5000";

const ResMapObstacle = () => {
  const mapRef = useRef(null);
  const [resources, setResources] = useState([]);
  const [selectedResourceType, setSelectedResourceType] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [events, setEvents] = useState([]);
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
      getUserLocation(mapRef.current, setUserLocation);
     
    }

    // return () => {
    //   if (mapRef.current) {
    //     // mapRef.current.remove();
    //     // mapRef.current = null;
    //   }
    // };
  }, []);


  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(`${Api_URL}/events`);
        console.log("event ressss",response);
        const data = await response.json();
        console.log("Fetched events:", data);
        setEvents(data);
        console.log("event seted ",events);
      } catch (error) {
        console.error("Failed to fetch resources:", error);
      }
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    // When the events data is fetched and available
    if (events.length > 0 && mapRef.current) {
      console.log("Fetched events 000000000:", events); // Log the events after they're updated
      addEvents(mapRef.current, events); // Add events to the map
    }
  }, [events]); 


  
 


  
  // Update map with filtered resources and show route to nearest resource
  useEffect(() => {
    if (mapRef.current && resources.length > 0) {
      const filteredResources = resources.filter((resource) =>
        selectedResourceType ? resource.type === selectedResourceType : true
      );
   console.log("selected resource: ",selectedResourceType);
      // Clear all previous markers and routes
      mapRef.current.eachLayer((layer) => {
        if (
          (layer.options && layer.options.className === "resource-marker") ||
          layer instanceof L.Routing.Control
        ) {
          mapRef.current.removeLayer(layer);
        }
      });

      // Add filtered resource markers
      addResourceMarkers(mapRef.current, filteredResources);

      console.log("nearest fr", filteredResources);
      // Show route to the nearest resource if user location is set
      // console.log(userLocation);
      // console.log("nearest abcd");
      if (userLocation) {
        (async()=>{
          try{
        console.log("nearest ul");
        const nearestResource = await getNearestResource(
          userLocation,
          filteredResources
        );
        const { lat, lng } = nearestResource;

    // Log the coordinates
    console.log("Nearest Resource Coordinates:", lat, lng);
        console.log("this is nearest", nearestResource);
        // console.log("this is nearest", nearestResource.lng);
        if (nearestResource) {
          console.log("nearest RK");
          showRoute(mapRef.current, userLocation, nearestResource);
        } else {
          console.log("No nearest resource found.");
        }

      } catch (error) {
        console.error("Error finding nearest resource:", error);
      }
    })();
        
      }
    }
  }, [resources, selectedResourceType, userLocation]);

  // Handle resource type dropdown change
  const handleResourceTypeChange = (e) => {
    setSelectedResourceType(e.target.value);
  };

  return (
    <div>
      <header class="navba">
        <div class="logo">DisasterHelp</div>
        <nav>
          <ul className="nav-link">
            <li>
              <a href="./">Home</a>
            </li>
          </ul>
        </nav>
      </header>
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
    </div>
  );
};

export default ResMapObstacle;
