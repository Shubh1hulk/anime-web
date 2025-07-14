import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './components/ThemeProvider.tsx';
import './App.css';
import fallbackImg from './assets/fallback-anime.jpg';
import { AuthPanel } from './components/AuthPanel.tsx';
import { UserPanel } from './components/UserPanel.tsx';
import { AdminPanel } from './components/AdminPanel.tsx';
import { GuestPanel } from './components/GuestPanel.tsx';

const AIOracleGreeting = () => {
  const mysteriousGreetings = [
    'The future is not set in stone... Ask your question.',
    'A new era dawns. What will you create?',
    'The oracle awaits your command.',
    'Fate bends to those who dare. Proceed.',
    'Your destiny is written in code. Speak.'
  ];
  return (
    <div className="ai-oracle-greeting" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 18, marginBottom: 24, opacity: 0.85 }}>
      {mysteriousGreetings[Math.floor(Math.random() * mysteriousGreetings.length)]}
    </div>
  );
};

const Landing = ({ onAuthSuccess }: { onAuthSuccess: (role: 'admin' | 'user' | 'guest') => void }) => {
  const { theme } = useTheme();
  return (
    <div className="landing" style={{ background: `linear-gradient(135deg, ${theme.color} 50%, #18181c 100%)`, minHeight: '100vh', color: '#fff', transition: 'background 0.5s' }}>
      <div className="landing-content">
        <img 
          src={theme.image} 
          alt={theme.name} 
          className="anime-hero" 
          style={{ maxHeight: 200, marginBottom: 16, filter: 'drop-shadow(0 0 24px #fff8)' }} 
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = fallbackImg;
          }}
        />
        <h1>Futuristic AI Web</h1>
        <AIOracleGreeting />
        <ThemeSelector />
        <AuthPanel onAuthSuccess={onAuthSuccess} />
        <p style={{ marginTop: 32, fontStyle: 'italic' }}>
          Developed by <span style={{ color: '#ffd700' }}>Shubhranshu Pandey</span>
        </p>
      </div>
      <footer style={{ marginTop: 64, opacity: 0.7, fontSize: 14 }}>
        <span>Contact: pandeyshubhranshu001@gmail.com | GitHub: <a href="https://github.com/Shubh1hulk" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>Shubh1hulk</a></span>
      </footer>
    </div>
  );
};


const ThemeSelector = () => {
  const { theme, setThemeByName, allThemes } = useTheme();
  return (
    <div className="theme-selector">
      <span>Theme: </span>
      {allThemes.map((t) => (
        <button
          key={t.name}
          style={{ background: t.color, color: '#fff', margin: '0 4px', border: t.name === theme.name ? '2px solid #fff' : 'none' }}
          onClick={() => setThemeByName(t.name)}
        >
          {t.name}
        </button>
      ))}
    </div>
  );
};

function App() {
  const [panel, setPanel] = React.useState<null | 'admin' | 'user' | 'guest'>(null);
  return (
    <ThemeProvider>
      <>
        {panel === null ? (
          <Landing onAuthSuccess={setPanel} />
        ) : panel === 'user' ? (
          <UserPanel />
        ) : panel === 'admin' ? (
          <AdminPanel />
        ) : panel === 'guest' ? (
          <GuestPanel />
        ) : null}
      </>
    </ThemeProvider>
  );
}

export default App;
