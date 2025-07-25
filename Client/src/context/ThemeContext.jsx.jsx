// context/ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';


export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Get initial theme from localStorage or system preference
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }

    // Check system preference
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return 'dark';
    }

    return 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const [isSystemTheme, setIsSystemTheme] = useState(
    !localStorage.getItem('theme')
  );

  // Listen for system theme changes
  useEffect(() => {
    if (isSystemTheme) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const handleChange = (e) => {
        console.log('System theme changed to:', e.matches ? 'dark' : 'light');
        setTheme(e.matches ? 'dark' : 'light');
      };

      // Modern browsers
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      }
      // Older browsers
      else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    }
  }, [isSystemTheme]);

  useEffect(() => {
    // Set CSS variables for theme colors
    document.documentElement.style.setProperty(
      '--theme-bg',
      themes[theme].backgroundColor
    );
    document.documentElement.style.setProperty(
      '--theme-text',
      themes[theme].textColor
    );
    document.documentElement.style.setProperty(
      '--theme-border',
      themes[theme].borderColor
    );
    document.documentElement.style.setProperty(
      '--theme-btn-bg',
      themes[theme].buttonBackground
    );
    document.documentElement.style.setProperty(
      '--theme-btn-text',
      themes[theme].btntextcolor
    );
    document.documentElement.style.setProperty(
      '--theme-active',
      themes[theme].buttonText
    );

    // Set data-theme attribute for DaisyUI
    document.documentElement.setAttribute(
      'data-theme',
      theme === 'dark' ? 'dark' : 'light'
    );
  }, [theme]);

  // Save theme to localStorage when it changes
  useEffect(() => {
    if (!isSystemTheme) {
      localStorage.setItem('theme', theme);
    }
  }, [theme, isSystemTheme]);

  const toggleTheme = () => {
    console.log('Toggling theme from:', theme);
    setIsSystemTheme(false);
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      console.log('New theme:', newTheme);
      return newTheme;
    });
  };

  // Set to system theme
  const useSystemTheme = () => {
    setIsSystemTheme(true);
    localStorage.removeItem('theme');

    // Update theme to match system
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  // My custom styles for Dark and light mode
  const themes = {
    light: {
      backgroundColor: '#ffffff',
      textColor: '#000000',
      borderColor: '#000000',
      buttonBackground: '#007AFF',
      buttonText: '#4635B1',
      shadowText: '#e7eaf6',
      activeIcon: '#000000',
      inactiveIcon: '#888888',
      userLogo: '#000000',
      logoText: '#ffffff',
      imageColor: '#3C3D37',
      iconColor: '#FFC785',
      btnbgcolor: '#000000', // for rectangular button
      btntextcolor: '#ffffff',
    },
    dark: {
      backgroundColor: '#000000',
      textColor: '#ffffff',
      borderColor: '#ffffff',
      buttonBackground: '#4CAF50',
      buttonText: '#AD49E1',
      activeIcon: '#ffffff',
      inactiveIcon: '#888888',
      imageColor: '#F1F0E9',
      btnbgcolor: '#ffffff', // for rectangular button
      btntextcolor: '#000000',
    },
  };

  // Apply theme to document body
  useEffect(() => {
    document.body.style.backgroundColor = themes[theme].backgroundColor;
    document.body.style.color = themes[theme].textColor;

    // Add a class to the document for easier CSS targeting
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors: themes[theme],
        toggleTheme,
        useSystemTheme,
        isSystemTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Add a custom hook for easier usage
export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};