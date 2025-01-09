import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { COLORS } from '../../src/constants/theme';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

// Create the TabBarIcon component
function TabBarIcon({ 
  name, 
  color 
}: { 
  name: React.ComponentProps<typeof MaterialIcons>['name']; 
  color: string 
}) {
  return <MaterialIcons size={24} name={name} color={color} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: {
          backgroundColor: isDark ? COLORS.background.dark : COLORS.background.light
        },
        headerStyle: {
          backgroundColor: isDark ? COLORS.background.dark : COLORS.background.light
        },
        headerTintColor: isDark ? COLORS.text.dark : COLORS.text.light
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