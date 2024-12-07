import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ThemeContext = createContext();

const themes = {
  light: {
    name: 'light',
    colors: {
      'background-base': '#f8f9fa',
      'background-primary': '#ffffff',
      'background-secondary': '#f0f2f5',
      'background-elevated': '#e9ecef',
      'text-primary': '#212529',
      'text-secondary': '#6c757d',
      'border-color': '#dee2e6',
      'border-light': '#e9ecef',
      'accent-color': '#0d6efd',
      'error-color': '#dc3545',
      'success-color': '#198754',
      'warning-color': '#ffc107'
    }
  },
  dark: {
    name: 'dark',
    colors: {
      'background-base': '#18191A',
      'background-primary': '#242526',
      'background-secondary': '#3A3B3C',
      'background-elevated': '#4E4F50',
      'text-primary': '#E4E6EB',
      'text-secondary': '#B0B3B8',
      'border-color': '#3E4042',
      'border-light': '#2D2E2F',
      'accent-color': '#2374E1',
      'error-color': '#EF4444',
      'success-color': '#22C55E',
      'warning-color': '#F59E0B'
    }
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'light';
  });

  const toggleTheme = useCallback(() => {
    setCurrentTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const themeColors = themes[currentTheme].colors;
    
    Object.entries(themeColors).forEach(([property, value]) => {
      root.style.setProperty(`--${property}`, value);
    });
  }, [currentTheme]);

  const value = {
    theme: currentTheme,
    toggleTheme,
    themes
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
