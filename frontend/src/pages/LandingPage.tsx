import React from 'react';
import fallbackImg from '../assets/fallback-anime.jpg';
import { ThemeSelector } from '../components/ThemeProvider.tsx';

export const LandingPage: React.FC = () => (
  <div className="landing" style={{ background: 'linear-gradient(135deg, #2e2e6f 50%, #18181c 100%)', minHeight: '100vh', color: '#fff', transition: 'background 0.5s' }}>
    <div className="landing-content">
      <img 
        src={fallbackImg} 
        alt="Anime Hero" 
        className="anime-hero" 
        style={{ maxHeight: 200, marginBottom: 16, filter: 'drop-shadow(0 0 24px #fff8)' }} 
      />
      <h1 style={{ fontFamily: 'Orbitron, sans-serif' }}>Futuristic AI Web</h1>
      <div style={{ fontSize: 18, marginBottom: 24, opacity: 0.85 }}>
        The future is not set in stone... Ask your question.
      </div>
      <ThemeSelector />
      <div style={{ marginTop: 32 }}>
        <a href="/login" style={{ margin: 8, padding: '12px 32px', background: '#ffd700', color: '#18181c', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 18 }}>Login / Register</a>
        <a href="/guest" style={{ margin: 8, padding: '12px 32px', background: '#7fd7ff', color: '#18181c', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 18 }}>Continue as Guest</a>
      </div>
      <p style={{ marginTop: 32, fontStyle: 'italic' }}>
        Developed by <span style={{ color: '#ffd700' }}>Shubhranshu Pandey</span>
      </p>
    </div>
    <footer style={{ marginTop: 64, opacity: 0.7, fontSize: 14 }}>
      <span>Contact: pandeyshubhranshu001@gmail.com | GitHub: <a href="https://github.com/Shubh1hulk" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>Shubh1hulk</a></span>
    </footer>
  </div>
);
