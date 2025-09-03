import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FontStyleProvider } from './context/FontStyleContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Bio from './pages/Bio';
import OutTheMusic from './pages/OutTheMusic';
import Contacto from './pages/Contacto';
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
                <Route path="/contacto" element={<Contacto />} />
              </Routes>
            </main>
          </div>
        </Router>
      </FontStyleProvider>
    </ThemeProvider>
  );
}

export default App;
