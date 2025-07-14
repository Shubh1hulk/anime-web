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

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
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
