import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface FontStyles {
  title: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    color: string;
    letterSpacing: string;
  };
  subtitle: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    color: string;
    letterSpacing: string;
  };
  bodyText: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    color: string;
    lineHeight: string;
  };
}

interface FontStyleContextType {
  fontStyles: FontStyles;
  updateFontStyles: (styles: FontStyles) => void;
  applyStylesToDOM: () => void;
}

const defaultStyles: FontStyles = {
  title: {
    fontFamily: 'Georgia, serif',
    fontSize: '28px',
    fontWeight: '600',
    color: '#cd853f',
    letterSpacing: '0px'
  },
  subtitle: {
    fontFamily: 'Georgia, serif',
    fontSize: '24px',
    fontWeight: '500',
    color: '#deb887',
    letterSpacing: '0px'
  },
  bodyText: {
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    fontWeight: '400',
    color: '#e0e0e0',
    lineHeight: '1.5'
  }
};

const FontStyleContext = createContext<FontStyleContextType | undefined>(undefined);

export const FontStyleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontStyles, setFontStyles] = useState<FontStyles>(defaultStyles);

  const updateFontStyles = (styles: FontStyles) => {
    setFontStyles(styles);
    // Guardar en localStorage para persistencia
    localStorage.setItem('fontStyles', JSON.stringify(styles));
  };

  const applyStylesToDOM = useCallback(() => {
    // Aplicar estilos a elementos específicos de la web
    const root = document.documentElement;
    
    // Estilos para títulos
    root.style.setProperty('--title-font-family', fontStyles.title.fontFamily);
    root.style.setProperty('--title-font-size', fontStyles.title.fontSize);
    root.style.setProperty('--title-font-weight', fontStyles.title.fontWeight);
    root.style.setProperty('--title-color', fontStyles.title.color);
    root.style.setProperty('--title-letter-spacing', fontStyles.title.letterSpacing);
    
    // Estilos para subtítulos
    root.style.setProperty('--subtitle-font-family', fontStyles.subtitle.fontFamily);
    root.style.setProperty('--subtitle-font-size', fontStyles.subtitle.fontSize);
    root.style.setProperty('--subtitle-font-weight', fontStyles.subtitle.fontWeight);
    root.style.setProperty('--subtitle-color', fontStyles.subtitle.color);
    root.style.setProperty('--subtitle-letter-spacing', fontStyles.subtitle.letterSpacing);
    
    // Estilos para texto general
    root.style.setProperty('--body-font-family', fontStyles.bodyText.fontFamily);
    root.style.setProperty('--body-font-size', fontStyles.bodyText.fontSize);
    root.style.setProperty('--body-font-weight', fontStyles.bodyText.fontWeight);
    root.style.setProperty('--body-color', fontStyles.bodyText.color);
    root.style.setProperty('--body-line-height', fontStyles.bodyText.lineHeight);

    // Aplicar estilos directamente a elementos específicos
    const logoName = document.querySelector('.logo-name');
    if (logoName) {
      (logoName as HTMLElement).style.fontFamily = fontStyles.title.fontFamily;
      (logoName as HTMLElement).style.fontSize = fontStyles.title.fontSize;
      (logoName as HTMLElement).style.fontWeight = fontStyles.title.fontWeight;
      (logoName as HTMLElement).style.color = fontStyles.title.color;
      (logoName as HTMLElement).style.letterSpacing = fontStyles.title.letterSpacing;
    }

    const logoSurname = document.querySelector('.logo-surname');
    if (logoSurname) {
      (logoSurname as HTMLElement).style.fontFamily = fontStyles.subtitle.fontFamily;
      (logoSurname as HTMLElement).style.fontSize = fontStyles.subtitle.fontSize;
      (logoSurname as HTMLElement).style.fontWeight = fontStyles.subtitle.fontWeight;
      (logoSurname as HTMLElement).style.color = fontStyles.subtitle.color;
      (logoSurname as HTMLElement).style.letterSpacing = fontStyles.subtitle.letterSpacing;
    }

    // Aplicar a todos los elementos de texto general
    const bodyTexts = document.querySelectorAll('p, .body-text, .main-text');
    bodyTexts.forEach(element => {
      (element as HTMLElement).style.fontFamily = fontStyles.bodyText.fontFamily;
      (element as HTMLElement).style.fontSize = fontStyles.bodyText.fontSize;
      (element as HTMLElement).style.fontWeight = fontStyles.bodyText.fontWeight;
      (element as HTMLElement).style.color = fontStyles.bodyText.color;
      (element as HTMLElement).style.lineHeight = fontStyles.bodyText.lineHeight;
    });
  }, [fontStyles]);

  // Cargar estilos guardados al inicializar
  useEffect(() => {
    const savedStyles = localStorage.getItem('fontStyles');
    if (savedStyles) {
      try {
        const parsed = JSON.parse(savedStyles);
        setFontStyles(parsed);
      } catch (error) {
        console.error('Error loading saved font styles:', error);
      }
    }
  }, []);

  // Aplicar estilos cuando cambien
  useEffect(() => {
    applyStylesToDOM();
  }, [applyStylesToDOM]);

  return (
    <FontStyleContext.Provider value={{ fontStyles, updateFontStyles, applyStylesToDOM }}>
      {children}
    </FontStyleContext.Provider>
  );
};

export const useFontStyles = () => {
  const context = useContext(FontStyleContext);
  if (context === undefined) {
    throw new Error('useFontStyles must be used within a FontStyleProvider');
  }
  return context;
};
