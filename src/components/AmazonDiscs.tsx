import React from 'react';
import './AmazonDiscs.css';

interface Disc {
  id: string;
  title: string;
  artist: string;
  year: string;
  coverImage: string;
  amazonUrl: string;
  description?: string;
  storeType?: 'amazon' | 'presto' | 'ibs' | 'other';
}

interface AmazonDiscsProps {
  discs: Disc[];
  title?: string;
}

const AmazonDiscs: React.FC<AmazonDiscsProps> = ({ 
  discs, 
  title = "Discografía" 
}) => {
  const handleStoreClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getStoreInfo = (url: string) => {
    if (url.includes('amazon')) {
      return { name: 'Amazon', icon: '🛒', color: '#ff9500' };
    } else if (url.includes('prestomusic')) {
      return { name: 'Presto Music', icon: '🎵', color: '#4a90e2' };
    } else if (url.includes('ibsclassical')) {
      return { name: 'IBS Classical', icon: '🎼', color: '#8e44ad' };
    } else {
      return { name: 'Comprar', icon: '🛍️', color: '#27ae60' };
    }
  };

  return (
    <section className="amazon-discs-section">
      <div className="discs-container">
        <h2 className="discs-section-title">{title}</h2>
        <p className="discs-section-subtitle">
          Descubre mis grabaciones disponibles en diferentes plataformas
        </p>
        
        <div className="discs-grid">
          {discs.map((disc) => (
            <div key={disc.id} className="disc-card">
              <div className="disc-cover">
                <img 
                  src={disc.coverImage} 
                  alt={`Portada de ${disc.title}`}
                  className="disc-image"
                />
                <div className="disc-overlay">
                  <button 
                    className="store-button"
                    onClick={() => handleStoreClick(disc.amazonUrl)}
                    title={`Comprar en ${getStoreInfo(disc.amazonUrl).name}`}
                    style={{ backgroundColor: getStoreInfo(disc.amazonUrl).color }}
                  >
                    <span className="store-icon">{getStoreInfo(disc.amazonUrl).icon}</span>
                    <span className="store-text">Comprar en {getStoreInfo(disc.amazonUrl).name}</span>
                  </button>
                </div>
              </div>
              
              <div className="disc-info">
                <h3 className="disc-title">{disc.title}</h3>
                <p className="disc-artist">{disc.artist}</p>
                <p className="disc-year">{disc.year}</p>
                {disc.description && (
                  <p className="disc-description">{disc.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="discs-footer">
          <p className="store-disclaimer">
            * Enlaces a diferentes plataformas de música clásica. Algunos pueden ser enlaces de afiliado.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AmazonDiscs;
