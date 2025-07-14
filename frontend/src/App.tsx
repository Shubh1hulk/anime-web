import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider.tsx';
import './App.css';
import { LandingPage } from './pages/LandingPage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { UserPanelPage } from './pages/UserPanelPage.tsx';
import { AdminPanelPage } from './pages/AdminPanelPage.tsx';
import { GuestPanelPage } from './pages/GuestPanelPage.tsx';

// Removed old Landing and AuthPanel reference; all authentication is now handled in LoginPage.tsx


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
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<UserPanelPage />} />
          <Route path="/admin" element={<AdminPanelPage />} />
          <Route path="/guest" element={<GuestPanelPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
