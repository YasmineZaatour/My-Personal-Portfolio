import React from 'react';
import './Certifications.css';
import { FaMicrosoft, FaAward } from 'react-icons/fa';
import { SiCoursera } from 'react-icons/si';

const Certifications = () => {
  const certifications = [
    {
      id: 1,
      title: "Microsoft Certified: Azure Fundamentals",
      issuer: "Microsoft",
      date: "June 2024",
      icon: <FaMicrosoft />,
      color: "#00a4ef",
      link: "https://www.credly.com/badges/6c7bd0ff-83fb-432b-bbdf-f05adca48aab/public_url"
    },
    {
      id: 2,
      title: "Microsoft Certified: Azure Data Fundamentals",
      issuer: "Microsoft",
      date: "June 2024",
      icon: <FaMicrosoft />,
      color: "#00a4ef",
      link: "https://www.credly.com/badges/869f96c3-fb3e-4810-836d-710752afcf6c/public_url"
    },
    {
      id: 3,
      title: "Deep Learning Specialization",
      issuer: "DeepLearning.AI",
      date: "November 2024",
      icon: <SiCoursera />,
      color: "#0056D2",
      link: "https://www.coursera.org/account/accomplishments/specialization/certificate/RV5IBMNFDW1A",
      certId: "RV5IBMNFDW1A"
    }
  ];

  return (
    <section id="certifications" className="certifications-section">
      <div className="certifications-container">
        <h2 className="certifications-title">Certifications</h2>
        <p className="certifications-subtitle">
          Professional certifications and achievements 🏆
        </p>
        
        <div className="certifications-grid">
          {certifications.map((cert) => (
            <a 
              href={cert.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="certification-card" 
              key={cert.id}
            >
              <div className="cert-icon" style={{ backgroundColor: cert.color }}>
                {cert.icon}
              </div>
              <div className="cert-content">
                <h3>{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <p className="cert-date">Issued: {cert.date}</p>
                {cert.certId && (
                  <p className="cert-id">ID: {cert.certId}</p>
                )}
              </div>
              <div className="cert-view">
                <FaAward className="view-icon" />
                <span>View Certificate</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;