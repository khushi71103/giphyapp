import React, { useEffect } from 'react';
import { View, StyleSheet, Switch, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import GifGrid from '../components/GifGrid';
import { COLORS } from '../constants/theme';
import { useGiphy } from '../hooks/useGiphy';
import { useTheme } from '../context/ThemeContext'; // Import ThemeContext

const HomeScreen = () => {
  const { theme, toggleTheme } = useTheme(); // Access theme and toggleTheme from ThemeContext
  const isDarkMode = theme === 'dark';

  const [gifs, setGifs] = React.useState([]);
  const [offset, setOffset] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState('');
  const { loading, error, fetchGifs } = useGiphy();

  const loadGifs = async (isNewSearch = false) => {
    const newOffset = isNewSearch ? 0 : offset;
    const endpoint = searchQuery ? 'search' : 'trending';
    const params = {
      limit: 20,
      offset: newOffset,
      ...(searchQuery && { q: searchQuery }),
    };

    const newGifs = await fetchGifs(endpoint, params);
    setGifs(isNewSearch ? newGifs : [...gifs, ...newGifs]);
    setOffset(newOffset + 20);
  };

  useEffect(() => {
    loadGifs();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    loadGifs(true);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? COLORS.background.dark : COLORS.background.light },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }]}>
          Giphy Store
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme} // Use global toggleTheme function
          trackColor={{ false: '#666', true: COLORS.primary }}
        />
      </View>
      <SearchBar onSearch={handleSearch} theme={isDarkMode ? 'dark' : 'light'} />
      {error && <Text style={styles.error}>{error}</Text>}
      {loading && <ActivityIndicator size="large" color={COLORS.primary} />}
      <GifGrid gifs={gifs} onLoadMore={() => loadGifs()} isDarkMode={isDarkMode} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    padding: 10,
    textAlign: 'center',
  },
});

export default HomeScreen;
