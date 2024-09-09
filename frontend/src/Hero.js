import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import './HeroSection.css';

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="glass-box">
        <div className="hero-content">
          <h1 className="animated-text">Predict Heart Disease Using AI</h1>
          <p className="hero-description">
            Harness the power of artificial intelligence to detect heart conditions early and save lives. 
            Start your journey to better health today.
          </p>
          <div className="cta-wrapper">
            <Link to="/prediction">
              <button className="cta-button">Get Started</button>
            </Link>
            <button className="learn-more-button">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
