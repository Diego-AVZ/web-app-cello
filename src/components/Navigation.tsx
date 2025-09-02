import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import ColorPaletteSelector from './ColorPaletteSelector';
import './Navigation.css';

const Navigation: React.FC = () => {
  const location = useLocation();
  const themeContext = useContext(ThemeContext);
  
  // Early return if context is not available
  if (!themeContext) {
    return null;
  }
  
  const { theme, toggleTheme, cardStyle, toggleCardStyle } = themeContext;

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
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button 
          className="card-style-toggle-btn" 
          onClick={toggleCardStyle}
          title={cardStyle === 'inverted' ? 'Cambiar a cajas normales' : 'Cambiar a cajas invertidas'}
        >
          {cardStyle === 'inverted' ? '📦' : '⬜'}
        </button>
      </div>
      <ColorPaletteSelector />
    </nav>
  );
};

export default Navigation;
