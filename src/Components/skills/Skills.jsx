import React from 'react';
import './Skills.css';
import { FaPython, FaJava, FaReact, FaDatabase, FaCloud, FaTools } from 'react-icons/fa';
import { SiR, SiScala, SiApachespark, SiHadoop, SiJavascript, SiPhp, SiPowerbi, SiGit, SiDocker, SiMysql } from 'react-icons/si';

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <FaPython />,
      skills: ["Python","SQL","R","Java", "Scala", "PL/SQL"],
      color: "#4834d4"
    },
    {
      title: "Big Data Technologies",
      icon: <SiApachespark />,
      skills: ["Spark", "Hadoop"],
      color: "#eb4d4b"
    },
    {
      title: "Web Development",
      icon: <FaReact />,
      skills: ["JavaScript", "ReactJS", "PHP", "CSS", "HTML"],
      color: "#00b894"
    },
    {
      title: "Cloud Platforms",
      icon: <FaCloud />,
      skills: ["Microsoft Azure"],
      color: "#0984e3"
    },
    {
      title: "Visualization",
      icon: <SiPowerbi />,
      skills: ["Power BI"],
      color: "#6c5ce7"
    },
    {
      title: "DevOps & Tools",
      icon: <FaTools />,
      skills: ["Git", "Docker"],
      color: "#e17055"
    },
    {
      title: "Databases",
      icon: <FaDatabase />,
      skills: ["MySQL", "MongoDB", "Firebase"],
      color: "#00cec9"
    }
  ];

  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        <h2 className="skills-title">My Skills</h2>
        <p className="section-subtitle">
          Below are some of my skills, and always eager to learn more and explore new frontiers 🚀
        </p>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div 
              className="skill-card" 
              key={index}
              style={{"--delay": `${index * 0.1}s`}}
            >
              <div className="skill-icon" style={{backgroundColor: category.color}}>
                {category.icon}
              </div>
              <h3>{category.title}</h3>
              <div className="skill-list">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;