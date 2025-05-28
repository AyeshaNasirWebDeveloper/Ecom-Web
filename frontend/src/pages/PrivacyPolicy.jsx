import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";
import "../styles/Policy.css";

const PrivacyPolicy = () => {
  useEffect(() => {
    // Smooth scroll for table of contents links
    const handleSmoothScroll = (e) => {
      if (e.target.classList.contains("toc-link")) {
        e.preventDefault();
        const targetId = e.target.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth"
          });
        }
      }
    };

    document.addEventListener("click", handleSmoothScroll);
    return () => document.removeEventListener("click", handleSmoothScroll);
  }, []);

  return (
    <Layout title={'Privacy Policy'}>
      <div className="privacy-policy-container">
        <div className="policy-header">
          <div className="container">
            <h1 className="policy-title">Privacy Policy</h1>
            <p className="policy-update">Last updated: March 15, 2025</p>
          </div>
        </div>

        <div className="container policy-content">
          <div className="row">
            {/* Table of Contents */}
            <div className="col-lg-3 mb-4">
              <div className="toc-card">
                <div className="toc-header">
                  <h5>Contents</h5>
                </div>
                <nav className="toc-nav">
                  <Link to="#overview" className="toc-link">
                    Overview
                  </Link>
                  <Link to="#collection" className="toc-link">
                    Information Collection
                  </Link>
                  <Link to="#use" className="toc-link">
                    Information Use
                  </Link>
                  <Link to="#sharing" className="toc-link">
                    Information Sharing
                  </Link>
                  <Link to="#security" className="toc-link">
                    Data Security
                  </Link>
                  <Link to="#rights" className="toc-link">
                    Your Rights
                  </Link>
                  <Link to="#updates" className="toc-link">
                    Policy Updates
                  </Link>
                  <Link to="#contact" className="toc-link">
                    Contact Us
                  </Link>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-lg-9">
              <div className="policy-card">
                <div className="policy-body">
                  <section id="overview" className="policy-section">
                    <h2 className="section-title">
                      <span className="title-decor">Overview</span>
                    </h2>
                    <p className="section-text">
                      This Privacy Policy describes how we collect, use, and
                      handle your personal information when you use our
                      services.
                    </p>
                  </section>

                  <section id="collection" className="policy-section">
                    <h2 className="section-title">
                      <span className="title-decor">Information Collection</span>
                    </h2>
                    <h3 className="subsection-title">Information you provide</h3>
                    <ul className="styled-list">
                      <li>Account information (name, email, phone number)</li>
                      <li>Profile information</li>
                      <li>Payment information</li>
                    </ul>
                    <h3 className="subsection-title">
                      Information automatically collected
                    </h3>
                    <ul className="styled-list">
                      <li>Device information</li>
                      <li>Log data</li>
                      <li>Usage information</li>
                    </ul>
                  </section>

                  <section id="use" className="policy-section">
                    <h2 className="section-title">
                      <span className="title-decor">Information Use</span>
                    </h2>
                    <p className="section-text">We use collected information to:</p>
                    <ul className="styled-list">
                      <li>Provide and maintain our services</li>
                      <li>Improve user experience</li>
                      <li>Send important notifications</li>
                      <li>Prevent fraud and abuse</li>
                    </ul>
                  </section>

                  <section id="sharing" className="policy-section">
                    <h2 className="section-title">
                      <span className="title-decor">Information Sharing</span>
                    </h2>
                    <p className="section-text">We may share your information with:</p>
                    <ul className="styled-list">
                      <li>Service providers</li>
                      <li>Legal authorities when required</li>
                      <li>Business partners (with your consent)</li>
                    </ul>
                  </section>

                  <section id="security" className="policy-section">
                    <h2 className="section-title">
                      <span className="title-decor">Data Security</span>
                    </h2>
                    <p className="section-text">
                      We implement appropriate security measures to protect
                      your personal information, including:
                    </p>
                    <ul className="styled-list">
                      <li>Encryption of data in transit and at rest</li>
                      <li>Regular security assessments</li>
                      <li>Access controls and monitoring</li>
                    </ul>
                  </section>

                  <section id="rights" className="policy-section">
                    <h2 className="section-title">
                      <span className="title-decor">Your Rights</span>
                    </h2>
                    <p className="section-text">You have the right to:</p>
                    <ul className="styled-list">
                      <li>Access your personal data</li>
                      <li>Request data correction</li>
                      <li>Request data deletion</li>
                      <li>Object to processing</li>
                    </ul>
                  </section>

                  <section id="updates" className="policy-section">
                    <h2 className="section-title">
                      <span className="title-decor">Policy Updates</span>
                    </h2>
                    <p className="section-text">
                      We may update this policy periodically. We will notify
                      you of any material changes by posting the new policy on
                      this page.
                    </p>
                  </section>

                  <section id="contact" className="policy-section">
                    <h2 className="section-title">
                      <span className="title-decor">Contact Us</span>
                    </h2>
                    <p className="section-text">
                      If you have questions about this Privacy Policy, please
                      contact us at:
                    </p>
                    <div className="contact-card">
                      <div className="contact-details">
                        <p><i className="icon-envelope"></i> ayeshanasir@example.com</p>
                        <p><i className="icon-map-marker"></i> 123 Privacy Street</p>
                        <p><i className="icon-phone"></i> (555) 123-4567</p>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;