import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface CustomColors {
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
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setCustomPalette: (colors: CustomColors | null) => void;
  customColors: CustomColors | null;
  cardStyle: 'normal' | 'inverted';
  toggleCardStyle: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first, then default to dark
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'dark';
  });

  const [customColors, setCustomColors] = useState<CustomColors | null>(() => {
    const saved = localStorage.getItem('customColors');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Si detectamos los colores morados antiguos, los reemplazamos con naranjas
      if (parsed.accentPrimary === '#8b5cf6' || parsed.accentPrimary === '#7b55ea') {
        const newColors = {
          ...parsed,
          accentPrimary: '#cd853f',
          accentSecondary: '#deb887',
          shadowColor: 'rgba(205, 133, 63, 0.2)'
        };
        localStorage.setItem('customColors', JSON.stringify(newColors));
        return newColors;
      }
      return parsed;
    }
    // Estilo inicial por defecto: Elegante Naranja/Dorado
    return {
      bgPrimary: '#000000',
      bgSecondary: '#111111',
      bgTertiary: '#1a1a1a',
      textPrimary: '#ffffff',
      textSecondary: '#e0e0e0',
      textMuted: '#a0a0a0',
      accentPrimary: '#cd853f',
      accentSecondary: '#deb887',
      borderColor: '#333333',
      shadowColor: 'rgba(205, 133, 63, 0.2)',
      navBg: 'rgba(0, 0, 0, 0.95)',
      cardBg: '#000000' // Cajas negras por defecto
    };
  });

  const [cardStyle, setCardStyle] = useState<'normal' | 'inverted'>('inverted'); // 'inverted' = cajas blancas (oscuro) / negras (claro) por defecto

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem('theme', theme);
    
    // Apply theme to document body
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Apply custom colors if available
    if (customColors) {
      document.body.setAttribute('data-custom-palette', 'true');
      
      // Apply card style (normal or inverted)
      let finalCardBg = customColors.cardBg;
      let finalCardTextPrimary = customColors.textPrimary;
      let finalCardTextSecondary = customColors.textSecondary;
      let finalCardTextMuted = customColors.textMuted;
      let finalBorderColor = customColors.borderColor;
      
      if (cardStyle === 'inverted') {
        if (theme === 'dark') {
          // Para temas oscuros: cajas blancas con texto negro
          finalCardBg = '#ffffff';
          finalCardTextPrimary = '#000000';
          finalCardTextSecondary = '#1a1a1a';
          finalCardTextMuted = '#4a4a4a';
          finalBorderColor = '#e5e7eb';
        } else {
          // Para temas claros: cajas negras con texto blanco
          finalCardBg = '#000000';
          finalCardTextPrimary = '#ffffff';
          finalCardTextSecondary = '#e0e0e0';
          finalCardTextMuted = '#a0a0a0';
          finalBorderColor = '#333333';
        }
      } else {
        // Estilo normal: usar los colores de la paleta
        finalCardBg = customColors.cardBg;
        finalCardTextPrimary = customColors.textPrimary;
        finalCardTextSecondary = customColors.textSecondary;
        finalCardTextMuted = customColors.textMuted;
        finalBorderColor = customColors.borderColor;
      }
      
      // Set CSS custom properties
      const root = document.documentElement;
      root.style.setProperty('--custom-bg-primary', customColors.bgPrimary);
      root.style.setProperty('--custom-bg-secondary', customColors.bgSecondary);
      root.style.setProperty('--custom-bg-tertiary', customColors.bgTertiary);
      // Los colores de texto principales NO cambian, solo los de las cajas
      root.style.setProperty('--custom-text-primary', customColors.textPrimary);
      root.style.setProperty('--custom-text-secondary', customColors.textSecondary);
      root.style.setProperty('--custom-text-muted', customColors.textMuted);
      root.style.setProperty('--custom-accent-primary', customColors.accentPrimary);
      root.style.setProperty('--custom-accent-secondary', customColors.accentSecondary);
      root.style.setProperty('--custom-border-color', finalBorderColor);
      root.style.setProperty('--custom-shadow-color', customColors.shadowColor);
      root.style.setProperty('--custom-nav-bg', customColors.navBg);
      // Solo las cajas y su texto cambian
      root.style.setProperty('--custom-card-bg', finalCardBg);
      root.style.setProperty('--custom-card-text-primary', finalCardTextPrimary);
      root.style.setProperty('--custom-card-text-secondary', finalCardTextSecondary);
      root.style.setProperty('--custom-card-text-muted', finalCardTextMuted);
      root.style.setProperty('--custom-card-border-color', finalBorderColor);
    } else {
      document.body.removeAttribute('data-custom-palette');
    }
  }, [customColors, cardStyle, theme]);

  useEffect(() => {
    // Save custom colors to localStorage
    if (customColors) {
      localStorage.setItem('customColors', JSON.stringify(customColors));
    }
  }, [customColors]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const setCustomPalette = (colors: CustomColors | null) => {
    setCustomColors(colors);
  };

  const toggleCardStyle = () => {
    setCardStyle(prev => prev === 'normal' ? 'inverted' : 'normal');
  };

  const value = {
    theme,
    toggleTheme,
    setCustomPalette,
    customColors,
    cardStyle,
    toggleCardStyle,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
