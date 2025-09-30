import React, { useState, useEffect, useRef } from 'react';
import './MusicPage.css';

// Importar todas las imágenes disponibles
import a1 from '../assets/images/a1.png';
import a2 from '../assets/images/a2.png';
import disc1 from '../assets/images/disc1.jpg';
import disc2 from '../assets/images/disc2.webp';
import disc3 from '../assets/images/disc3.webp';
import disc4 from '../assets/images/disc4.jpg';
import logoNeto from '../assets/images/logo_neto.png';
import ytLogo from '../assets/images/yt-logo.png';

interface ImageItem {
  src: string;
  alt: string;
  id: string;
}

interface GridLayout {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  image: ImageItem;
}

const MusicPage: React.FC = () => {
  const [currentLayout, setCurrentLayout] = useState<GridLayout[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Todas las imágenes disponibles
  const availableImages: ImageItem[] = [
    { src: a1, alt: 'Imagen A1', id: 'a1' },
    { src: a2, alt: 'Imagen A2', id: 'a2' },
    { src: disc1, alt: 'Disco 1', id: 'disc1' },
    { src: disc2, alt: 'Disco 2', id: 'disc2' },
    { src: disc3, alt: 'Disco 3', id: 'disc3' },
    { src: disc4, alt: 'Disco 4', id: 'disc4' },
    { src: logoNeto, alt: 'Logo Neto', id: 'logo' },
    { src: ytLogo, alt: 'YouTube Logo', id: 'yt' }
  ];

  // Generar un layout aleatorio
  const generateRandomLayout = (): GridLayout[] => {
    const numImages = Math.floor(Math.random() * 4) + 6; // Entre 6 y 9 imágenes
    const selectedImages = availableImages
      .sort(() => Math.random() - 0.5)
      .slice(0, numImages);
    
    const layouts: GridLayout[] = [];
    let currentY = 0;
    let currentX = 0;
    const maxWidth = 100; // Porcentaje del contenedor
    const maxHeight = 100; // Porcentaje del contenedor

    // Generar posiciones y tamaños aleatorios
    selectedImages.forEach((image, index) => {
      const width = Math.random() * 40 + 20; // Entre 20% y 60% del ancho
      const height = Math.random() * 40 + 20; // Entre 20% y 60% del alto
      
      // Ajustar posición si se sale del contenedor
      let x = Math.random() * (maxWidth - width);
      let y = Math.random() * (maxHeight - height);
      
      // Asegurar que no se superpongan demasiado
      const minDistance = 5;
      let attempts = 0;
      while (attempts < 10) {
        const hasOverlap = layouts.some(layout => 
          Math.abs(layout.x - x) < minDistance && Math.abs(layout.y - y) < minDistance
        );
        if (!hasOverlap) break;
        x = Math.random() * (maxWidth - width);
        y = Math.random() * (maxHeight - height);
        attempts++;
      }

      layouts.push({
        id: `${image.id}-${index}`,
        x,
        y,
        width,
        height,
        image
      });
    });

    return layouts;
  };

  // Función para reorganizar el grid
  const reorganizeGrid = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const newLayout = generateRandomLayout();
    setCurrentLayout(newLayout);
    
    // Resetear el estado de transición después de la animación
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  useEffect(() => {
    // Inicializar con el primer layout
    setCurrentLayout(generateRandomLayout());
    
    // Configurar el intervalo para reorganizar cada 4-6 segundos
    const startInterval = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        reorganizeGrid();
      }, Math.random() * 2000 + 4000); // Entre 4 y 6 segundos
    };

    startInterval();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="music-page">
      <div className="music-content">
        {/* Columna izquierda - Título y descripción */}
        <div className="music-info">
          <h1 className="music-title">Out of the Music</h1>
          <p className="music-description">
            Una experiencia visual dinámica donde las imágenes se reorganizan constantemente, 
            creando un flujo visual que refleja la naturaleza fluida de la música. 
            Cada reorganización es única, como cada interpretación musical.
          </p>
          <div className="music-controls">
            <button 
              className="reorganize-btn"
              onClick={reorganizeGrid}
              disabled={isTransitioning}
            >
              {isTransitioning ? 'Reorganizando...' : 'Reorganizar Ahora'}
            </button>
          </div>
        </div>

        {/* Columna derecha - Grid dinámico de imágenes */}
        <div className="music-visual" ref={containerRef}>
          <div className={`dynamic-grid ${isTransitioning ? 'transitioning' : ''}`}>
            {currentLayout.map((layout) => (
              <div
                key={layout.id}
                className="grid-item"
                style={{
                  left: `${layout.x}%`,
                  top: `${layout.y}%`,
                  width: `${layout.width}%`,
                  height: `${layout.height}%`,
                  transition: isTransitioning ? 'all 1s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
                }}
              >
                <img
                  src={layout.image.src}
                  alt={layout.image.alt}
                  className="grid-image"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const noImageDiv = document.createElement('div');
                    noImageDiv.className = 'no-image-placeholder';
                    noImageDiv.textContent = 'No Image';
                    target.parentNode?.appendChild(noImageDiv);
                  }}
                />
                <div className="image-overlay">
                  <span className="image-title">{layout.image.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
