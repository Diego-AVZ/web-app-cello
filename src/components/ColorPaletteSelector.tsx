import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './ColorPaletteSelector.css';

interface ColorPalette {
  id: string;
  name: string;
  type: 'dark' | 'light';
  colors: {
    bgPrimary: string;
    bgSecondary: string;
    bgTertiary: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    accentPrimary: string;
    accentSecondary: string;
    borderColor: string;
    shadowColor: string;
    navBg: string;
    cardBg: string;
  };
}

const ColorPaletteSelector: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPalette, setSelectedPalette] = useState<string>('');
  
  // Early return if context is not available
  if (!themeContext) {
    return null;
  }
  
  const { setCustomPalette, customColors } = themeContext;

  const darkPalettes: ColorPalette[] = [
    {
      id: 'dark-purple',
      name: 'Clásico Púrpura',
      type: 'dark',
      colors: {
        bgPrimary: '#000000',
        bgSecondary: '#111111',
        bgTertiary: '#1a1a1a',
        textPrimary: '#ffffff',
        textSecondary: '#e0e0e0',
        textMuted: '#a0a0a0',
        accentPrimary: '#8b5cf6',
        accentSecondary: '#a78bfa',
        borderColor: '#333333',
        shadowColor: 'rgba(139, 92, 246, 0.2)',
        navBg: 'rgba(0, 0, 0, 0.95)',
        cardBg: 'rgba(17, 17, 17, 0.9)'
      }
    },
    {
      id: 'dark-blue',
      name: 'Clásico Azul',
      type: 'dark',
      colors: {
        bgPrimary: '#000000',
        bgSecondary: '#111111',
        bgTertiary: '#1a1a1a',
        textPrimary: '#ffffff',
        textSecondary: '#e0e0e0',
        textMuted: '#a0a0a0',
        accentPrimary: '#3b82f6',
        accentSecondary: '#60a5fa',
        borderColor: '#333333',
        shadowColor: 'rgba(59, 130, 246, 0.2)',
        navBg: 'rgba(0, 0, 0, 0.95)',
        cardBg: 'rgba(17, 17, 17, 0.9)'
      }
    },
    {
      id: 'dark-green',
      name: 'Clásico Verde',
      type: 'dark',
      colors: {
        bgPrimary: '#000000',
        bgSecondary: '#111111',
        bgTertiary: '#1a1a1a',
        textPrimary: '#ffffff',
        textSecondary: '#e0e0e0',
        textMuted: '#a0a0a0',
        accentPrimary: '#10b981',
        accentSecondary: '#34d399',
        borderColor: '#333333',
        shadowColor: 'rgba(16, 185, 129, 0.2)',
        navBg: 'rgba(0, 0, 0, 0.95)',
        cardBg: 'rgba(17, 17, 17, 0.9)'
      }
    },
    {
      id: 'dark-red',
      name: 'Clásico Rojo',
      type: 'dark',
      colors: {
        bgPrimary: '#000000',
        bgSecondary: '#111111',
        bgTertiary: '#1a1a1a',
        textPrimary: '#ffffff',
        textSecondary: '#e0e0e0',
        textMuted: '#a0a0a0',
        accentPrimary: '#ef4444',
        accentSecondary: '#f87171',
        borderColor: '#333333',
        shadowColor: 'rgba(239, 68, 68, 0.2)',
        navBg: 'rgba(0, 0, 0, 0.95)',
        cardBg: 'rgba(17, 17, 17, 0.9)'
      }
    },
    {
      id: 'dark-orange',
      name: 'Clásico Naranja',
      type: 'dark',
      colors: {
        bgPrimary: '#000000',
        bgSecondary: '#111111',
        bgTertiary: '#1a1a1a',
        textPrimary: '#ffffff',
        textSecondary: '#e0e0e0',
        textMuted: '#a0a0a0',
        accentPrimary: '#f97316',
        accentSecondary: '#fb923c',
        borderColor: '#333333',
        shadowColor: 'rgba(249, 115, 22, 0.2)',
        navBg: 'rgba(0, 0, 0, 0.95)',
        cardBg: 'rgba(17, 17, 17, 0.9)'
      }
    },
    {
      id: 'dark-teal',
      name: 'Clásico Verde Azulado',
      type: 'dark',
      colors: {
        bgPrimary: '#000000',
        bgSecondary: '#111111',
        bgTertiary: '#1a1a1a',
        textPrimary: '#ffffff',
        textSecondary: '#e0e0e0',
        textMuted: '#a0a0a0',
        accentPrimary: '#14b8a6',
        accentSecondary: '#2dd4bf',
        borderColor: '#333333',
        shadowColor: 'rgba(20, 184, 166, 0.2)',
        navBg: 'rgba(0, 0, 0, 0.95)',
        cardBg: 'rgba(17, 17, 17, 0.9)'
      }
    },
    {
      id: 'dark-pink',
      name: 'Clásico Rosa',
      type: 'dark',
      colors: {
        bgPrimary: '#000000',
        bgSecondary: '#111111',
        bgTertiary: '#1a1a1a',
        textPrimary: '#ffffff',
        textSecondary: '#e0e0e0',
        textMuted: '#a0a0a0',
        accentPrimary: '#ec4899',
        accentSecondary: '#f472b6',
        borderColor: '#333333',
        shadowColor: 'rgba(236, 72, 153, 0.2)',
        navBg: 'rgba(0, 0, 0, 0.95)',
        cardBg: 'rgba(17, 17, 17, 0.9)'
      }
    },
    {
      id: 'dark-yellow',
      name: 'Clásico Amarillo',
      type: 'dark',
      colors: {
        bgPrimary: '#000000',
        bgSecondary: '#111111',
        bgTertiary: '#1a1a1a',
        textPrimary: '#ffffff',
        textSecondary: '#e0e0e0',
        textMuted: '#a0a0a0',
        accentPrimary: '#eab308',
        accentSecondary: '#facc15',
        borderColor: '#333333',
        shadowColor: 'rgba(234, 179, 8, 0.2)',
        navBg: 'rgba(0, 0, 0, 0.95)',
        cardBg: 'rgba(17, 17, 17, 0.9)'
      }
    },
    {
      id: 'dark-indigo',
      name: 'Clásico Índigo',
      type: 'dark',
      colors: {
        bgPrimary: '#000000',
        bgSecondary: '#111111',
        bgTertiary: '#1a1a1a',
        textPrimary: '#ffffff',
        textSecondary: '#e0e0e0',
        textMuted: '#a0a0a0',
        accentPrimary: '#6366f1',
        accentSecondary: '#818cf8',
        borderColor: '#333333',
        shadowColor: 'rgba(99, 102, 241, 0.2)',
        navBg: 'rgba(0, 0, 0, 0.95)',
        cardBg: 'rgba(17, 17, 17, 0.9)'
      }
    },
    {
      id: 'dark-cyan',
      name: 'Clásico Cian',
      type: 'dark',
      colors: {
        bgPrimary: '#000000',
        bgSecondary: '#111111',
        bgTertiary: '#1a1a1a',
        textPrimary: '#ffffff',
        textSecondary: '#e0e0e0',
        textMuted: '#a0a0a0',
        accentPrimary: '#06b6d4',
        accentSecondary: '#22d3ee',
        borderColor: '#333333',
        shadowColor: 'rgba(6, 182, 212, 0.2)',
        navBg: 'rgba(0, 0, 0, 0.95)',
        cardBg: 'rgba(17, 17, 17, 0.9)'
      }
    },
         {
       id: 'dark-rose',
       name: 'Clásico Rosa Oscuro',
       type: 'dark',
       colors: {
         bgPrimary: '#000000',
         bgSecondary: '#111111',
         bgTertiary: '#1a1a1a',
         textPrimary: '#ffffff',
         textSecondary: '#e0e0e0',
         textMuted: '#a0a0a0',
         accentPrimary: '#f43f5e',
         accentSecondary: '#fb7185',
         borderColor: '#333333',
         shadowColor: 'rgba(244, 63, 94, 0.2)',
         navBg: 'rgba(0, 0, 0, 0.95)',
         cardBg: 'rgba(17, 17, 17, 0.9)'
       }
     },
     {
       id: 'dark-simple',
       name: 'Simple Blanco y Negro',
       type: 'dark',
       colors: {
         bgPrimary: '#000000',
         bgSecondary: '#000000',
         bgTertiary: '#000000',
         textPrimary: '#ffffff',
         textSecondary: '#ffffff',
         textMuted: '#cccccc',
         accentPrimary: '#ffffff',
         accentSecondary: '#ffffff',
         borderColor: '#ffffff',
         shadowColor: 'rgba(255, 255, 255, 0.1)',
         navBg: 'rgba(0, 0, 0, 0.95)',
         cardBg: 'rgba(0, 0, 0, 0.9)'
       }
     }
  ];

  const lightPalettes: ColorPalette[] = [
    {
      id: 'light-indigo',
      name: 'Clásico Índigo',
      type: 'light',
      colors: {
        bgPrimary: '#ffffff',
        bgSecondary: '#f8f9fa',
        bgTertiary: '#e9ecef',
        textPrimary: '#1a1a1a',
        textSecondary: '#4a4a4a',
        textMuted: '#6a6a6a',
        accentPrimary: '#6366f1',
        accentSecondary: '#8b5cf6',
        borderColor: '#e5e7eb',
        shadowColor: 'rgba(99, 102, 241, 0.1)',
        navBg: 'rgba(255, 255, 255, 0.95)',
        cardBg: 'rgba(248, 249, 250, 0.9)'
      }
    },
    {
      id: 'light-blue',
      name: 'Clásico Azul',
      type: 'light',
      colors: {
        bgPrimary: '#ffffff',
        bgSecondary: '#f8f9fa',
        bgTertiary: '#e9ecef',
        textPrimary: '#1a1a1a',
        textSecondary: '#4a4a4a',
        textMuted: '#6a6a6a',
        accentPrimary: '#3b82f6',
        accentSecondary: '#60a5fa',
        borderColor: '#e5e7eb',
        shadowColor: 'rgba(59, 130, 246, 0.1)',
        navBg: 'rgba(255, 255, 255, 0.95)',
        cardBg: 'rgba(248, 249, 250, 0.9)'
      }
    },
    {
      id: 'light-green',
      name: 'Clásico Verde',
      type: 'light',
      colors: {
        bgPrimary: '#ffffff',
        bgSecondary: '#f8f9fa',
        bgTertiary: '#e9ecef',
        textPrimary: '#1a1a1a',
        textSecondary: '#4a4a4a',
        textMuted: '#6a6a6a',
        accentPrimary: '#10b981',
        accentSecondary: '#34d399',
        borderColor: '#e5e7eb',
        shadowColor: 'rgba(16, 185, 129, 0.1)',
        navBg: 'rgba(255, 255, 255, 0.95)',
        cardBg: 'rgba(248, 249, 250, 0.9)'
      }
    },
    {
      id: 'light-red',
      name: 'Clásico Rojo',
      type: 'light',
      colors: {
        bgPrimary: '#ffffff',
        bgSecondary: '#f8f9fa',
        bgTertiary: '#e9ecef',
        textPrimary: '#1a1a1a',
        textSecondary: '#4a4a4a',
        textMuted: '#6a6a6a',
        accentPrimary: '#ef4444',
        accentSecondary: '#f87171',
        borderColor: '#e5e7eb',
        shadowColor: 'rgba(239, 68, 68, 0.1)',
        navBg: 'rgba(255, 255, 255, 0.95)',
        cardBg: 'rgba(248, 249, 250, 0.9)'
      }
    },
    {
      id: 'light-orange',
      name: 'Clásico Naranja',
      type: 'light',
      colors: {
        bgPrimary: '#ffffff',
        bgSecondary: '#f8f9fa',
        bgTertiary: '#e9ecef',
        textPrimary: '#1a1a1a',
        textSecondary: '#4a4a4a',
        textMuted: '#6a6a6a',
        accentPrimary: '#f97316',
        accentSecondary: '#fb923c',
        borderColor: '#e5e7eb',
        shadowColor: 'rgba(249, 115, 22, 0.1)',
        navBg: 'rgba(255, 255, 255, 0.95)',
        cardBg: 'rgba(248, 249, 250, 0.9)'
      }
    },
    {
      id: 'light-teal',
      name: 'Clásico Verde Azulado',
      type: 'light',
      colors: {
        bgPrimary: '#ffffff',
        bgSecondary: '#f8f9fa',
        bgTertiary: '#e9ecef',
        textPrimary: '#1a1a1a',
        textSecondary: '#4a4a4a',
        textMuted: '#6a6a6a',
        accentPrimary: '#14b8a6',
        accentSecondary: '#2dd4bf',
        borderColor: '#e5e7eb',
        shadowColor: 'rgba(20, 184, 166, 0.1)',
        navBg: 'rgba(255, 255, 255, 0.95)',
        cardBg: 'rgba(248, 249, 250, 0.9)'
      }
    },
    {
      id: 'light-pink',
      name: 'Clásico Rosa',
      type: 'light',
      colors: {
        bgPrimary: '#ffffff',
        bgSecondary: '#f8f9fa',
        bgTertiary: '#e9ecef',
        textPrimary: '#1a1a1a',
        textSecondary: '#4a4a4a',
        textMuted: '#6a6a6a',
        accentPrimary: '#ec4899',
        accentSecondary: '#f472b6',
        borderColor: '#e5e7eb',
        shadowColor: 'rgba(236, 72, 153, 0.1)',
        navBg: 'rgba(255, 255, 255, 0.95)',
        cardBg: 'rgba(248, 249, 250, 0.9)'
      }
    },
    {
      id: 'light-yellow',
      name: 'Clásico Amarillo',
      type: 'light',
      colors: {
        bgPrimary: '#ffffff',
        bgSecondary: '#f8f9fa',
        bgTertiary: '#e9ecef',
        textPrimary: '#1a1a1a',
        textSecondary: '#4a4a4a',
        textMuted: '#6a6a6a',
        accentPrimary: '#eab308',
        accentSecondary: '#facc15',
        borderColor: '#e5e7eb',
        shadowColor: 'rgba(234, 179, 8, 0.1)',
        navBg: 'rgba(255, 255, 255, 0.95)',
        cardBg: 'rgba(248, 249, 250, 0.9)'
      }
    },
    {
      id: 'light-purple',
      name: 'Clásico Púrpura',
      type: 'light',
      colors: {
        bgPrimary: '#ffffff',
        bgSecondary: '#f8f9fa',
        bgTertiary: '#e9ecef',
        textPrimary: '#1a1a1a',
        textSecondary: '#4a4a4a',
        textMuted: '#6a6a6a',
        accentPrimary: '#8b5cf6',
        accentSecondary: '#a78bfa',
        borderColor: '#e5e7eb',
        shadowColor: 'rgba(139, 92, 246, 0.1)',
        navBg: 'rgba(255, 255, 255, 0.95)',
        cardBg: 'rgba(248, 249, 250, 0.9)'
      }
    },
         {
       id: 'light-cyan',
       name: 'Clásico Cian',
       type: 'light',
       colors: {
         bgPrimary: '#ffffff',
         bgSecondary: '#f8f9fa',
         bgTertiary: '#e9ecef',
         textPrimary: '#1a1a1a',
         textSecondary: '#4a4a4a',
         textMuted: '#6a6a6a',
         accentPrimary: '#06b6d4',
         accentSecondary: '#22d3ee',
         borderColor: '#e5e7eb',
         shadowColor: 'rgba(6, 182, 212, 0.1)',
         navBg: 'rgba(255, 255, 255, 0.95)',
         cardBg: 'rgba(248, 249, 250, 0.9)'
       }
     },
     {
       id: 'light-simple',
       name: 'Simple Blanco y Negro',
       type: 'light',
       colors: {
         bgPrimary: '#ffffff',
         bgSecondary: '#ffffff',
         bgTertiary: '#ffffff',
         textPrimary: '#000000',
         textSecondary: '#000000',
         textMuted: '#333333',
         accentPrimary: '#000000',
         accentSecondary: '#000000',
         borderColor: '#000000',
         shadowColor: 'rgba(0, 0, 0, 0.1)',
         navBg: 'rgba(255, 255, 255, 0.95)',
         cardBg: 'rgba(255, 255, 255, 0.9)'
       }
     }
  ];

  const handlePaletteSelect = (palette: ColorPalette) => {
    setSelectedPalette(palette.id);
    setCustomPalette(palette.colors);
    setIsOpen(false);
  };

  const handleResetPalette = () => {
    setSelectedPalette('');
    setCustomPalette(null);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  if (!isOpen) {
    return (
      <button 
        className={`palette-selector-trigger ${customColors ? 'has-custom-palette' : ''}`} 
        onClick={toggleModal}
        title={customColors ? 'Paleta personalizada activa' : 'Seleccionar paleta de colores'}
      >
        🎨
        {customColors && <span className="palette-indicator">●</span>}
      </button>
    );
  }

  return (
    <div className="palette-selector-overlay" onClick={toggleModal}>
      <div className="palette-selector-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Seleccionar Paleta de Colores</h3>
                     <div className="header-actions">
             {customColors && (
               <button className="reset-btn" onClick={handleResetPalette}>
                 🔄 Resetear
               </button>
             )}
             <button className="close-btn" onClick={toggleModal}>×</button>
           </div>
        </div>
        
        <div className="palette-sections">
          <div className="palette-section">
            <h4>🌙 Temas Oscuros</h4>
            <div className="palette-grid">
              {darkPalettes.map((palette) => (
                <div
                  key={palette.id}
                  className={`palette-card ${selectedPalette === palette.id ? 'selected' : ''}`}
                  onClick={() => handlePaletteSelect(palette)}
                >
                  <div className="palette-preview">
                    <div className="color-swatch" style={{ backgroundColor: palette.colors.bgPrimary }}></div>
                    <div className="color-swatch" style={{ backgroundColor: palette.colors.accentPrimary }}></div>
                    <div className="color-swatch" style={{ backgroundColor: palette.colors.bgSecondary }}></div>
                  </div>
                  <span className="palette-name">{palette.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="palette-section">
            <h4>☀️ Temas Claros</h4>
            <div className="palette-grid">
              {lightPalettes.map((palette) => (
                <div
                  key={palette.id}
                  className={`palette-card ${selectedPalette === palette.id ? 'selected' : ''}`}
                  onClick={() => handlePaletteSelect(palette)}
                >
                  <div className="palette-preview">
                    <div className="color-swatch" style={{ backgroundColor: palette.colors.bgPrimary }}></div>
                    <div className="color-swatch" style={{ backgroundColor: palette.colors.accentPrimary }}></div>
                    <div className="color-swatch" style={{ backgroundColor: palette.colors.bgSecondary }}></div>
                  </div>
                  <span className="palette-name">{palette.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPaletteSelector;
