import React, { useEffect, useState } from "react";
import { getUserCoordinates } from "./ResMapUtils";
import "./ReportEvent.css"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Api_URL = "http://localhost:5000";

const ReportEvent = () => {
    const [userLocation, setUserLocation] = useState(null);
    const navigate = useNavigate();
    // Fetch user coordinates on component mount
    useEffect(() => {
        getUserCoordinates(setUserLocation);
    }, []);

    const [formData, setFormData] = useState({
        title: "",
        eventType: "",
        scale: "",
        image: null, // Store the file object here
        location: null,
    });

    const changeHandler = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === "image" ? files[0] : value, // Handle file input
        }));
    };

    const report = async () => {
        const token = localStorage.getItem("auth-token");

        if (!token) {
            alert("You are not authenticated. Please log in.");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("eventType", formData.eventType);
        formDataToSend.append("scale", formData.scale);
        formDataToSend.append("image", formData.image); // File
        formDataToSend.append("location", JSON.stringify(userLocation)); // Pass location as JSON

        try {
            const response = await fetch(Api_URL + `/reportEvent`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formDataToSend, // Pass FormData
            });

            const responseData = await response.json();

            if (responseData.success) {
               
            } else {
                alert(responseData.message || "Error reporting event");
            }
            navigate("/");
        } catch (error) {
            console.error("Error reporting event:", error);
            alert("Failed to report event. Please try again.");
        }
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
      <div className="report-event-container">
  <h1>Report Event in 5 meters radius of your current location</h1>
  <input
    type="text"
    name="title"
    value={formData.title}
    onChange={changeHandler}
    placeholder="Event Title"
  />
  <select name="eventType" value={formData.eventType} onChange={changeHandler}>
    <option value="">Select Event Type</option>
    <option value="Bridge Damage">Bridge Damage</option>
    <option value="River Overflow">River Overflow</option>
    <option value="Obstacle On Road">Obstacle On Road</option>
    <option value="Route blocked due to some reason">Road Blocked</option>
  </select>
  <select name="scale" value={formData.scale} onChange={changeHandler}>
    <option value="">Select Scale</option>
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
  </select>
  <input
    type="file"
    name="image"
    onChange={changeHandler}
  />
  <button type="button" onClick={report}>
    Submit
  </button>
  </div>
</div>

    );
};

export default ReportEvent;
