import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './MultimediaPlayer.css';
import ytLogo from '../assets/images/yt-logo.png';

interface MultimediaPlayerProps {
  title?: string;
}

const MultimediaPlayer: React.FC<MultimediaPlayerProps> = ({ 
  title = "Multimedia Content" 
}) => {
  const [activeTab, setActiveTab] = useState<'youtube' | 'spotify' | 'apple'>('youtube');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string>('NuZO96z2ZVk');

  // Lista de videos del canal
  const videoIds = useMemo(() => [
    'NuZO96z2ZVk', 'VvTeE16r7z4', 'ZQav1zSsm90', 'w0Fc47FO7i8', '-r6pIQhZjXg',
    'rbgvnTy__LQ', '9L-nwBjDIkE', 'iMdpDBY2lTg', 'UcyadELV0Dc', 'eQEzmprKg3g',
    'Ion6xwCULlA', '5_EW6GWwmC8', 'v8MaYzRaRe8'
  ], []);

  const [youtubeVideos, setYoutubeVideos] = useState<Array<{
    id: string;
    title: string;
    description: string;
    loading: boolean;
  }>>(
    videoIds.map(id => ({
      id,
      title: 'Loading...',
      description: 'Getting information...',
      loading: true
    }))
  );

  const [currentPage, setCurrentPage] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videosPerPage = 4;
  const totalPages = Math.ceil(youtubeVideos.length / videosPerPage);
  const currentVideos = youtubeVideos.slice(currentPage * videosPerPage, (currentPage + 1) * videosPerPage);

  const handleTabChange = (tab: 'youtube' | 'spotify' | 'apple') => {
    setIsLoading(true);
    setActiveTab(tab);
    
    // Simular carga para efecto visual
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const handleVideoSelect = (videoId: string) => {
    setSelectedVideo(videoId);
    // Pausar música de fondo al seleccionar un nuevo video
    pauseBackgroundMusic();
    setIsVideoPlaying(false); // Resetear estado del video
    console.log('New video selected - background music paused');
  };

  const pauseBackgroundMusic = () => {
    // Usar la función global si está disponible
    if ((window as any).pauseBackgroundMusic) {
      (window as any).pauseBackgroundMusic();
      console.log('Background music paused for video playback');
    } else {
      // Fallback: pausar todos los elementos de audio
      const audioElements = document.querySelectorAll('audio');
      audioElements.forEach(audio => {
        if (!audio.paused) {
          audio.pause();
          console.log('Background music paused for video playback (fallback)');
        }
      });
    }
  };

  const resumeBackgroundMusic = () => {
    // Usar la función global si está disponible
    if ((window as any).resumeBackgroundMusic) {
      (window as any).resumeBackgroundMusic();
      console.log('Background music resumed');
    } else {
      // Fallback: reanudar todos los elementos de audio
      const audioElements = document.querySelectorAll('audio');
      audioElements.forEach(audio => {
        if (audio.paused) {
          audio.play().catch(error => {
            console.log('Could not resume background music:', error);
          });
          console.log('Background music resumed (fallback)');
        }
      });
    }
  };

  // Función para detectar cuando el video de YouTube se reproduce
  const handleVideoPlay = useCallback(() => {
    setIsVideoPlaying(true);
    pauseBackgroundMusic();
    console.log('Video started playing - background music paused');
  }, []);

  // Función para detectar cuando el video de YouTube se pausa o termina
  const handleVideoPause = useCallback(() => {
    setIsVideoPlaying(false);
    resumeBackgroundMusic();
    console.log('Video paused/ended - background music resumed');
  }, []);

  const handlePageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getThumbnailUrl = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = `https://img.youtube.com/vi/${target.dataset.videoId}/mqdefault.jpg`;
  };

  // Función para obtener información de videos usando oEmbed API
  const fetchVideoInfo = async (videoId: string) => {
    try {
      const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
      if (response.ok) {
        const data = await response.json();
        return {
          title: data.title,
          description: data.author_name || 'Adolfo Gutiérrez Arenas'
        };
      }
    } catch (error) {
      console.error('Error fetching video info:', error);
    }
    return {
      title: 'Video no disponible',
      description: 'Información no disponible'
    };
  };

  // Cargar información de todos los videos al montar el componente
  useEffect(() => {
    const loadVideoInfo = async () => {
      const updatedVideos = await Promise.all(
        videoIds.map(async (id) => {
          const info = await fetchVideoInfo(id);
          return {
            id,
            title: info.title,
            description: info.description,
            loading: false
          };
        })
      );
      setYoutubeVideos(updatedVideos);
    };

    loadVideoInfo();
  }, [videoIds]);

  // Detectar eventos del video de YouTube para controlar la música de fondo
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Verificar que el mensaje viene de YouTube
      if (event.origin !== 'https://www.youtube.com') return;
      
      const data = event.data;
      
      // Detectar diferentes eventos de YouTube
      if (data && typeof data === 'string') {
        // Video empezó a reproducirse
        if (data.includes('video-progress') || data.includes('video-playing') || data.includes('video-start')) {
        if (!isVideoPlaying) {
          handleVideoPlay();
        }
      }
      
        // Video se pausó
        if (data.includes('video-pause') || data.includes('video-paused')) {
        if (isVideoPlaying) {
          handleVideoPause();
        }
      }
      
        // Video terminó
        if (data.includes('video-end') || data.includes('video-ended')) {
        if (isVideoPlaying) {
          handleVideoPause();
          }
        }
        
        // Video se cargó (nuevo video seleccionado)
        if (data.includes('video-ready') || data.includes('video-loaded')) {
          // Asegurar que la música esté pausada cuando se carga un nuevo video
          pauseBackgroundMusic();
          setIsVideoPlaying(false);
        }
      }
    };

    // Agregar listener para mensajes del iframe
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [isVideoPlaying, handleVideoPause, handleVideoPlay]);

  // Detectar clics en el iframe para simular eventos de reproducción
  useEffect(() => {
    const iframe = document.getElementById('youtube-player') as HTMLIFrameElement;
    
    if (iframe) {
      const handleIframeClick = () => {
        // Pausar música inmediatamente al hacer clic
        pauseBackgroundMusic();
        
        // Simular que el video se está reproduciendo después de un clic
        setTimeout(() => {
          if (!isVideoPlaying) {
            handleVideoPlay();
          }
        }, 500); // Delay reducido para respuesta más rápida
      };

      // También detectar cuando el iframe recibe foco (posible reproducción)
      const handleIframeFocus = () => {
        pauseBackgroundMusic();
      };

      iframe.addEventListener('click', handleIframeClick);
      iframe.addEventListener('focus', handleIframeFocus);

      return () => {
        iframe.removeEventListener('click', handleIframeClick);
        iframe.removeEventListener('focus', handleIframeFocus);
      };
    }
  }, [selectedVideo, isVideoPlaying, handleVideoPlay]);

  // Efecto para pausar música cuando se cambia de video
  useEffect(() => {
    // Pausar música de fondo cada vez que se cambia el video seleccionado
    pauseBackgroundMusic();
    setIsVideoPlaying(false);
    console.log('Video changed - background music paused');
  }, [selectedVideo]);

  const renderYouTubeContent = () => (
    <div className="platform-content youtube-content">
      <div className="content-header">
        <h3>🎥 YouTube Channel</h3>
        <p>Select a video to play</p>
      </div>
      
      {/* Video principal */}
      <div className="main-video-container">
        <iframe
          src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=0&rel=0&enablejsapi=1&origin=${window.location.origin}&controls=1&modestbranding=1&showinfo=0`}
          title="YouTube Video Player - Adolfo Gutiérrez Arenas"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          id="youtube-player"
        ></iframe>
        
        {/* Indicador de estado del video */}
        {isVideoPlaying && (
          <div className="video-status-indicator">
            <span className="status-text">🎵 Background music paused</span>
          </div>
        )}
      </div>
      
      {/* Carrusel de videos moderno */}
      <div className="modern-carousel">
        <div className="carousel-header">
          <h4>Select another video</h4>
          <div className="page-indicator">
            <span className="current-page">{currentPage + 1}</span>
            <span className="separator">/</span>
            <span className="total-pages">{totalPages}</span>
          </div>
        </div>
        
        <div className="carousel-container">
          <button 
            className={`carousel-arrow prev ${currentPage === 0 ? 'disabled' : ''}`}
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 0}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="video-grid">
            {currentVideos.map((video) => (
              <div
                key={video.id}
                className={`video-card ${selectedVideo === video.id ? 'selected' : ''}`}
                onClick={() => handleVideoSelect(video.id)}
              >
                <div className="video-thumbnail-container">
                  <img
                    src={getThumbnailUrl(video.id)}
                    alt={video.title}
                    className="video-thumbnail-image"
                    data-video-id={video.id}
                    onError={handleImageError}
                  />
                  <div className="video-overlay">
                    <div className="play-button">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
                  <div className="video-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23 7L16 12L23 17V7Z" fill="currentColor"/>
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                </div>
                <div className="video-info">
                  <h5 className="video-title">
                    {video.loading ? (
                      <span className="loading-text">Loading...</span>
                    ) : (
                      video.title
                    )}
                  </h5>
                  <p className="video-description">
                    {video.loading ? (
                      <span className="loading-text">Obteniendo información...</span>
                    ) : (
                      video.description
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className={`carousel-arrow next ${currentPage === totalPages - 1 ? 'disabled' : ''}`}
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages - 1}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="platform-actions">
        <a 
          href="https://youtube.com/@gotieroify?feature=shared" 
          target="_blank" 
          rel="noopener noreferrer"
          className="platform-link youtube-link"
        >
          <span className="platform-icon">▶️</span>
          View Full Channel
        </a>
      </div>
    </div>
  );

  const renderSpotifyContent = () => (
    <div className="platform-content spotify-content">
      <div className="content-header">
        <h3>🎵 Spotify</h3>
        <p>Listen to my music on Spotify</p>
      </div>
      
      <div className="spotify-player">
        <iframe
          src="https://open.spotify.com/embed/artist/53pHVjb5WZG7Vrdrn5YrRv?utm_source=generator&theme=0"
          title="Spotify Player - Adolfo Gutiérrez Arenas"
          width="100%"
          height="400"
          frameBorder="0"
          allowTransparency={true}
          allow="encrypted-media"
        ></iframe>
      </div>
      
      <div className="platform-actions">
        <a 
          href="https://open.spotify.com/artist/53pHVjb5WZG7Vrdrn5YrRv?si=_hYftEZTTDeDQ7PulqiNDw" 
          target="_blank" 
          rel="noopener noreferrer"
          className="platform-link spotify-link"
        >
          <span className="platform-icon">🎧</span>
          Open in Spotify
        </a>
      </div>
    </div>
  );

  const renderAppleMusicContent = () => (
    <div className="platform-content apple-content">
      <div className="content-header">
        <h3>🍎 Apple Music</h3>
        <p>Enjoy my music on Apple Music</p>
      </div>
      
      <div className="apple-player">
        <iframe
          allow="autoplay *; encrypted-media *; fullscreen *"
          title="Apple Music Player - Adolfo Gutiérrez Arenas"
          frameBorder="0"
          height="400"
          style={{ width: '100%', maxWidth: '660px', overflow: 'hidden', background: 'transparent' }}
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
          src="https://embed.music.apple.com/es/artist/adolfo-guti%C3%A9rrez-arenas/271698331"
        ></iframe>
      </div>
      
      <div className="platform-actions">
        <a 
          href="https://music.apple.com/es/artist/adolfo-guti%C3%A9rrez-arenas/271698331" 
          target="_blank" 
          rel="noopener noreferrer"
          className="platform-link apple-link"
        >
          <span className="platform-icon">🎼</span>
          Open in Apple Music
        </a>
      </div>
    </div>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading content...</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'youtube':
        return renderYouTubeContent();
      case 'spotify':
        return renderSpotifyContent();
      case 'apple':
        return renderAppleMusicContent();
      default:
        return renderYouTubeContent();
    }
  };

  return (
    <section className="multimedia-player-section">
      <div className="multimedia-container">
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">
            Explore my content on different music platforms
          </p>
        </div>

        <div className="multimedia-player">
          <div className="tabs-container">
            <button
              className={`tab-button youtube-tab ${activeTab === 'youtube' ? 'active' : ''}`}
              onClick={() => handleTabChange('youtube')}
            >
              <div className="youtube-logo-container">
                <img src={ytLogo} alt="YouTube" className="youtube-logo" />
              </div>
              <span className="tab-text">YouTube</span>
            </button>
            
            <button
              className={`tab-button spotify-tab ${activeTab === 'spotify' ? 'active' : ''}`}
              onClick={() => handleTabChange('spotify')}
            >
              <span className="tab-icon">🎵</span>
              <span className="tab-text">Spotify</span>
            </button>
            
            <button
              className={`tab-button apple-tab ${activeTab === 'apple' ? 'active' : ''}`}
              onClick={() => handleTabChange('apple')}
            >
              <span className="tab-icon">🍎</span>
              <span className="tab-text">Apple Music</span>
            </button>
          </div>

          <div className="content-container">
            {renderContent()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultimediaPlayer;
