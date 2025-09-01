import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/bio', label: 'BIO' },
    { path: '/out-the-music', label: 'Out the music' },
    { path: '/contacto', label: 'Contact ▼' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="logo-section">
          <div className="logo-icon">🎻</div>
          <div className="logo-text">
            <h1 className="logo-name">Adolfo Gutiérrez Arenas</h1>
          </div>
        </div>
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link 
                to={item.path} 
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="add-section-btn">
          <span className="btn-icon">+</span>
          <span className="btn-text">Añadir sección</span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
