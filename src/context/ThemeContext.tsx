import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Theme = {
background: string;
card: string;
text: string;
subText: string;
border: string;
primary: string;
danger: string; // <-- APPLY BUTTON COLOR (your error)
};

type ThemeContextType = {
theme: Theme;
isDarkMode: boolean;   // <-- your screen is asking for this
toggleTheme: () => void;
};

const lightTheme: Theme = {
background: '#f5f7fb',
card: '#ffffff',
text: '#1a1a1a',
subText: '#555',
border: '#e0e0e0',
primary: '#2f80ed',
danger: '#ff4d4f',
};

const darkTheme: Theme = {
background: '#121212',
card: '#1e1e1e',
text: '#ffffff',
subText: '#b0b0b0',
border: '#2a2a2a',
primary: '#4da3ff',
danger: '#ff6b6b',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
const [isDarkMode, setIsDarkMode] = useState(false);

const toggleTheme = () => setIsDarkMode(prev => !prev);

const theme = isDarkMode ? darkTheme : lightTheme;

return (
<ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
{children}
</ThemeContext.Provider>
);
};

export const useTheme = () => {
const context = useContext(ThemeContext);
if (!context) {
throw new Error('useTheme must be used inside ThemeProvider');
}
return context;
};
