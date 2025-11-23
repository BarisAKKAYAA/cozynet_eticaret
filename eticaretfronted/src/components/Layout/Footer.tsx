import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="footer-section">
      <div className="container relative">

        <div className="sofa-img">
          <img src="../../../public/images/sofa.png" alt="Sofa" className="img-fluid" />
        </div>

        <div className="row g-5 mb-5">
          <div className="col-lg-4">
            <div className="mb-4 footer-logo-wrap">
              <NavLink to="/" className="footer-logo">CozyNest</NavLink>
            </div>
            <p className="mb-4">
              CozyNest Mobilya ürünleriyle, rahatlık ve şıklığı bir arada yaşayın.
            </p>
            <ul className="list-unstyled custom-social">
              <li><a href="#"><FontAwesomeIcon icon={faFacebookF} /></a></li>
              <li><a href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
              <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
              <li><a href="#"><FontAwesomeIcon icon={faLinkedin} /></a></li>
            </ul>
          </div>

          <div className="col-lg-8">
            <div className="row links-wrap">
             
              <div className="col-4 col-sm-4 col-md-4">
                <ul className="list-unstyled">
                  <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Anasayfa</NavLink></li>
                  <li><NavLink to="/shop" className={({ isActive }) => isActive ? 'active' : ''}>Ürünler</NavLink></li>
                  <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>Hakkımızda</NavLink></li>
                </ul>
              </div>

          
              <div className="col-4 col-sm-4 col-md-4">
                <ul className="list-unstyled">
                  <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>İletişim</NavLink></li>
                  <li><NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>Üye ol</NavLink></li>
                </ul>
              </div>

               <div className="col-4 col-sm-4 col-md-4">
                <ul className="list-unstyled">
                  <li><NavLink to="/cart" className={({ isActive }) => isActive ? 'active' : ''}>Sepetim</NavLink></li>
                  <li><NavLink to="/myorders" className={({ isActive }) => isActive ? 'active' : ''}>Siparişlerim</NavLink></li>
                </ul>
              </div>


            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
