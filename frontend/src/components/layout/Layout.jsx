import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify';


const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
          <meta charSet="UTF-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <ToastContainer />
        {children}</main>
      <Footer />
    </div>
  );
};

// Default Values for Seo
Layout.defaultProps = {
  title: "E-Commerce Store",
  description: "Mern Stack Project",
  keywords: "mern,react,express,node,mongodb",
  author: "Ayesha Nasir",
};

export default Layout;
