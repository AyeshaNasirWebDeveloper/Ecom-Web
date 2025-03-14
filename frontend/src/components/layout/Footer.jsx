import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div class="main py-2">
        <footer className="pt-5">
          <ul className="nav justify-content-center text-white">
            <li className="nav-item">
              <Link to="/about" className="nav-link px-2 text-body-secondary text">
                About *
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link px-2 text-body-secondary text">
                Contact US *
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="/policy" className="nav-link px-2 text-body-secondary text">
                Privacy Policy *
              </Link>
            </li>
          </ul>
        </footer>
        <div className="footer container-fluid">
          <footer className="d-flex flex-wrap justify-content-between align-items-center">
            <div className="col-md-4 d-flex align-items-center">
              <link
                href="/"
                className=" me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
              />
              
              <span className="pb-2 mb-md-0 text-body-secondary texts my-3">
              🛒 © 2025 Ayesha, Dev. All rights reserved.
              </span>
            </div>
            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex ">
              <li className="ms-3">
                <link className="text-body-secondary texts" />
                <svg className="bi" width={24} height={24}>
                  <FaTwitter />
                </svg>
              </li>
              <li className="ms-3">
                <link className="text-body-secondary" />
                <svg className="bi" width={24} height={24}>
                  <FaInstagram />
                </svg>
              </li>
              <li className="ms-3">
                <link className="text-body-secondary" />
                <svg className="bi" width={24} height={24}>
                  <FaFacebook />
                </svg>
              </li>
              <li className="ms-3">
                <link className="text-body-secondary" />
                <svg className="bi" width={24} height={24}>
                  <FaTiktok />
                </svg>
              </li>
            </ul>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Footer;
