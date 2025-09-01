import React from 'react';
import './PageTemplate.css';

const Bio: React.FC = () => {
  return (
    <div className="page-template">
      <div className="page-container">
        <h1>BIO</h1>
        <p>Conoce la trayectoria musical de Adolfo Gutiérrez Arenas</p>
        <div className="content-placeholder">
          <p>Biografía y trayectoria musical próximamente...</p>
        </div>
      </div>
    </div>
  );
};

export default Bio;
