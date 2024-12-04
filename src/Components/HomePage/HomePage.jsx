import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoArrowDownOutline } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";
import particlesJS from "particles.js";
import image from "../../Assets/yasmine-img-rond.png";
import { Link } from "react-scroll";

const ParticleBackground = () => {
  useEffect(() => {
    window.particlesJS("particles-js", {
      particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: "#6b88e6" },
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#000000" },
        },
        opacity: {
          value: 0.5,
          random: true,
          animation: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
          value: 3,
          random: true,
          animation: { enable: true, speed: 2, size_min: 0.1, sync: false }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#6b88e6",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "bubble" },
          onclick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          bubble: { distance: 200, size: 6, duration: 2, opacity: 0.8, speed: 3 },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  }, []);

  return <div id="particles-js" className="particles-container" />;
};

function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="home-section">
      <ParticleBackground />
      
      <div className={`content-wrapper ${isVisible ? 'visible' : ''}`}>
        <div className="profile-section">
          <div className="image-container-1">
            <img src={image} alt="Yasmine's Profile" className="profile-image-1" />
            <div className="image-backdrop-1" />
          </div>

          <div className="text-content">
            <h1 className="name">Yasmine Zaatour</h1>
            <h2 className="title">
              Data Science Student <span className="separator">|</span> 
              Machine Learning Enthusiast
            </h2>
            
            <p className="description">
              Enhancing skills in Machine Learning and Data Analytics 
              through hands-on projects. <span className="emoji">🚀</span>
            </p>

            <div className="social-links">
              
              <a href="https://linkedin.com/in/yasminezaatour" className="social-link linkedin">
                <FaLinkedin />
                <span className="hover-text">LinkedIn</span>
              </a>
              <a href="https://github.com/YasmineZaatour" className="social-link github">
                <FaGithub />
                <span className="hover-text">GitHub</span>
              </a>
              
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <Link
            to="intro"
            smooth={true}
            duration={500}
            offset={-70}
            className="scroll-wrapper"
          >
            <IoArrowDownOutline className="scroll-arrow" />
            <span>Scroll to explore</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
