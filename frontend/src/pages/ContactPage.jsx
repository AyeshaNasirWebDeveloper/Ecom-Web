import React, { useState } from "react";
import Layout from "../components/Layout/Layout.jsx";
import "../styles/ContactPage.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <Layout title={'Contact Us'}>
      <div className="contact-page">
        <div className="contact-hero">
          <div className="container">
            <h1 className="hero-title">Get in Touch</h1>
            <p className="hero-subtitle">We'd love to hear from you</p>
          </div>
        </div>

        <div className="container contact-container">
          <div className="contact-card">
            
            <form onSubmit={handleSubmit} className="contact-form">
              <h2 className="form-title">Drop Us a Message</h2>
              
              {submitSuccess && (
                <div className="success-message">
                  <svg className="checkmark" viewBox="0 0 52 52">
                    <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                    <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                  </svg>
                  <p>Your message has been sent successfully!</p>
                </div>
              )}

              <div className="form-grid">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder=" "
                    required
                  />
                  <label className="form-label">Your Name *</label>
                  <div className="form-underline"></div>
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder=" "
                    required
                  />
                  <label className="form-label">Your Email *</label>
                  <div className="form-underline"></div>
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder=" "
                    required
                  />
                  <label className="form-label">Your Phone Number *</label>
                  <div className="form-underline"></div>
                </div>

                <div className="form-group full-width">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder=" "
                    required
                  />
                  <label className="form-label">Your Message *</label>
                  <div className="form-underline"></div>
                </div>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="spinner"></span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;