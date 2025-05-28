import { Link } from "react-router-dom";
import useCategory from "../components/hooks/useCategory.jsx";
import Layout from "../components/layout/Layout.jsx";
import "../styles/Categories.css";

const Categories = () => {
  const categories = useCategory();
  
  return (
    <Layout title={"All Categories"}>
      <div className="categories-page">
        <div className="categories-header">
          <div className="container">
            <h1 className="categories-title">Explore Categories</h1>
            <p className="categories-subtitle">Browse our wide range of product categories</p>
          </div>
        </div>
        
        <div className="container categories-container">
          <div className="categories-grid">
            {categories.map((c, index) => (
              <div 
                className="category-card-wrapper" 
                key={c._id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link 
                  to={`/category/${c.slug}`} 
                  className="category-card"
                >
                  <div className="category-content">
                    <h3 className="category-name">{c.name}</h3>
                    <span className="category-link">View Products</span>
                  </div>
                  <div className="category-overlay"></div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;