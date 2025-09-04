import React, { useEffect, useRef, useState } from 'react';
import './BackgroundMusic.css';

interface BackgroundMusicProps {
  src: string;
  volume?: number;
  loop?: boolean;
  autoPlay?: boolean;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({
  src,
  volume = 0.3,
  loop = true,
  autoPlay = true
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(volume);
  const [showStartButton, setShowStartButton] = useState(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [userDeclinedMusic, setUserDeclinedMusic] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Configurar el audio
    audio.volume = currentVolume;
    audio.loop = loop;
    audio.muted = false; // Asegurar que no esté silenciado

    // Función para intentar reproducir
    const attemptPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setShowStartButton(false);
        setAutoplayBlocked(false);
        console.log('Música iniciada automáticamente');
      } catch (error) {
        console.log('Autoplay bloqueado:', error);
        setAutoplayBlocked(true);
        setShowStartButton(true);
      }
    };

    // Intentar reproducir automáticamente
    if (autoPlay) {
      // Pequeño delay para asegurar que el DOM esté listo
      setTimeout(attemptPlay, 100);
    }

    // Event listeners
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [autoPlay, loop, currentVolume]);

  const startMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
      setShowStartButton(false);
      setAutoplayBlocked(false);
      console.log('Música iniciada manualmente');
    } catch (error) {
      console.log('Error al iniciar música:', error);
    }
  };

  const closeModal = () => {
    setShowStartButton(false);
    setUserDeclinedMusic(true);
  };

  const declineMusic = () => {
    setShowStartButton(false);
    setUserDeclinedMusic(true);
    console.log('Usuario declinó la música');
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      startMusic();
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = currentVolume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setCurrentVolume(newVolume);
    
    const audio = audioRef.current;
    if (audio && !isMuted) {
      audio.volume = newVolume;
    }
  };

  return (
    <div className="background-music">
      <audio
        ref={audioRef}
        src={src}
        preload="auto"
      />
      
      {/* Modal de inicio de música */}
      {showStartButton && (
        <div className="start-music-overlay">
          <div className="start-music-content">
            {/* Botón de cerrar */}
            <button 
              className="close-modal-btn"
              onClick={closeModal}
              title="Cerrar"
            >
              ✕
            </button>
            
            <div className="modal-header">
              <h3>🎵 ¡Bienvenido a mi sitio web!</h3>
              <p>¿Te gustaría escuchar música de fondo mientras navegas?</p>
            </div>
            
            <div className="modal-buttons">
              <button 
                className="start-music-btn primary"
                onClick={startMusic}
              >
                ▶️ Sí, iniciar música
              </button>
              
              <button 
                className="decline-music-btn secondary"
                onClick={declineMusic}
              >
                🚫 No, acceder sin música
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Controles de música */}
      <div className={`music-controls ${showStartButton ? 'hidden' : ''}`}>
        <button 
          className={`music-btn play-pause-btn ${isPlaying ? 'playing' : ''}`}
          onClick={togglePlayPause}
          title={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        
        <button 
          className="music-btn mute-btn"
          onClick={toggleMute}
          title={isMuted ? 'Activar sonido' : 'Silenciar'}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
        
        <div className="volume-control">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : currentVolume}
            onChange={handleVolumeChange}
            className="volume-slider"
            title="Control de volumen"
          />
        </div>
      </div>
    </div>
  );
};

export default BackgroundMusic;
