import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme, ThemeProvider } from '../../src/context/ThemeContext'; // Import ThemeProvider and useTheme
import { COLORS } from '../../src/constants/theme';
import { Button } from 'react-native';

// TabBarIcon Component
function TabBarIcon({
  name,
  color,
}: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
}) {
  return <MaterialIcons size={24} name={name} color={color} />;
}

// Layout with Theme Toggle
function TabLayoutContent() {
  const { theme, toggleTheme } = useTheme(); // Use the custom theme hook
  const isDark = theme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: {
          backgroundColor: isDark ? COLORS.background.dark : COLORS.background.light,
        },
        headerStyle: {
          backgroundColor: isDark ? COLORS.background.dark : COLORS.background.light,
        },
        headerTintColor: isDark ? COLORS.text.dark : COLORS.text.light,
        headerRight: () => (
          <Button title="Toggle Theme" onPress={toggleTheme} /> // Add theme toggle button
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trending',
          tabBarIcon: ({ color }) => <TabBarIcon name="trending-up" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
    </Tabs>
  );
}

// Wrap TabLayoutContent in ThemeProvider
export default function TabLayout() {
  return (
    <ThemeProvider>
      <TabLayoutContent />
    </ThemeProvider>
  );
}
