import L from "leaflet";
import "leaflet-routing-machine";

let userMarker = null;
let userCircle = null;

export function initMap() {
  const map = L.map("map", {
    center: [23.8402, 91.6341],
    zoom: 8.3,
    maxBounds: [
      [6.4627, 68.1264], // India Southwest
      [37.6, 97.4], // India Northeast
    ],
    maxBoundsViscosity: 1.0,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  return map;
}

// export async function getUserLocation(map, setUserLocation) {
//   if ("geolocation" in navigator) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         console.log("User location:", latitude, longitude);

//         // Set the user's location
//         setUserLocation({ lat: latitude, lng: longitude });

//         // Update map only after setting the user location
//         if (map) {
//           updateUserLocation(latitude, longitude, map);
//         }
//       },
//       (error) => {
//         console.error("Error getting location:", error);
//         alert("Could not retrieve location. Please enable location services.");
//       },
//       { enableHighAccuracy: true }
//     );
//   } else {
//     alert("Geolocation is not supported by this browser.");
//   }
// }
export async function getUserLocation(map, setUserLocation) {
  try {
    // const response = await fetch("https://ipinfo.io/json?token=33697b03fb250f"); // Replace with your API token
    // const data = await response.json();
    // const [latitude, longitude] = data.loc.split(",");
    const latitude = 23.8409;
    const longitude = 91.4214;
    console.log("User location:", latitude, longitude);

    // Set the user's location
    setUserLocation({ lat: latitude, lng: longitude });

    // Update map only after setting the user location
    if (map) {
      updateUserLocation(latitude, longitude, map);
    }
    // setUserLocation({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
  } catch (error) {
    console.error("Error fetching location via IP:", error);
  }
}

function updateUserLocation(latitude, longitude, map) {
  console.log("updating");
  if (!map || !latitude || !longitude) return;

  if (!userMarker) {
    userMarker = L.marker([latitude, longitude], {
      title: "Your Location",
    }).addTo(map);
    userCircle = L.circle([latitude, longitude], {
      radius: 5000,
      color: "#3498db",
      fillOpacity: 0.1,
    }).addTo(map);
    map.setView([latitude, longitude], 8);
  } else {
    userMarker.setLatLng([latitude, longitude]);
    userCircle.setLatLng([latitude, longitude]);
  }
}

export async function getNearestResource(userLocation, resources) {
  let minDistance = Infinity;
  let nearestResource = null;
  console.log("in nearest resource");
  resources.forEach((resource) => {
    const distance = calculateDistance(userLocation, resource);
    if (distance < minDistance) {
      minDistance = distance;
      nearestResource = resource;
    }
  });

  return nearestResource;
}

function calculateDistance(userLocation, resource) {
  const R = 6371; // Earth radius in km
  const dLat = ((resource.lat - userLocation.lat) * Math.PI) / 180;
  const dLon = ((resource.lng - userLocation.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((userLocation.lat * Math.PI) / 180) *
      Math.cos((resource.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function showRoute(map, userLocation, nearestResource) {
  if (!userLocation || !nearestResource) {
    console.error("User location or nearest resource is undefined.");
    return;
  }

  const userLatLng = L.latLng(userLocation.lat, userLocation.lng);
  const resourceLatLng = L.latLng(nearestResource.lat, nearestResource.lng);

  // Remove any previous route
  if (map._routingControl) {
    try {
      map.removeControl(map._routingControl);
    } catch (error) {
      console.warn("Error removing previous routing control:", error);
    }
  }

  // Create a new route with custom styling
  map._routingControl = L.Routing.control({
    waypoints: [userLatLng, resourceLatLng],
    routeWhileDragging: true,
    createMarker: () => null, // Avoid adding extra markers
    lineOptions: {
      styles: [{ color: "#3498db", opacity: 0.8, weight: 5 }], // Custom color
    },
  })
    .on("routesfound", function (e) {
      console.log("Route found:", e.routes[0]);
    })
    .on("routingerror", function (e) {
      console.warn("Routing error:", e);
    })
    .addTo(map);
}

export function addResourceMarkers(map, resources) {
  // Clear existing resource markers
  map.eachLayer((layer) => {
    if (layer.options && layer.options.className === "resource-marker") {
      map.removeLayer(layer);
    }
  });

  // Add markers for each resource
  resources.forEach((resource) => {
    const icon = getResourceIcon(resource.type);
    L.marker([resource.lat, resource.lng], {
      icon,
      className: "resource-marker",
    })
      .addTo(map)
      .bindPopup(createResourcePopup(resource));
  });
}

function getResourceIcon(type) {
  const colors = {
    Medical: "#e74c3c",
    Shelter: "#2ecc71",
    Food: "#f1c40f",
  };
  const color = colors[type] || "#3498db";

  const svgIcon = `
    <div style="display: inline-block;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="40">
        <path d="M12 2C7.03 2 3 6.03 3 10c0 3.19 1.69 6.6 4.4 9.7C8.99 21.1 10.34 22 12 22s3.01-.9 4.6-2.3C19.31 16.6 21 13.19 21 10c0-3.97-4.03-8-9-8zM12 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" fill="${color}"/>
      </svg>
    </div>
  `;

  return L.divIcon({
    className: "resource-marker",
    html: svgIcon,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -40],
  });
}

function createResourcePopup(resource) {
  return `
    <div>
      <h3>${resource.name}</h3>
      <p>Type: ${resource.type}</p>
      <p>Available: ${resource.available}/${resource.capacity}</p>
    </div>
  `;
}
