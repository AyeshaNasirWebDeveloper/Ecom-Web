import React from "react";
import Layout from "../components/layout/Layout";

const ContactPage = () => {
  return (
    <Layout title={'Contact Us'}>
      <>
        <div className="container contact-form">
          <div className="contact-image">
            <img src="/images/contact.png" alt="rocket_contact" />
          </div>
          <form method="post">
            <h3>Drop Us a Message</h3>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group ">
                  <input
                    type="text"
                    name="txtName"
                    className="form-control mb-3"
                    placeholder="Your Name *"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="txtEmail"
                    className="form-control mb-3"
                    placeholder="Your Email *"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="txtPhone"
                    className="form-control mb-3"
                    placeholder="Your Phone Number *"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    name="btnSubmit"
                    className="btnContact"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <textarea
                    name="txtMsg"
                    className="form-control"
                    placeholder="Your Message *"
                    style={{ width: "100%", height: 150 }}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

      </>
    </Layout>
  );
};

export default ContactPage;
