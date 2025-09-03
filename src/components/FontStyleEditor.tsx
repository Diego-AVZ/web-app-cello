import React, { useState, useEffect } from 'react';
import { useFontStyles } from '../context/FontStyleContext';
import './FontStyleEditor.css';

interface FontStyleEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

const FontStyleEditor: React.FC<FontStyleEditorProps> = ({ 
  isOpen, 
  onClose
}) => {
  const { fontStyles, updateFontStyles } = useFontStyles();
  const [localStyles, setLocalStyles] = useState(fontStyles);

  // Sincronizar estilos locales con el contexto
  useEffect(() => {
    setLocalStyles(fontStyles);
  }, [fontStyles]);

  const fontFamilies = [
    'Georgia, serif',
    'Times New Roman, serif',
    'Arial, sans-serif',
    'Helvetica, sans-serif',
    'Verdana, sans-serif',
    'Trebuchet MS, sans-serif',
    'Courier New, monospace',
    'Brush Script MT, cursive',
    'Palatino, serif',
    'Garamond, serif'
  ];

  const fontWeights = ['300', '400', '500', '600', '700', '800', '900'];

  const handleStyleChange = (section: keyof typeof localStyles, property: string, value: string) => {
    const newStyles = {
      ...localStyles,
      [section]: {
        ...localStyles[section],
        [property]: value
      }
    };
    setLocalStyles(newStyles);
    
    // Aplicar cambios en tiempo real
    updateFontStyles(newStyles);
  };

  const handleSave = () => {
    updateFontStyles(localStyles);
    onClose();
  };

  const handleCancel = () => {
    // Restaurar estilos originales
    setLocalStyles(fontStyles);
    onClose();
  };

  const applyPreview = () => {
    // Los estilos ya se aplican en tiempo real, solo confirmar
    updateFontStyles(localStyles);
  };

  if (!isOpen) return null;

  return (
    <div className="font-style-editor-overlay">
      <div className="font-style-editor-modal">
        <div className="modal-header">
          <h2>🎨 Editor de Estilos de Fuente</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-content">
          {/* TÍTULOS */}
          <div className="style-section">
            <h3 className="section-title">📝 Títulos (Adolfo Gutiérrez Arenas)</h3>
            <div className="style-grid">
              <div className="style-field">
                <label>Familia de Fuente</label>
                <select 
                  value={localStyles.title.fontFamily}
                  onChange={(e) => handleStyleChange('title', 'fontFamily', e.target.value)}
                >
                  {fontFamilies.map(font => (
                    <option key={font} value={font} style={{ fontFamily: font }}>
                      {font.split(',')[0]}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="style-field">
                <label>Tamaño</label>
                <input
                  type="text"
                  value={localStyles.title.fontSize}
                  onChange={(e) => handleStyleChange('title', 'fontSize', e.target.value)}
                  placeholder="28px"
                />
              </div>
              
              <div className="style-field">
                <label>Peso</label>
                <select 
                  value={localStyles.title.fontWeight}
                  onChange={(e) => handleStyleChange('title', 'fontWeight', e.target.value)}
                >
                  {fontWeights.map(weight => (
                    <option key={weight} value={weight}>{weight}</option>
                  ))}
                </select>
              </div>
              
              <div className="style-field">
                <label>Color</label>
                <input
                  type="color"
                  value={localStyles.title.color}
                  onChange={(e) => handleStyleChange('title', 'color', e.target.value)}
                />
              </div>
              
              <div className="style-field">
                <label>Espaciado de Letras</label>
                <input
                  type="text"
                  value={localStyles.title.letterSpacing}
                  onChange={(e) => handleStyleChange('title', 'letterSpacing', e.target.value)}
                  placeholder="0px"
                />
              </div>
            </div>
          </div>

          {/* SUBTÍTULOS */}
          <div className="style-section">
            <h3 className="section-title">🔤 Subtítulos</h3>
            <div className="style-grid">
              <div className="style-field">
                <label>Familia de Fuente</label>
                <select 
                  value={localStyles.subtitle.fontFamily}
                  onChange={(e) => handleStyleChange('subtitle', 'fontFamily', e.target.value)}
                >
                  {fontFamilies.map(font => (
                    <option key={font} value={font} style={{ fontFamily: font }}>
                      {font.split(',')[0]}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="style-field">
                <label>Tamaño</label>
                <input
                  type="text"
                  value={localStyles.subtitle.fontSize}
                  onChange={(e) => handleStyleChange('subtitle', 'fontSize', e.target.value)}
                  placeholder="24px"
                />
              </div>
              
              <div className="style-field">
                <label>Peso</label>
                <select 
                  value={localStyles.subtitle.fontWeight}
                  onChange={(e) => handleStyleChange('subtitle', 'fontWeight', e.target.value)}
                >
                  {fontWeights.map(weight => (
                    <option key={weight} value={weight}>{weight}</option>
                  ))}
                </select>
              </div>
              
              <div className="style-field">
                <label>Color</label>
                <input
                  type="color"
                  value={localStyles.subtitle.color}
                  onChange={(e) => handleStyleChange('subtitle', 'color', e.target.value)}
                />
              </div>
              
              <div className="style-field">
                <label>Espaciado de Letras</label>
                <input
                  type="text"
                  value={localStyles.subtitle.letterSpacing}
                  onChange={(e) => handleStyleChange('subtitle', 'letterSpacing', e.target.value)}
                  placeholder="0px"
                />
              </div>
            </div>
          </div>

          {/* TEXTO GENERAL */}
          <div className="style-section">
            <h3 className="section-title">📄 Texto General</h3>
            <div className="style-grid">
              <div className="style-field">
                <label>Familia de Fuente</label>
                <select 
                  value={localStyles.bodyText.fontFamily}
                  onChange={(e) => handleStyleChange('bodyText', 'fontFamily', e.target.value)}
                >
                  {fontFamilies.map(font => (
                    <option key={font} value={font} style={{ fontFamily: font }}>
                      {font.split(',')[0]}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="style-field">
                <label>Tamaño</label>
                <input
                  type="text"
                  value={localStyles.bodyText.fontSize}
                  onChange={(e) => handleStyleChange('bodyText', 'fontSize', e.target.value)}
                  placeholder="16px"
                />
              </div>
              
              <div className="style-field">
                <label>Peso</label>
                <select 
                  value={localStyles.bodyText.fontWeight}
                  onChange={(e) => handleStyleChange('bodyText', 'fontWeight', e.target.value)}
                >
                  {fontWeights.map(weight => (
                    <option key={weight} value={weight}>{weight}</option>
                  ))}
                </select>
              </div>
              
              <div className="style-field">
                <label>Color</label>
                <input
                  type="color"
                  value={localStyles.bodyText.color}
                  onChange={(e) => handleStyleChange('bodyText', 'color', e.target.value)}
                />
              </div>
              
              <div className="style-field">
                <label>Altura de Línea</label>
                <input
                  type="text"
                  value={localStyles.bodyText.lineHeight}
                  onChange={(e) => handleStyleChange('bodyText', 'lineHeight', e.target.value)}
                  placeholder="1.5"
                />
              </div>
            </div>
          </div>

          {/* PREVIEW */}
          <div className="preview-section">
            <h3 className="section-title">👁️ Vista Previa en Tiempo Real</h3>
            <div className="preview-content">
              <div className="preview-title" style={{
                fontFamily: localStyles.title.fontFamily,
                fontSize: localStyles.title.fontSize,
                fontWeight: localStyles.title.fontWeight,
                color: localStyles.title.color,
                letterSpacing: localStyles.title.letterSpacing
              }}>
                Título de Ejemplo
              </div>
              <div className="preview-subtitle" style={{
                fontFamily: localStyles.subtitle.fontFamily,
                fontSize: localStyles.subtitle.fontSize,
                fontWeight: localStyles.subtitle.fontWeight,
                color: localStyles.subtitle.color,
                letterSpacing: localStyles.subtitle.letterSpacing
              }}>
                Subtítulo de Ejemplo
              </div>
              <div className="preview-body" style={{
                fontFamily: localStyles.bodyText.fontFamily,
                fontSize: localStyles.bodyText.fontSize,
                fontWeight: localStyles.bodyText.fontWeight,
                color: localStyles.bodyText.color,
                lineHeight: localStyles.bodyText.lineHeight
              }}>
                Este es un ejemplo de texto general que muestra cómo se verá el contenido con los estilos seleccionados. Los cambios se aplican en tiempo real a toda la web.
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-actions">
          <button className="preview-btn" onClick={applyPreview}>
            ✅ Confirmar Cambios
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            ❌ Cancelar
          </button>
          <button className="save-btn" onClick={handleSave}>
            💾 Guardar Estilos
          </button>
        </div>
      </div>
    </div>
  );
};

export default FontStyleEditor;
