import React from 'react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="home-container">
        <div className="content-layout">
          {/* Columna izquierda */}
          <div className="left-column">
            {/* Sección "Texto vacío" */}
            <div className="texto-vacio-section">
              <h2 className="section-title">Texto vacío</h2>
              <blockquote className="main-quote">
                "Arenas gave the Laló Concerto more than a fair chance to impress. He is a fine cellist and there is no showman playing or dramatic bow releases. The world that came to mind as he played was: aristocratic. His performance was a hit with the audience and the orquestra members as well"
              </blockquote>
              <div className="quote-source">
                <span className="source-title">Laló Concerto, Fort Worth Symphony</span>
                <span className="source-author">GREG SULLIVAN, Theater Jones</span>
              </div>
            </div>

            {/* Testimonios */}
            <div className="testimonials">
              <div className="testimonial">
                <h3 className="testimonial-name">Bernard Greenhouse</h3>
                <blockquote className="testimonial-quote">
                  «Adolfo is a cellist of exceptional ability, both as an instrumentalist and as a superbly gifted musician. I expect that these qualities will bring him a career of great importance».
                </blockquote>
              </div>

              <div className="testimonial">
                <h3 className="testimonial-name">Gary Hoffman</h3>
                <blockquote className="testimonial-quote">
                  «Adolfo is an outstanding young cellist»
                </blockquote>
              </div>
            </div>
          </div>

          {/* Columna central - Imagen */}
          <div className="center-column">
            <div className="cellist-image-placeholder">
              <div className="image-placeholder-text">
                <span className="placeholder-icon">📷</span>
                <p>Imagen de Adolfo Gutiérrez Arenas</p>
                <p className="placeholder-subtitle">Violonchelista</p>
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="right-column">
            <div className="testimonial">
              <h3 className="testimonial-name">
                <span className="bold-name">ALFREDO BRO-TONS</span>, Revista Scherzo
              </h3>
              <blockquote className="testimonial-quote">
                «Adolfo Gutiérrez Arenas must possess one of the most incredibly attractive tones currently heard in the world (...) and is one of the great cellist of the beginning of this new century!»
              </blockquote>
            </div>

            <div className="vitae-section">
              <h3 className="section-title">Vitae Convalis</h3>
              <p className="vitae-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod condimentum felis vitae efficitur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
