import React from 'react';
import './PageTemplate.css';

const Contacto: React.FC = () => {
  return (
    <div className="page-template">
      <div className="page-container">
        <h1>Contacto</h1>
        <p>¿Tienes alguna pregunta? ¡Nos encantaría escucharte!</p>
        <div className="content-placeholder">
          <p>Formulario de contacto próximamente...</p>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
