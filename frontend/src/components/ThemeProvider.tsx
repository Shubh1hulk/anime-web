import React, { createContext, useState, useContext, ReactNode } from 'react';
import animeThemes from '../assets/anime-themes.json';

export type Theme = {
  name: string;
  image: string;
  color: string;
};

interface ThemeContextType {
  theme: Theme;
  setThemeByName: (name: string) => void;
  allThemes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(animeThemes[0]);

  const setThemeByName = (name: string) => {
    const found = animeThemes.find((t) => t.name === name);
    if (found) setTheme(found);
  };

  return (
    <ThemeContext.Provider value={{ theme, setThemeByName, allThemes: animeThemes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

export const ThemeSelector = () => {
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
