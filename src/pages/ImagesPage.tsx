import React, { useState, useEffect, useRef, useMemo } from 'react';
import './ImagesPage.css';

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

const ImagesPage: React.FC = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isPaused, setIsPaused] = useState<boolean[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Todas las imágenes disponibles
  const availableImages: ImageItem[] = useMemo(() => [
    { src: a1, alt: 'Imagen A1', id: 'a1' },
    { src: a2, alt: 'Imagen A2', id: 'a2' },
    { src: disc1, alt: 'Disco 1', id: 'disc1' },
    { src: disc2, alt: 'Disco 2', id: 'disc2' },
    { src: disc3, alt: 'Disco 3', id: 'disc3' },
    { src: disc4, alt: 'Disco 4', id: 'disc4' },
    { src: logoNeto, alt: 'Logo Neto', id: 'logo' },
    { src: ytLogo, alt: 'YouTube Logo', id: 'yt' }
  ], []);

  useEffect(() => {
    // Duplicar y mezclar las imágenes para tener más contenido
    const duplicatedImages = [...availableImages, ...availableImages, ...availableImages];
    const shuffledImages = duplicatedImages.sort(() => Math.random() - 0.5);
    setImages(shuffledImages);
    
    // Inicializar el estado de pausa para cada columna
    const numColumns = Math.min(6, Math.floor(window.innerWidth / 200)); // Máximo 6 columnas
    setIsPaused(new Array(numColumns).fill(false));
  }, [availableImages]);

  // Función para dividir las imágenes en columnas
  const divideIntoColumns = (images: ImageItem[], numColumns: number) => {
    const columns: ImageItem[][] = Array.from({ length: numColumns }, () => []);
    
    images.forEach((image, index) => {
      const columnIndex = index % numColumns;
      columns[columnIndex].push(image);
    });
    
    return columns;
  };

  // Función para manejar el hover de las columnas
  const handleColumnHover = (columnIndex: number, isHovered: boolean) => {
    const newPaused = [...isPaused];
    newPaused[columnIndex] = isHovered;
    setIsPaused(newPaused);
  };

  // Calcular número de columnas basado en el ancho de pantalla
  const getNumColumns = () => {
    if (!containerRef.current) return 8;
    const containerWidth = containerRef.current.offsetWidth;
    return Math.min(10, Math.max(6, Math.floor(containerWidth / 150)));
  };

  const numColumns = getNumColumns();
  const imageColumns = divideIntoColumns(images, numColumns);

  return (
    <div className="images-page" ref={containerRef}>
      <div className="images-header">
        <h1 className="images-title">Gallery</h1>
      </div>
      
      <div className="images-container">
        {imageColumns.map((columnImages, columnIndex) => (
          <div
            key={columnIndex}
            className={`image-column ${columnIndex % 2 === 0 ? 'move-up' : 'move-down'} ${isPaused[columnIndex] ? 'paused' : ''}`}
            onMouseEnter={() => handleColumnHover(columnIndex, true)}
            onMouseLeave={() => handleColumnHover(columnIndex, false)}
          >
            {/* Duplicar las imágenes para crear un loop infinito */}
            <div className="image-column-content">
              {[...columnImages, ...columnImages].map((image, imageIndex) => (
                <div
                  key={`${columnIndex}-${imageIndex}`}
                  className="image-item"
                  style={{
                    height: `${Math.random() * 200 + 150}px`, // Altura variable entre 150-350px
                    width: '100%'
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="column-image"
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
                    <span className="image-title">{image.alt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesPage;
