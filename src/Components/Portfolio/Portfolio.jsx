import React, { useState } from "react";
import "./Portfolio.css";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import weRescueImg from "../../Assets/werescue.jpeg";
import stockMarketImg from "../../Assets/stockmarket.jpeg";
import heartDiseaseImg from "../../Assets/heart.png"; 
const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Tunisia Stock Market Predictions 📈",
      shortDesc:
        "Predictive model for forecasting stock prices using LSTM networks",
      image: stockMarketImg, // Add your image path
      github: "https://github.com/FirasKahlaoui/tunisia-stock-market",
      tags: ["Python", "Machine Learning", "Data Science", "LSTM"],
      period: "June 2024 - August 2024",
      fullDescription: `🌟Objective: developed a predictive model for forecasting stock prices in the Tunisian stock market using historical data and machine learning techniques.

      📈 Project Highlights:
      • Scraped stock market data (2014-2024) from Ilboursa.com 
      • Visualized data with interactive graphs for each company to enhance understanding.
      • Applied feature engineering to prepare data for machine learning algorithms
      • Developed a predictive model to forecast the next 10 days using Long Short-Term Memory (LSTM) networks, achieving a Mean Squared Error (MSE) of 0.7381, reflecting strong predictive accuracy.`,
      skills: ["Python", "Machine Learning", "Scraping", "Data Visualization"],
    },
    {
      id: 2,
      title: "Heart Disease Predictions ❤️‍🩹",
      shortDesc: "ML model for predicting heart disease with 92% accuracy",
      image: heartDiseaseImg, // Add your image path
      github: "https://github.com/YasmineZaatour/Heart-Disease-Predictions",
      tags: ["Python", "Machine Learning", "Healthcare"],
      period: "March 2024 - May 2024",
      fullDescription: `🌟Objective: developed a predictive model for predicting heart disease using a comprehensive medical dataset.

      📈Project Highlights:
      • Processed and refined a large medical dataset from Kaggle with over 440,000 rows and 40 features, performing thorough exploratory data analysis (EDA) and implementing advanced feature engineering techniques to improve data quality.
      • Created insightful visualizations to facilitate a deeper understanding of the dataset and highlight key patterns.
      • Built a predictive model for heart attack prediction, leveraging SMOTE to address class imbalance and achieved strong performance metrics : Accuracy: 92% , Precision: 82.3%, Recall: 80.9%,  F1_Score: 81.6%.`,
      skills: ["Python", "Machine Learning", "Data Visualization"],
    },
    {
      id: 3,
      title: "We Rescue 🐾",
      shortDesc: "Android app connecting pet owners with potential adopters",
      image: weRescueImg, // Add your image path
      github: "https://github.com/FirasKahlaoui/we-rescue",
      tags: ["Java", "Android", "Firebase"],
      period: "March 2024 - May 2024",
      fullDescription: `🌟Objective: To facilitate the pet adoption process by connecting individuals looking to rehome their pets with potential adopters.

      📈 Project Highlights:
      • Developed an Android app that allows users to securely sign up and log in through Firebase Authentication.
      • Integrated pet listing functionality, enabling users to add detailed descriptions and photos of pets, with seamless data storage and retrieval using Firebase Realtime Database.
      • Implemented a powerful search feature, allowing users to filter pets by location, species, and other relevant factors.
      • Provided real-time updates on pet availability and adoption status, ensuring an engaging and responsive user experience.
      • Designed user-friendly interface by applying Material Design principles, emphasizing both functionality and visual appeal.`,
      skills: ["Java", "Firebase", "Android Studio"],
    },
  ];

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="portfolio-container">
        <h2 className="portfolio-title">Portfolio</h2>
        <p className="portfolio-subtitle">
          Explore my latest projects and creative works 🚀
        </p>

        <div className="projects-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card"
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-image">
                <img
                  src={project.image || ""}
                  alt={project.title}
                  onError={(e) => {
                    e.target.src = "";
                  }}
                />
                <div className="project-overlay">
                  <FaExternalLinkAlt />
                </div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.shortDesc}</p>
                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="project-modal" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={() => setSelectedProject(null)}
            >
              ×
            </button>
            <h2>{selectedProject.title}</h2>
            <p className="project-period">{selectedProject.period}</p>
            <div className="project-description">
              {selectedProject.fullDescription.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <div className="project-skills">
              {selectedProject.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
            <a
              href={selectedProject.github}
              className="github-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub /> View on GitHub
            </a>
          </div>
        </div>
)}
    </section>
  );
};

export default Portfolio;
