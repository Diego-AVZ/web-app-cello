import React from 'react';
import './Home.css';
import ImageCarousel from '../components/ImageCarousel';
import AmazonDiscs from '../components/AmazonDiscs';
import MultimediaPlayer from '../components/MultimediaPlayer';
import a1Image from '../assets/images/a1.png';
import a2Image from '../assets/images/a2.png';
import disc1Image from '../assets/images/disc1.jpg';
import disc2Image from '../assets/images/disc2.webp';
import disc3Image from '../assets/images/disc3.webp';
import disc4Image from '../assets/images/disc4.jpg';

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

  // Tus discos reales con imágenes
  const discs = [
    {
      id: 'beethoven-evolution',
      title: 'Beethoven Evolution',
      artist: 'Adolfo Gutiérrez Arenas & Christopher Park',
      year: '2020',
      coverImage: disc1Image,
      amazonUrl: 'https://www.amazon.es/Arenas-Park-Beethoven-Evolution-Christopher/dp/B08DC5VXYM/ref=sr_1_fkmr0_1?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=arenas+park+beethoven+cd&qid=1605352859&sr=8-1-fkmr0',
      description: 'Obras de Beethoven para violonchelo y piano'
    },
    {
      id: 'bach-cello-suites',
      title: 'Bach: Cello Suites Nos. 1-6',
      artist: 'Adolfo Gutiérrez Arenas',
      year: '2008',
      coverImage: disc2Image,
      amazonUrl: 'https://www.prestomusic.com/classical/products/7962522--bach-j-s-cello-suites-nos-1-6-bwv1007-1012',
      description: 'Las seis suites para violonchelo solo de Johann Sebastian Bach'
    },
    {
      id: 'cello-works',
      title: 'Cello Works',
      artist: 'Adolfo Gutiérrez Arenas & Luis Fernando Pérez',
      year: '2019',
      coverImage: disc3Image,
      amazonUrl: 'https://www.prestomusic.com/classical/products/7933176--cello-works',
      description: 'Obras de Rachmaninoff, Piazzolla y otros compositores'
    },
    {
      id: 'dvorak-cello-works',
      title: 'Dvořák: Cello Works',
      artist: 'Adolfo Gutiérrez Arenas',
      year: '2018',
      coverImage: disc4Image,
      amazonUrl: 'https://ibsclassical.es/producto/dvorak-cello-works/',
      description: 'Obras para violonchelo de Antonín Dvořák'
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
      
      {/* Sección de Discos de Amazon */}
      <AmazonDiscs 
        discs={discs}
        title="Discografía"
      />
      
      {/* Sección de Contenido Multimedia */}
      <MultimediaPlayer 
        title="Contenido Multimedia"
      />
    </div>
  );
};

export default Home;
