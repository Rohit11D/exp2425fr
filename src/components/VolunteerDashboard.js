import React from "react";
import { Link } from "react-router-dom";
import './VolunteerDashboard.css';

const VolunteerDashboard = () => {
  return (
    <div className="vd">
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
    <div className="vol-dashboard">
        
      <header className="vol-header">
        <h1>Volunteer Dashboard</h1>
        <p>Welcome, Volunteer! Here's how you can help during a disaster.</p>
      </header>

      <section className="vol-tips">
        <h2>How You Can Help</h2>
        <div className="tips-list">
          <div className="tip-card">
            <h3>Assist at Shelter Sites</h3>
            <p>
              Volunteers can provide food, water, medical assistance, and comfort at shelter sites. You may also help organize shelter logistics.
            </p>
               </div>
          <div className="tip-card">
            <h3>Provide Medical Aid</h3>
            <p>
              Trained volunteers can assist with medical triage and support efforts to provide immediate care to the injured.
            </p>
          </div>
          <div className="tip-card">
            <h3>Distribute Supplies</h3>
            <p>
              Help with distributing food, water, and emergency supplies to affected areas.
            </p>
          </div>
          <div className="tip-card">
            <h3>Communication Support</h3>
            <p>
              Volunteers can assist in managing communications, providing updates on rescue operations, and keeping the community informed.
            </p>
          </div>
        </div>
      </section>
      <Link to="/resMap" className="cta-button">View Shelter Locations</Link>
      
      
      <section className="vol-resources">
        <h2>Resources & Training</h2>
        <p>Prepare for disaster response with these training resources:</p>
        <ul>
          <li>
            <a href="/volunteerGuide" className="cta-button">Volunteer Training Guide</a>
          </li>
          <li>
            <a href="/safetyGuide" className="cta-button">Safety Tips for Volunteers</a>
          </li>
        </ul>
      </section>

      <section className="emergency-contacts">
        <h2>Emergency Contacts</h2>
        <p>Quick access to emergency numbers and disaster management agencies.</p>
        <ul>
          <li>Emergency Helpline: <strong>123-456-7890</strong></li>
          <li>Local Shelter Contact: <strong>098-765-4321</strong></li>
          <li>Disaster Relief Agency: <strong>112-233-4455</strong></li>
        </ul>
      </section>
    </div>
    </div>
  );
};

export default VolunteerDashboard;
