import React from 'react';
import './Index.css';

function IndexPage() {
  return (
    <div className="App">
      <header className="header">
        <nav className="navbar">
          <div className="logo">EyeBook</div>
          <ul className="nav-links">
            <li>
              <a href="http://localhost:5000/student">Student</a>
            </li>
            <li>
              <a href="http://localhost:5000/">Faculty</a>
            </li>
            <li>
              <a href="/spoc">Spoc</a>
            </li>
            <li>
              <a href="/login">Admin</a>
            </li>
            {/* <li>
              <a href="#demo" className="demo-btn">
                Request Demo
              </a>
            </li> */}
          </ul>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to EyeBook</h1>
          <p className="hero-text">
            A Next-Generation LMS for Seamless Learning Experience. Connect, Learn, and Grow with
            Virtual Meetings, Chatbots, and SCORM Support.
          </p>
          <a href="#demo" className="hero-btn">
            Get Started
          </a>
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

      <section id="about" className="about-section">
        <h2 className="section-title">About Phemesoft</h2>
        <p>
          At Phemesoft, we strive to create intuitive and innovative learning management systems
          that empower educators and learners. EyeBook is our latest LMS, designed to offer a
          seamless and interactive learning experience.
        </p>
      </section>

      <footer className="footer">
        <p>&copy; 2024 EyeBook by Phemesoft. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default IndexPage;
