import React from "react";
import Layout from "../components/layout/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout title={'Privacy Policy'}>
      <>
        <div className="bg-light">
          <div className="container py-5">
            <div className="row">
              {/* Table of Contents */}
              <div className="col-lg-3 mb-4">
                <div className="card sticky-top privacy" style={{ top: "2rem" }}>
                  <div className="card-body">
                    <h5 className="card-title mb-3">Contents</h5>
                    <nav className="nav flex-column">
                      <a className="toc-link py-2" href="#overview">
                        Overview
                      </a>
                      <a className="toc-link py-2" href="#collection">
                        Information Collection
                      </a>
                      <a className="toc-link py-2" href="#use">
                        Information Use
                      </a>
                      <a className="toc-link py-2" href="#sharing">
                        Information Sharing
                      </a>
                      <a className="toc-link py-2" href="#security">
                        Data Security
                      </a>
                      <a className="toc-link py-2" href="#rights">
                        Your Rights
                      </a>
                      <a className="toc-link py-2" href="#updates">
                        Policy Updates
                      </a>
                      <a className="toc-link py-2" href="#contact">
                        Contact Us
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
              {/* Main Content */}
              <div className="col-lg-9">
                <div className="card">
                  <div className="card-body privacy">
                    <h1 className="mb-4">Privacy Policy</h1>
                    <p className="text-muted">
                      Last updated: March 15, 2025
                    </p>
                    <div id="overview" className="policy-section py-4">
                      <h2>Overview</h2>
                      <p>
                        This Privacy Policy describes how we collect, use, and
                        handle your personal information when you use our
                        services.
                      </p>
                    </div>
                    <div id="collection" className="policy-section py-4">
                      <h2>Information Collection</h2>
                      <h5 className="mt-3">Information you provide</h5>
                      <ul>
                        <li>Account information (name, email, phone number)</li>
                        <li>Profile information</li>
                        <li>Payment information</li>
                      </ul>
                      <h5 className="mt-3">
                        Information automatically collected
                      </h5>
                      <ul>
                        <li>Device information</li>
                        <li>Log data</li>
                        <li>Usage information</li>
                      </ul>
                    </div>
                    <div id="use" className="policy-section py-4">
                      <h2>Information Use</h2>
                      <p>We use collected information to:</p>
                      <ul>
                        <li>Provide and maintain our services</li>
                        <li>Improve user experience</li>
                        <li>Send important notifications</li>
                        <li>Prevent fraud and abuse</li>
                      </ul>
                    </div>
                    <div id="sharing" className="policy-section py-4">
                      <h2>Information Sharing</h2>
                      <p>We may share your information with:</p>
                      <ul>
                        <li>Service providers</li>
                        <li>Legal authorities when required</li>
                        <li>Business partners (with your consent)</li>
                      </ul>
                    </div>
                    <div id="security" className="policy-section py-4">
                      <h2>Data Security</h2>
                      <p>
                        We implement appropriate security measures to protect
                        your personal information, including:
                      </p>
                      <ul>
                        <li>Encryption of data in transit and at rest</li>
                        <li>Regular security assessments</li>
                        <li>Access controls and monitoring</li>
                      </ul>
                    </div>
                    <div id="rights" className="policy-section py-4">
                      <h2>Your Rights</h2>
                      <p>You have the right to:</p>
                      <ul>
                        <li>Access your personal data</li>
                        <li>Request data correction</li>
                        <li>Request data deletion</li>
                        <li>Object to processing</li>
                      </ul>
                    </div>
                    <div id="updates" className="policy-section py-4">
                      <h2>Policy Updates</h2>
                      <p>
                        We may update this policy periodically. We will notify
                        you of any material changes by posting the new policy on
                        this page.
                      </p>
                    </div>
                    <div id="contact" className="policy-section py-4">
                      <h2>Contact Us</h2>
                      <p>
                        If you have questions about this Privacy Policy, please
                        contact us at:
                      </p>
                      <div className="card bg-light mt-3">
                        <div className="card-body">
                          <p className="mb-1">Email: ayesha@example.com</p>
                          <p className="mb-1">Address: 123 Privacy Street</p>
                          <p className="mb-0">Phone: (555) 123-4567</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default PrivacyPolicy;
