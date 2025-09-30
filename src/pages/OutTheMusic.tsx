import React, { useState, useEffect, useRef, useCallback } from 'react';
import './OutTheMusic.css';

// Importar todas las imágenes de outMusic
import outMusic1 from '../assets/images/outMusic/20240920_155432.jpg';
import outMusic2 from '../assets/images/outMusic/20250210_173620.jpg';
import outMusic3 from '../assets/images/outMusic/FB_IMG_1756722524195.jpg';
import outMusic4 from '../assets/images/outMusic/IMG-20231013-WA0026.jpg';
import outMusic5 from '../assets/images/outMusic/IMG-20250618-WA0009.jpg';
import outMusic6 from '../assets/images/outMusic/IMG-20250828-WA0003.jpg';
import outMusic7 from '../assets/images/outMusic/IMG-20250828-WA0007.jpg';
import outMusic8 from '../assets/images/outMusic/IMG-20250828-WA0015.jpg';

interface ImageItem {
  src: string;
  alt: string;
  id: string;
}

const OutTheMusic: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Todas las imágenes de outMusic
  const availableImages: ImageItem[] = [
    { src: outMusic1, alt: 'Out Music Moment 1', id: 'outmusic1' },
    { src: outMusic2, alt: 'Out Music Moment 2', id: 'outmusic2' },
    { src: outMusic3, alt: 'Out Music Moment 3', id: 'outmusic3' },
    { src: outMusic4, alt: 'Out Music Moment 4', id: 'outmusic4' },
    { src: outMusic5, alt: 'Out Music Moment 5', id: 'outmusic5' },
    { src: outMusic6, alt: 'Out Music Moment 6', id: 'outmusic6' },
    { src: outMusic7, alt: 'Out Music Moment 7', id: 'outmusic7' },
    { src: outMusic8, alt: 'Out Music Moment 8', id: 'outmusic8' }
  ];

  // Función para ir a la siguiente imagen
  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === availableImages.length - 1 ? 0 : prevIndex + 1
    );
  }, [availableImages.length]);

  // Función para ir a una imagen específica
  const goToImage = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(true);
  };

  // Autoplay automático
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextImage();
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextImage]);

  // Pausar autoplay al hacer hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);


  return (
    <div className="out-the-music-page">
      <div className="out-music-container">
        {/* Sección izquierda - Texto */}
        <div className="out-music-text-section">
          <div className="text-content">
            <h1 className="out-music-title">Out The Music</h1>
            <p className="out-music-description">
              Beyond the concert hall, Adolfo finds his rhythm in the ocean waves. 
              An avid surfer, he draws inspiration from the fluid movements of the sea, 
              translating the natural flow of waves into the expressive language of his cello.
            </p>
            <p className="out-music-description">
              This dynamic gallery captures the essence of his dual passions - 
              the precision of classical music and the freedom of surfing, 
              creating a visual symphony that moves with the same organic energy.
            </p>
          </div>
        </div>

        {/* Sección derecha - Carrusel elegante */}
        <div className="out-music-gallery-section">
          <div 
            className="out-music-carousel" 
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="carousel-image-container">
              <img 
                src={availableImages[currentIndex].src} 
                alt={availableImages[currentIndex].alt} 
                className="carousel-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const noImageDiv = document.createElement('div');
                  noImageDiv.className = 'no-image-placeholder';
                  noImageDiv.textContent = 'No Image';
                  target.parentNode?.appendChild(noImageDiv);
                }}
              />
              
              {/* Overlay con información */}
              <div className="image-overlay">
                <div className="image-info">
                  <h3 className="image-title">Out The Music</h3>
                  <p className="image-subtitle">Surfing & Music Moments</p>
                </div>
              </div>
            </div>

            {/* Indicadores de puntos */}
            <div className="carousel-indicators">
              {availableImages.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToImage(index)}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutTheMusic;
