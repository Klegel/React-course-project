// src/components/Header.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Імпортуємо FontAwesomeIcon
import { faShoppingCart, faSun, faMoon, faFilter, faPlusCircle } from '@fortawesome/free-solid-svg-icons'; // Імпортуємо іконки
import './Header.css';
import './Header.css'; 

function Header({ totalCartItemCount, toggleTheme, currentTheme }) {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <header className="main-header fixed-top mb-4 p-3 rounded shadow-sm d-flex justify-content-between align-items-center">
      <Link to="/" className="app-title mb-0 text-decoration-none">SmartStore</Link>
      <nav className="d-flex align-items-center">
        {/* Кнопка "Товари" */}
        <Link to="/" className="btn btn-primary-outline me-2">Товари</Link>

        {/* Перемикач теми - Тепер з іконкою */}
        <button onClick={toggleTheme} className="theme-toggle-btn me-3" aria-label="Toggle theme">
          <FontAwesomeIcon icon={currentTheme === 'light' ? faMoon : faSun} /> {/* Використовуємо іконки */}
        </button>

        {/* Кнопка "Корзина" */}
        <Link to="/basket" className="btn btn-primary position-relative me-3">
          <FontAwesomeIcon icon={faShoppingCart} />
          <span className="visually-hidden">Кошик</span>
          {totalCartItemCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {totalCartItemCount}
              <span className="visually-hidden">товарів у корзині</span>
            </span>
          )}
        </Link>

        {/* Кнопки авторизації/реєстрації */}
        {currentUser ? (
          <>
            <span className="text-color me-2">Привіт, {currentUser.username}!</span>
            <button onClick={logout} className="btn btn-secondary-outline">Вийти</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary me-2">Увійти</Link>
            <Link to="/register" className="btn btn-secondary">Зареєструватися</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;