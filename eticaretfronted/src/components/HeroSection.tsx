import React from 'react';
import { NavLink } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <div className="hero">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="intro-excerpt">
              <h1>CozyNest Mobilya<span className="d-block">Evinizin Sıcak Köşesi</span></h1>
              <p className="mb-4">CozyNest Mobilya ürünleriyle, rahatlık ve şıklığı bir arada yaşayın.</p>
              <p>
                <NavLink className="btn btn-secondary me-2" to="/shop">Alışverişe Başla</NavLink>
                <a href="#" className="btn btn-white-outline">Keşfet</a>
              </p>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="hero-img-wrap">
              <img src="images/couch.png" className="img-fluid" alt="Couch" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;