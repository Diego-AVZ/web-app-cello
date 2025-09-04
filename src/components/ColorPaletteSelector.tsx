import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './ColorPaletteSelector.css';

interface ColorPalette {
  id: string;
  name: string;
  type: 'cello' | 'classic';
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
  
  // Early return if context is not available
  if (!themeContext) {
    return null;
  }
  
  const { setCustomPalette, customColors } = themeContext;

  const celloPalettes: ColorPalette[] = [
    {
      id: 'cello-netos-choice',
      name: 'Neto - Mi Elección',
      type: 'cello',
      colors: {
        bgPrimary: '#000000',
        bgSecondary: '#1a1a1a',
        bgTertiary: '#2d2d2d',
        textPrimary: '#ffffff',
        textSecondary: '#d2691e',
        textMuted: '#cd853f',
        accentPrimary: '#d2691e',
        accentSecondary: '#cd853f',
        borderColor: '#8b4513',
        shadowColor: 'rgba(210, 105, 30, 0.3)',
        navBg: 'rgba(0, 0, 0, 0.95)',
        cardBg: 'rgba(26, 26, 26, 0.9)'
      }
    },
    {
      id: 'cello-classic',
      name: 'Cello Clásico',
      type: 'cello',
      colors: {
        bgPrimary: '#000000',
        bgSecondary: '#1a1a1a',
        bgTertiary: '#2d2d2d',
        textPrimary: '#ffffff',
        textSecondary: '#e0e0e0',
        textMuted: '#a0a0a0',
        accentPrimary: '#8b4513',
        accentSecondary: '#a0522d',
        borderColor: '#654321',
        shadowColor: 'rgba(139, 69, 19, 0.3)',
        navBg: 'rgba(0, 0, 0, 0.95)',
        cardBg: 'rgba(26, 26, 26, 0.9)'
      }
    },
    {
      id: 'cello-warm',
      name: 'Cello Cálido',
      type: 'cello',
      colors: {
        bgPrimary: '#000000',
        bgSecondary: '#1a1a1a',
        bgTertiary: '#2d2d2d',
        textPrimary: '#ffffff',
        textSecondary: '#e0e0e0',
        textMuted: '#a0a0a0',
        accentPrimary: '#d2691e',
        accentSecondary: '#cd853f',
        borderColor: '#8b4513',
        shadowColor: 'rgba(210, 105, 30, 0.3)',
        navBg: 'rgba(0, 0, 0, 0.95)',
        cardBg: 'rgba(26, 26, 26, 0.9)'
      }
    },
    {
      id: 'cello-rich',
      name: 'Cello Rico',
      type: 'cello',
      colors: {
        bgPrimary: '#000000',
        bgSecondary: '#1a1a1a',
        bgTertiary: '#2d2d2d',
        textPrimary: '#ffffff',
        textSecondary: '#e0e0e0',
        textMuted: '#a0a0a0',
        accentPrimary: '#a0522d',
        accentSecondary: '#b8860b',
        borderColor: '#654321',
        shadowColor: 'rgba(160, 82, 45, 0.3)',
        navBg: 'rgba(0, 0, 0, 0.95)',
        cardBg: 'rgba(26, 26, 26, 0.9)'
      }
    },
    {
      id: 'cello-golden',
      name: 'Cello Dorado',
      type: 'cello',
      colors: {
        bgPrimary: '#000000',
        bgSecondary: '#1a1a1a',
        bgTertiary: '#2d2d2d',
        textPrimary: '#ffffff',
        textSecondary: '#e0e0e0',
        textMuted: '#a0a0a0',
        accentPrimary: '#daa520',
        accentSecondary: '#bdb76b',
        borderColor: '#8b4513',
        shadowColor: 'rgba(218, 165, 32, 0.3)',
        navBg: 'rgba(0, 0, 0, 0.95)',
        cardBg: 'rgba(26, 26, 26, 0.9)'
      }
    },
    {
      id: 'cello-amber',
      name: 'Cello Ámbar',
      type: 'cello',
      colors: {
        bgPrimary: '#000000',
        bgSecondary: '#1a1a1a',
        bgTertiary: '#2d2d2d',
        textPrimary: '#ffffff',
        textSecondary: '#e0e0e0',
        textMuted: '#a0a0a0',
        accentPrimary: '#cd853f',
        accentSecondary: '#deb887',
        borderColor: '#8b4513',
        shadowColor: 'rgba(205, 133, 63, 0.3)',
        navBg: 'rgba(0, 0, 0, 0.95)',
        cardBg: 'rgba(26, 26, 26, 0.9)'
       }
     }
  ];

  const handlePaletteSelect = (palette: ColorPalette) => {
    setCustomPalette(palette.colors);
  };

  const handleReset = () => {
    setCustomPalette(null);
  };

  return (
    <div className="color-palette-selector">
      <h3>Paletas de Colores para Neto</h3>
      <p>Estilo Cello: Negro principal con acentos marrón anaranjado</p>
      
            <div className="palette-grid">
        {celloPalettes.map((palette) => (
                <div
                  key={palette.id}
            className={`palette-option ${palette.type} ${palette.id === 'cello-netos-choice' ? 'recommended' : ''}`}
                  onClick={() => handlePaletteSelect(palette)}
                >
                  <div className="palette-preview">
                    <div className="color-swatch" style={{ backgroundColor: palette.colors.bgPrimary }}></div>
              <div className="color-swatch" style={{ backgroundColor: palette.colors.bgSecondary }}></div>
                    <div className="color-swatch" style={{ backgroundColor: palette.colors.accentPrimary }}></div>
              <div className="color-swatch" style={{ backgroundColor: palette.colors.borderColor }}></div>
                  </div>
            <h4>{palette.name}</h4>
            <p className="palette-type">🎻 Cello</p>
            {palette.id === 'cello-netos-choice' && (
              <span className="recommended-badge">⭐ Recomendado</span>
            )}
                </div>
              ))}
            </div>

      <div className="palette-actions">
        <button onClick={handleReset} className="reset-button">
          🔄 Restaurar Colores Originales
        </button>
          </div>

      {customColors && (
        <div className="current-palette">
          <h4>Paleta Actual Personalizada</h4>
          <div className="current-colors">
            <div className="color-preview" style={{ backgroundColor: customColors.bgPrimary }}>
              <span>Principal</span>
                  </div>
            <div className="color-preview" style={{ backgroundColor: customColors.accentPrimary }}>
              <span>Acento</span>
                </div>
            <div className="color-preview" style={{ backgroundColor: customColors.textPrimary }}>
              <span>Texto</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPaletteSelector;
