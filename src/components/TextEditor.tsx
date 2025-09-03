import React, { useState } from 'react';
import './TextEditor.css';

interface TextContent {
  title: string;
  subtitle: string;
  mainText: string;
}

interface TextEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: TextContent) => void;
  initialContent?: TextContent;
}

const TextEditor: React.FC<TextEditorProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialContent 
}) => {
  const [content, setContent] = useState<TextContent>({
    title: initialContent?.title || 'Título Principal',
    subtitle: initialContent?.subtitle || 'Subtítulo descriptivo',
    mainText: initialContent?.mainText || 'Texto principal de la sección...'
  });

  const handleSave = () => {
    onSave(content);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="text-editor-overlay">
      <div className="text-editor-modal">
        <div className="modal-header">
          <h2>Editor de Textos</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-content">
          <div className="text-field">
            <label htmlFor="title">Título Principal</label>
            <input
              id="title"
              type="text"
              value={content.title}
              onChange={(e) => setContent({...content, title: e.target.value})}
              placeholder="Escribe el título principal..."
            />
          </div>
          
          <div className="text-field">
            <label htmlFor="subtitle">Subtítulo</label>
            <input
              id="subtitle"
              type="text"
              value={content.subtitle}
              onChange={(e) => setContent({...content, subtitle: e.target.value})}
              placeholder="Escribe el subtítulo..."
            />
          </div>
          
          <div className="text-field">
            <label htmlFor="mainText">Texto Principal</label>
            <textarea
              id="mainText"
              value={content.mainText}
              onChange={(e) => setContent({...content, mainText: e.target.value})}
              placeholder="Escribe el texto principal..."
              rows={6}
            />
          </div>
        </div>
        
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancelar
          </button>
          <button className="save-btn" onClick={handleSave}>
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
