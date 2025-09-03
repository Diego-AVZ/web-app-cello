import React, { useState, useEffect, useCallback } from 'react';
import './ImageCarousel.css';

interface ImageItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

interface ImageCarouselProps {
  images: ImageItem[];
  autoPlayInterval?: number; // en milisegundos
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images, 
  autoPlayInterval = 3000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Función para ir a la siguiente imagen
  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  // Función para ir a la imagen anterior
  const prevImage = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  // Función para ir a una imagen específica
  const goToImage = (index: number) => {
    setCurrentIndex(index);
    // Reiniciar el autoplay cuando se hace clic manual
    setIsAutoPlaying(true);
  };

  // Autoplay automático
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextImage();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, nextImage]);

  // Pausar autoplay al hacer hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevImage();
        setIsAutoPlaying(false);
      } else if (event.key === 'ArrowRight') {
        nextImage();
        setIsAutoPlaying(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevImage, nextImage]);

  if (!images || images.length === 0) {
    return <div>No hay imágenes disponibles</div>;
  }

  const currentImage = images[currentIndex];

  return (
    <div 
      className="image-carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Imagen principal */}
      <div className="carousel-image-container">
        <img 
          src={currentImage.src} 
          alt={currentImage.alt} 
          className="carousel-image"
        />
        
        {/* Overlay con información */}
        <div className="image-overlay">
          <div className="image-info">
            <h3 className="image-title">{currentImage.title}</h3>
            <p className="image-subtitle">{currentImage.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Flechas de navegación */}
      {images.length > 1 && (
        <>
          <button 
            className="carousel-arrow carousel-arrow-left"
            onClick={prevImage}
            aria-label="Imagen anterior"
          >
            ‹
          </button>
          
          <button 
            className="carousel-arrow carousel-arrow-right"
            onClick={nextImage}
            aria-label="Siguiente imagen"
          >
            ›
          </button>
        </>
      )}

      {/* Indicadores de puntos */}
      {images.length > 1 && (
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToImage(index)}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
