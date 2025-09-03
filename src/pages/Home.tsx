import React from 'react';
import './Home.css';
import ImageCarousel from '../components/ImageCarousel';
import a1Image from '../assets/images/a1.png';
import a2Image from '../assets/images/a2.jpg';

const Home: React.FC = () => {
  // Array de imágenes para el carrusel
  const carouselImages = [
    {
      id: 'a1',
      src: a1Image,
      alt: 'Adolfo Gutiérrez Arenas - Violonchelista',
      title: 'Adolfo Gutiérrez Arenas',
      subtitle: 'Violonchelista'
    },
    {
      id: 'a2',
      src: a2Image,
      alt: 'Adolfo Gutiérrez Arenas - Violonchelista',
      title: 'Adolfo Gutiérrez Arenas',
      subtitle: 'Violonchelista'
    }
  ];

  return (
    <div className="home">
      <div className="home-container">
        {/* Columna Izquierda */}
        <div className="left-column">
          <div className="text-section">
            <h2 className="section-title">Texto vacío</h2>
            <blockquote className="main-quote">
              "Arenas gave the Laló Concerto more than a fair chance to impress. He is a fine cellist and there is no showman playing or dramatic bow releases. The world that came to mind as he played was: aristocratic. His performance was a hit with the audience and the orquestra members as well"
            </blockquote>
            <div className="quote-attribution">
              <p>Laló Concerto, Fort Worth Symphony</p>
              <p>GREG SULLIVAN, Theater Jones</p>
            </div>
          </div>
          
          <div className="testimonial-box">
            <h3 className="testimonial-author">Bernard Greenhouse</h3>
            <blockquote className="testimonial-text">
              «Adolfo is a cellist of exceptional ability, both as an instrumentalist and as a superbly gifted musician. I expect that these qualities will bring him a career of great importance».
            </blockquote>
          </div>
        </div>

        {/* Columna Central - Carrusel de Imágenes */}
        <div className="center-column">
          <div className="carousel-section">
            <ImageCarousel 
              images={carouselImages}
              autoPlayInterval={3000} // 3 segundos
            />
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="right-column">
          <div className="testimonial-box">
            <h3 className="testimonial-author">ALFREDO BRO-TONS</h3>
            <p className="testimonial-source">Revista Scherzo</p>
            <blockquote className="testimonial-text">
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
  );
};

export default Home;
