import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
} from "chart.js";
import L from "leaflet";

// Fix for Leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Register necessary Chart.js components
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title
);

const Api_URL = "https://563j7r-5000.csb.app";

const DisasterAnalytics = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Ref to store chart instance

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      const response = await fetch(Api_URL + `/analytics`);
      const analyticsData = await response.json();

      // Destroy the previous chart instance before creating a new one
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: analyticsData.map((data) => `Month ${data._id}`),
          datasets: [
            {
              label: "Earthquakes",
              data: analyticsData.map((data) => data.earthquakes),
              borderColor: "#e74c3c", // Red for Earthquakes
              fill: false,
            },
            {
              label: "Floods",
              data: analyticsData.map((data) => data.floods),
              borderColor: "#3498db", // Blue for Floods
              fill: false,
            },
          ],
        },
        options: { responsive: true },
      });
    };

    fetchAnalyticsData();
  }, []);

  return <canvas ref={chartRef} id="analyticsChart"></canvas>;
};

export default DisasterAnalytics;
