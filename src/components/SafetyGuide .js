import React from 'react';
import "./VolunteerAndSafety.css";
const SafetyGuide = () => {
  return (
    <div className="guide-container">
      <header className="guide-header">
        <h1>Safety Guide</h1>
        <p>Your safety is our priority. Read these guidelines before volunteering in disaster management efforts.</p>
      </header>

      <section className="section">
        <h2>General Safety Tips</h2>
        <ul>
          <li><strong>Know Your Limits:</strong> Only accept tasks that match your abilities.</li>
          <li><strong>Stay Informed:</strong> Keep up with the latest information and updates.</li>
          <li><strong>Wear Protective Gear:</strong> Always wear the required PPE like gloves, helmets, etc.</li>
          <li><strong>Stay Hydrated and Rested:</strong> Take breaks and drink plenty of water.</li>
        </ul>
      </section>

      <section className="section">
        <h2>Disaster-Specific Safety Tips</h2>
        <ul>
          <li><strong>Earthquakes:</strong> Drop, cover, and hold on. Avoid windows and heavy objects.</li>
          <li><strong>Floods:</strong> Do not walk or drive through floodwaters.</li>
          <li><strong>Fires:</strong> Stay low to avoid smoke and know the evacuation routes.</li>
        </ul>
      </section>

      <section className="section">
        <h2>Emotional and Psychological Safety</h2>
        <ul>
          <li><strong>Recognize Signs of Stress:</strong> Take breaks and seek help if needed.</li>
          <li><strong>Psychological First Aid:</strong> Offer support without overwhelming survivors.</li>
        </ul>
      </section>

      <section className="section">
        <h2>Emergency Protocols</h2>
        <ul>
          <li><strong>Injuries:</strong> Report injuries immediately and seek medical attention.</li>
          <li><strong>Evacuation Plan:</strong> Familiarize yourself with exit routes and emergency contacts.</li>
          <li><strong>Fire and First Aid Training:</strong> Attend training for handling emergencies.</li>
        </ul>
      </section>

      <section className="section">
        <h2>Communication</h2>
        <ul>
          <li><strong>Stay in Contact:</strong> Always carry a working phone or communication device.</li>
          <li><strong>Report Incidents:</strong> Report any incidents or safety issues immediately.</li>
        </ul>
      </section>

      <section className="section">
        <h2>Post-Disaster Safety</h2>
        <ul>
          <li><strong>Clean-Up:</strong> Follow proper safety procedures when cleaning up debris.</li>
          <li><strong>Self-Care:</strong> Take time to rest and recover after volunteering.</li>
        </ul>
      </section>
    </div>
  );
};

export default SafetyGuide;
