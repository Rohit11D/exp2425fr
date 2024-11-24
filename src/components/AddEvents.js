import L from "leaflet";
import polyline from "polyline";
import "leaflet-routing-machine";
import "./ResMap.css";

let userMarker = null;
let userCircle = null;

export async function addEvents(map, events) {
    // Clear existing resource markers
    map.eachLayer((layer) => {
      if (layer.options && layer.options.className === "event-marker") {
        map.removeLayer(layer);
      }
    });
  
    // Add markers for each resource
    events.forEach((event) => {
      console.log("event not addeddddddddddddddddddddddddddddddddd",event.location.coordinates[0], event.location.coordinates[1]);

      const icon = getResourceIcon(event.type);
      L.marker([event.location.coordinates[1], event.location.coordinates[0]], {
        icon,
        className: "event-marker",
      })
        .addTo(map)
        .bindPopup(createResourcePopup(event));
    });
    console.log("event addeddddddddddddddddddddddddddddddddd",events);
  }
  
 
  function getResourceIcon(type) {
    const eventIcons = {
      "Bridge Damage": {
        color: "#e74c3c",
            },
      "River Overflow": {
        color: "#1abc9c",
             },
      "Obstacle On Road": {
        color: "#f39c12",
            },
      "Route blocked due to some reason": {
        color: "#3498db",
            },
    };
  
    const color  = eventIcons[type] || {
      color: "#7f8c8d",
        };
  
    const svgIcon = `
      <div style="display: inline-block;">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="60">
    <!-- Stop Sign Shape (Octagon) -->
    <polygon points="12,2 16,2 18,4 18,8 16,10 16,14 18,16 18,20 16,22 12,22 10,20 8,18 8,14 6,12 6,8 8,6 8,2" 
             fill="#ebd038" stroke="#ebd038" stroke-width="2"/>
    <!-- Text "STOP" in the center -->
    <text x="50%" y="50%" font-size="5" font-weight="800" font-family="Arial" text-anchor="middle" fill="#bd1808" dy="2">
      STOP
    </text>
    <!-- Warning Border -->
    <circle cx="12" cy="12" r="9" fill="none" stroke="#c0392b" stroke-width="2"/>
  </svg>
</div>

    `;
  
    return L.divIcon({
      className: "event-marker",
      html: svgIcon,
      iconSize: [30, 40],
      iconAnchor: [15, 40],
      popupAnchor: [0, -40],
    });
  }
  
  
  
  function createResourcePopup(event) {
    return `
      <div>
        <h3>${event.title}</h3>
        <p>Type: ${event.eventType}</p>
        <p>Available: ${event.scale}</p>
        <img
  class="fit-picture"
  src=${event.image}
  alt="loading..." />
      </div>
    `;
  }
  