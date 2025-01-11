import React, { createContext, useState, useContext } from 'react';
import { useColorScheme } from 'react-native';

// Explicitly define the type of theme to be either 'light' or 'dark'
type ThemeType = 'light' | 'dark';

const ThemeContext = createContext<any>(null);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemTheme = useColorScheme();
  
  // Define state with the ThemeType ('light' | 'dark')
  const [theme, setTheme] = useState<ThemeType>(systemTheme === 'dark' ? 'dark' : 'light');

  const toggleTheme = () => {
    setTheme((prevTheme: ThemeType) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
