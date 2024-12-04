import React from 'react';
import './Experience.css';

const Experience = () => {
  return (
    <section id="timeline" className="experience-section">
      <div className="experience-container">
        <h2 className="experience-title">Timeline</h2>
        <p className="experience-subtitle">
          🌟 Below my professional experience, I'm ready to tackle the next adventure with enthusiasm!
        </p>
        <div className="experience-card">
          <div className="experience-header">
            <h3>Data Scientist Intern</h3>
            <div className="experience-company">
              <span className="company-name">IPL, IT Pioneers & Leaders</span>
              <span className="experience-date">August 2024 - September 2024</span>
            </div>
          </div>
          <div className="experience-content">
            <ul className="experience-achievements">
              <li>Designed and orchestrated data pipelines with Azure Data Factory, enabling efficient data integration.</li>
              <li>Cleaned and optimized datasets within Azure Synapse Analytics using SQL and Spark, significantly enhancing data quality <br />and readiness for in-depth analysis.</li>
              <li>Designed and implemented interactive Power BI dashboard, providing valuable insights through interactive visualizations <br /> for business decision-making.</li>
              <li>Created a comprehensive dataset by scraping LinkedIn and Salesforce profiles, enriching the data for future analysis.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;