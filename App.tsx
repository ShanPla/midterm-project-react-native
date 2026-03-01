import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';
import { JobProvider } from './src/context/JobContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

function NavigationWrapper() {
  const { isDarkMode, theme } = useTheme();

  const navigationTheme = {
    ...(isDarkMode ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDarkMode ? DarkTheme.colors : DefaultTheme.colors),
      background: theme.background,
      card: theme.card,
      text: theme.text,
      border: theme.border,
      primary: theme.primary,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <MainNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <JobProvider>
        <NavigationWrapper />
      </JobProvider>
    </ThemeProvider>
  );
}