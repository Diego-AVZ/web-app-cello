import React from 'react';
import './Bio.css';

const Bio: React.FC = () => {
  return (
    <div className="bio-page">
      {/* Hero Section */}
      <section className="bio-hero">
        <div className="bio-hero-content">
          <div className="bio-hero-text">
            <h1 className="bio-title">Adolfo Gutiérrez Arenas</h1>
            <p className="bio-subtitle">Outstanding Cellist & Winner of the Ravel Prize 2012</p>
            <div className="bio-highlight">
              <span className="highlight-text">"An exceptional cellist with a superbly gifted musicality"</span>
              <span className="highlight-author">- Bernard Greenhouse</span>
            </div>
          </div>
          <div className="bio-hero-image">
            <div className="image-placeholder">
              <div className="placeholder-content">
                <span className="placeholder-icon">🎻</span>
                <span className="placeholder-text">Professional Photo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Bio Content */}
      <section className="bio-content">
        <div className="bio-container">
          
          {/* Career Highlights */}
          <div className="bio-section">
            <h2 className="section-title">Career Highlights</h2>
            <div className="highlights-grid">
              <div className="highlight-card">
                <div className="highlight-icon">🏆</div>
                <h3>Ravel Prize 2012</h3>
                <p>Winner of the prestigious Ravel Prize, recognizing exceptional musical talent</p>
              </div>
              <div className="highlight-card">
                <div className="highlight-icon">🎼</div>
                <h3>London Symphony Orchestra</h3>
                <p>Debut with LSO in the prestigious Ibermusica series, performing Elgar's Cello Concerto</p>
              </div>
              <div className="highlight-card">
                <div className="highlight-icon">🌍</div>
                <h3>International Recognition</h3>
                <p>Performed with Royal Philharmonic Orchestra, Orquesta Nacional de España, and more</p>
              </div>
            </div>
          </div>

          {/* Biography Text */}
          <div className="bio-section">
            <h2 className="section-title">Biography</h2>
            <div className="bio-text-content">
              <p className="bio-paragraph">
                Adolfo is an outstanding cellist and winner of the Ravel prize 2012. He made his debut with the London Symphony Orchestra in the prestigious Ibermusica series, in Madrid, performing Elgar's Cello Concerto which was quickly followed by invitations from Royal Philharmonic Orchestra (Charles Dutoit), Orquesta Nacional de España (Ton Koopman) and a recital invitation for the Mendelssohn Festival at Leipzig's Gewandhaus.
              </p>
              
              <p className="bio-paragraph">
                Current highlights include his debut with London Philharmonic Orchestra (Vladimir Jurowski) as well as a return to Orquesta Nacional de España to work with Krzysztof Penderecki. Earlier this year he made his US orchestral debut with Fort Worth Symphony under Miguel Harth-Bedoya and he will return to North America later this year for the Ravinia Festival and Montreal Symphony's Summer Festival. His recent South American debut with the Orquesta Sinfónica Nacional de Colombia, was an outstanding success and he has immediately been reinvited.
              </p>
              
              <p className="bio-paragraph">
                In his native Spain, Adolfo regularly performs with all the major orchestras including Bilbao Orkestra Sinfonikoa, Orquesta Sinfónica del Principado de Asturias and Orquesta Filarmónica de Málaga, among others.
              </p>
            </div>
          </div>

          {/* International Tours */}
          <div className="bio-section">
            <h2 className="section-title">International Presence</h2>
            <div className="tours-content">
              <div className="tours-text">
                <p className="bio-paragraph">
                  The Young Artist International Organization invited Adolfo to participate at the International Laureates Festival in Los Angeles, California. His recital tours in the United States led him to play in New York, Boston, Dallas, San Diego and Los Angeles.
                </p>
                <p className="bio-paragraph">
                  Adolfo has performed at major venues such as Amsterdam's Concertgebouw, Auditorio Nacional de Música in Madrid, Ford Theatre in Los Angeles, l'Auditori and Palau de la Música in Barcelona, Bulgaria Hall in Sofia and Palacio Euskalduna in Bilbao.
                </p>
              </div>
              <div className="venues-list">
                <h3>Major Venues</h3>
                <ul className="venues-grid">
                  <li>🏛️ Amsterdam's Concertgebouw</li>
                  <li>🎭 Ford Theatre, Los Angeles</li>
                  <li>🎵 Palau de la Música, Barcelona</li>
                  <li>🏛️ Bulgaria Hall, Sofia</li>
                  <li>🎼 Palacio Euskalduna, Bilbao</li>
                  <li>🎪 Auditorio Nacional, Madrid</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Collaborations & Recordings */}
          <div className="bio-section">
            <h2 className="section-title">Collaborations & Recordings</h2>
            <div className="collaborations-content">
              <div className="conductors-section">
                <h3>Notable Conductors</h3>
                <div className="conductors-grid">
                  <span className="conductor-tag">Edward Gardner</span>
                  <span className="conductor-tag">José Ramón Encinar</span>
                  <span className="conductor-tag">Roberto Minczuk</span>
                  <span className="conductor-tag">Pablo González</span>
                  <span className="conductor-tag">Anu Tali</span>
                  <span className="conductor-tag">Antoni Ros-Marbà</span>
                  <span className="conductor-tag">Charles Dutoit</span>
                  <span className="conductor-tag">Ton Koopman</span>
                  <span className="conductor-tag">Vladimir Jurowski</span>
                  <span className="conductor-tag">Krzysztof Penderecki</span>
                </div>
              </div>
              
              <div className="recordings-section">
                <h3>Discography</h3>
                <div className="recordings-list">
                  <div className="recording-item">
                    <span className="recording-icon">🎵</span>
                    <div className="recording-info">
                      <h4>Barber, Rachmaninov & Piazzolla</h4>
                      <p>Verso Label</p>
                    </div>
                  </div>
                  <div className="recording-item">
                    <span className="recording-icon">🎼</span>
                    <div className="recording-info">
                      <h4>Complete Cello Suites by J.S. Bach</h4>
                      <p>Verso Label</p>
                    </div>
                  </div>
                  <div className="recording-item">
                    <span className="recording-icon">🎹</span>
                    <div className="recording-info">
                      <h4>Complete Beethoven Sonatas</h4>
                      <p>With pianist Christopher Park - Great Critical Acclaim</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instrument */}
          <div className="bio-section instrument-section">
            <h2 className="section-title">Instrument</h2>
            <div className="instrument-content">
              <div className="instrument-info">
                <div className="instrument-icon">🎻</div>
                <div className="instrument-details">
                  <h3>Francesco Ruggieri</h3>
                  <p className="instrument-description">
                    Handcrafted in Cremona in 1673, this magnificent instrument represents the pinnacle of Italian violin making tradition.
                  </p>
                  <div className="instrument-specs">
                    <span className="spec-item">📍 Cremona, Italy</span>
                    <span className="spec-item">📅 1673</span>
                    <span className="spec-item">👨‍🎨 Francesco Ruggieri</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Bio;
