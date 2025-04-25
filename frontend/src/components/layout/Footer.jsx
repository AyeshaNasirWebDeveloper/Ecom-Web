import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaHeart } from "react-icons/fa";
import "../../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-links">
            <div className="footer-links-column">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-nav">
                <li className="footer-nav-item">
                  <Link 
                    to="/about" 
                    className="footer-link"
                    data-text="About"
                  >
                    About
                  </Link>
                </li>
                <li className="footer-nav-item">
                  <Link 
                    to="/contact" 
                    className="footer-link"
                    data-text="Contact Us"
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="footer-nav-item">
                  <Link 
                    to="/policy" 
                    className="footer-link"
                    data-text="Privacy Policy"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h3 className="footer-title">Connect With Us</h3>
              <div className="social-links">
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Twitter"
                >
                  <FaTwitter className="social-icon" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Instagram"
                >
                  <FaInstagram className="social-icon" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Facebook"
                >
                  <FaFacebook className="social-icon" />
                </a>
                <a 
                  href="https://tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="TikTok"
                >
                  <FaTiktok className="social-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <div className="copyright">
            <p>
              Made with <FaHeart className="heart-icon" /> by Ayesha Nasir © {new Date().getFullYear()} 
              <span className="brand-name"> E-Commerce</span>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;