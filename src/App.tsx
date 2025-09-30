import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FontStyleProvider } from './context/FontStyleContext';
import Navigation from './components/Navigation';
import BackgroundMusic from './components/BackgroundMusic';
import Home from './pages/Home';
import Bio from './pages/Bio';
import OutTheMusic from './pages/OutTheMusic';
import ImagesPage from './pages/ImagesPage';
import Contacto from './pages/Contacto';
import audioFile from './assets/audio/audio1.mpeg';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <FontStyleProvider>
        <Router basename="/web-app-cello">
          <div className="App">
            <Navigation />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bio" element={<Bio />} />
                <Route path="/out-the-music" element={<OutTheMusic />} />
                <Route path="/images" element={<ImagesPage />} />
                <Route path="/contacto" element={<Contacto />} />
              </Routes>
            </main>
            <BackgroundMusic 
              src={audioFile}
              volume={0.3}
              loop={true}
              autoPlay={true}
            />
          </div>
        </Router>
      </FontStyleProvider>
    </ThemeProvider>
  );
}

export default App;
