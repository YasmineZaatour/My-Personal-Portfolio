
import React from "react";
import image from "../../Assets/Yasmine_img.png";
import './Intro.css';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Intro = () => {
  return (
    <section id="intro" className="intro-section">
      <div className="intro-container">
        <div className="intro-content">
          <div className="image-container" data-aos="fade-right">
            <img src={image} alt="yasmine profile" className="profile-image" />
            <div className="image-background"></div>
          </div>

          <div className="text-content" data-aos="fade-left">
            <h1 className="greeting">
              Hi, I'm Yasmine <span className="wave">👋</span>
            </h1>
            
            <div className="description">
              <p className="animate-text">
                I am passionate about using data science and machine learning to uncover insights and solve real-world problems.
              </p>
              
              <p className="animate-text">
                I enjoy exploring data analytics, big data processing, and building creative solutions for data-driven challenges.
                If you're looking for someone enthusiastic about <span className="highlight">Data Science</span> and <span className="highlight">AI technologies</span>, I'd love to connect! 🥰
              </p>
              
              <p className="animate-text">
                Currently, I'm in the final year of my bachelor's degree in Computer Science,
                where I've developed a strong foundation in data science and AI technologies.
                Next, I plan to pursue an engineering degree to further refine my skills and contribute to innovative projects in technology. 🚀
              </p>
              
              <p className="animate-text">
                I'm eager to keep learning, growing, and making a positive impact through the power of data! 🌟
              </p>
            </div>

            <div className="social-links">
              <a href="https://www.linkedin.com/in/yasminezaatour/" className="social-btn linkedin">
                <FaLinkedin /> LinkedIn
              </a>
              <a href="https://github.com/YasmineZaatour" className="social-btn github">
                <FaGithub /> Github
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;