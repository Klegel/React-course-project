// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer mt-5 py-4 bg-dark text-white">
      {/* НОВИЙ ЕЛЕМЕНТ: Полоска, що відділяє основний контент від футера */}
      <div className="footer-top-line"></div> {/* Додано полоску зверху */}

      <div className="container">
        <div className="row">
          {/* Контакти */}
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="text-white mb-3">Контакти</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                Івано-Франківськ, Україна
              </li>
              <li className="mb-2">
                <FontAwesomeIcon icon={faPhone} className="me-2" />
                +38 (0XX) XXX-XX-XX
              </li>
              <li className="mb-2">
                <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                info@example.com
              </li>
            </ul>
          </div>

          {/* Соціальні мережі */}
          <div className="col-md-4 mb-3 mb-md-0 text-center">
            <h5 className="text-white mb-3">Ми в соцмережах</h5>
            <div className="d-flex justify-content-center">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
            </div>
          </div>

          {/* Навігація або додаткова інформація (можна змінити) */}
          <div className="col-md-4">
            <h5 className="text-white mb-3">Інформація</h5>
            <ul className="list-unstyled">
              <li><Link to="/contact" className="text-white text-decoration-none">Зв'язатись з нами</Link></li>
              <li><Link to="/order-history" className="text-white text-decoration-none">Історія замовлень</Link></li>
              <li><Link to="/about" className="text-white text-decoration-none">Про нас</Link></li>
            </ul>
          </div>
        </div>
        {/* Ця лінія буде внутрішньою, якщо вона має залишатися */}
        <hr className="footer-line my-3" />
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} SmartStore. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;