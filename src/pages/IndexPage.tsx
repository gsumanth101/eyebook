import React, { useState } from 'react';
import './Index.css';

function IndexPage() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="App">
      <header className="header">
        <nav className="navbar">
          <div className="logo">EyeBook</div>
          <div className="login-dropdown">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              Logins
            </button>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <a href="http://localhost:5173/student/login">Student</a>
                </li>
                <li>
                  <a href="http://localhost:5173/faculty/login">Faculty</a>
                </li>
                <li>
                  <a href="/spoc">SPOC</a>
                </li>
                <li>
                  <a href="/login">Admin</a>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to EyeBook</h1>
          <p className="hero-text">
            A Next-Generation LMS for Seamless Learning Experience. Connect, Learn, and Grow with
            Virtual Meetings, Chatbots, and SCORM Support.
          </p>
          {/* <a href="#demo" className="hero-btn">
            Get Started
          </a> */}
        </div>
      </section>

      <section id="features" className="features-section">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Virtual Meetings</h3>
            <p>Host and attend meetings directly on EyeBook.</p>
          </div>
          <div className="feature-card">
            <h3>Chatbot Assistance</h3>
            <p>Get instant help with our integrated AI chatbot.</p>
          </div>
          <div className="feature-card">
            <h3>SCORM Integration</h3>
            <p>Track and manage learning content easily with SCORM.</p>
          </div>
        </div>
      </section>

      {/* <section id="about" className="about-section">
        <h2 className="section-title">About Phemesoft</h2>
        <p>
          At Phemesoft, we strive to create intuitive and innovative learning management systems
          that empower educators and learners. EyeBook is our latest LMS, designed to offer a
          seamless and interactive learning experience.
        </p>
      </section> */}

      <footer className="footer">
        <p>&copy; 2024 EyeBook. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default IndexPage;
