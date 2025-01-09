import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Switch, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import GifGrid from '../components/GifGrid';
import { COLORS } from '../constants/theme';
import { useGiphy } from '../hooks/useGiphy';

const HomeScreen = () => {
  const [gifs, setGifs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
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
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDarkMode ? COLORS.background.dark : COLORS.background.light }
    ]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDarkMode ? COLORS.text.dark : COLORS.text.light }]}>
          Giphy Store
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          trackColor={{ false: '#666', true: COLORS.primary }}
        />
      </View>
      <SearchBar onSearch={handleSearch} theme={isDarkMode ? 'dark' : 'light'} />
      {error && <Text style={styles.error}>{error}</Text>}
      {loading && <ActivityIndicator size="large" color={COLORS.primary} />}
      <GifGrid
        gifs={gifs}
        onLoadMore={() => loadGifs()}
        isDarkMode={isDarkMode}
      />
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