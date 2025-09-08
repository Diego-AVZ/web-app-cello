import React, { useEffect, useRef, useState, useCallback } from 'react';
import './BackgroundMusic.css';

interface BackgroundMusicProps {
  src: string;
  volume?: number;
  loop?: boolean;
  autoPlay?: boolean;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({
  src,
  volume = 0.3,
  loop = true,
  autoPlay = true,
  onPlayStateChange
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(volume);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Configurar el audio
    audio.volume = currentVolume;
    audio.loop = loop;
    audio.muted = false; // Asegurar que no esté silenciado

    // Función para intentar reproducir automáticamente
    const attemptPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        console.log('Background music started automatically');
      } catch (error) {
        console.log('Autoplay blocked by browser:', error);
        // Si el autoplay está bloqueado, intentar de nuevo después de una interacción del usuario
        const handleUserInteraction = async () => {
          try {
            await audio.play();
            setIsPlaying(true);
            console.log('Background music started after user interaction');
          } catch (err) {
            console.log('Still blocked:', err);
          }
          document.removeEventListener('click', handleUserInteraction);
          document.removeEventListener('keydown', handleUserInteraction);
        };
        
        document.addEventListener('click', handleUserInteraction);
        document.addEventListener('keydown', handleUserInteraction);
      }
    };

    // Intentar reproducir automáticamente
    if (autoPlay) {
      // Pequeño delay para asegurar que el DOM esté listo
      setTimeout(attemptPlay, 500);
    }

    // Event listeners
    const handlePlay = () => {
      setIsPlaying(true);
      onPlayStateChange?.(true);
    };
    const handlePause = () => {
      setIsPlaying(false);
      onPlayStateChange?.(false);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      onPlayStateChange?.(false);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [autoPlay, loop, currentVolume, onPlayStateChange]);

  const startMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
      console.log('Background music started manually');
    } catch (error) {
      console.log('Error starting music:', error);
    }
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

  // Función para pausar desde fuera del componente
  const pauseMusic = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      audio.pause();
      setIsPlaying(false);
      onPlayStateChange?.(false);
    }
  }, [onPlayStateChange]);

  // Función para reanudar desde fuera del componente
  const resumeMusic = () => {
    const audio = audioRef.current;
    if (audio && audio.paused) {
      audio.play().catch(error => {
        console.log('Could not resume background music:', error);
      });
    }
  };

  // Exponer funciones globalmente para que otros componentes puedan usarlas
  useEffect(() => {
    (window as any).pauseBackgroundMusic = pauseMusic;
    (window as any).resumeBackgroundMusic = resumeMusic;
    
    return () => {
      delete (window as any).pauseBackgroundMusic;
      delete (window as any).resumeBackgroundMusic;
    };
  }, [pauseMusic]);

  return (
    <div className="background-music">
      <audio
        ref={audioRef}
        src={src}
        preload="auto"
      />
      
      
      {/* Controles de música */}
      <div className="music-controls">
        <button 
          className={`music-btn play-pause-btn ${isPlaying ? 'playing' : ''}`}
          onClick={togglePlayPause}
          title={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        
        <button 
          className="music-btn mute-btn"
          onClick={toggleMute}
          title={isMuted ? 'Unmute' : 'Mute'}
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
            title="Volume control"
          />
        </div>
      </div>
    </div>
  );
};

export default BackgroundMusic;
