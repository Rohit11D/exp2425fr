import React from 'react';
import "./VolunteerAndSafety.css";
const VolunteerGuide = () => {
  return (
    <div className="guide-container">
      <header className="guide-header">
        <h1>Volunteer Guide</h1>
        <p>Essential information to make your volunteering experience smooth and rewarding.</p>
      </header>

     

      <section className="section">
        <h2>Types of Volunteer Work</h2>
        <ul>
          <li><strong>Logistical Support:</strong> Transport goods, set up shelters, distribute food.</li>
          <li><strong>Medical Assistance:</strong> First aid or assist at medical camps (for certified professionals).</li>
          <li><strong>Shelter Management:</strong> Help manage shelters and support displaced people.</li>
          <li><strong>Emotional Support:</strong> Offer psychological first aid to victims.</li>
          <li><strong>Community Outreach:</strong> Educate the community on safety and preparedness.</li>
        </ul>
      </section>

      <section className="section">
        <h2>Volunteer Rights and Responsibilities</h2>
        <ul>
          <li><strong>Right to Safety:</strong> Volunteers are entitled to a safe working environment and protective gear.</li>
          <li><strong>Responsibility to Communicate:</strong> Report any issues or concerns to the volunteer coordinator.</li>
          <li><strong>Respect and Dignity:</strong> Treat all individuals with respect and maintain confidentiality.</li>
        </ul>
      </section>

      <section className="section">
        <h2>How We Support You</h2>
        <ul>
          <li><strong>Training Sessions:</strong> We provide comprehensive training.</li>
          <li><strong>Support Teams:</strong> 24/7 assistance for all volunteers.</li>
          <li><strong>Recognition:</strong> Volunteers receive certificates for their contributions.</li>
        </ul>
      </section>
    </div>
  );
};

export default VolunteerGuide;
