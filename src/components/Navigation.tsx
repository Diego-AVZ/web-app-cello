import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';
import logoImage from '../assets/images/logo_neto.png';
import FontStyleEditor from './FontStyleEditor';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isFontStyleEditorOpen, setIsFontStyleEditorOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/bio', label: 'BIO' },
    { path: '/out-the-music', label: 'Out the music' },
    { path: '/contacto', label: 'Contact ▼' }
  ];
//
  return (
    <>
      <nav className="navigation">
        <div className="nav-container">
          <div className="logo-section">
            <div className="logo-icon">
              <img src={logoImage} alt="Neto Logo" className="logo-image" />
            </div>
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
          <button 
            className="text-editor-btn"
            onClick={() => setIsFontStyleEditorOpen(true)}
            title="Editor de Estilos de Fuente"
          >
            🎨 Estilos
          </button>
        </div>
      </nav>
      
      <FontStyleEditor
        isOpen={isFontStyleEditorOpen}
        onClose={() => setIsFontStyleEditorOpen(false)}
      />
    </>
  );
};

export default Navigation;
