import React, { useState, useEffect, useCallback } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  FlatList, 
  Image, 
  TouchableOpacity,
  Share,
  useColorScheme,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { debounce } from 'lodash';
import { useGiphySearch } from '../../src/hooks/useGiphySearch';
import { COLORS } from '../../src/constants/theme';
import { Gif } from '../../src/types/giphy';
import * as FileSystem from 'expo-file-system';

const COLUMN_COUNT = 2;
const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / COLUMN_COUNT - 16;

export default function TabOneScreen() {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const { loading, error, fetchGifs } = useGiphySearch();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const loadGifs = useCallback(async (isNewSearch = false) => {
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
  }, [offset, searchQuery, fetchGifs, gifs]);

  useEffect(() => {
    loadGifs();
  }, []);

  const handleSearch = debounce((text: string) => {
    setSearchQuery(text);
    loadGifs(true);
  }, 500);

  const handleShare = async (gif: Gif) => {
    try {
      await Share.share({
        url: gif.images.original.url,
        message: 'Check out this GIF!',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = async (gif: Gif) => {
    try {
      const fileUri = `${FileSystem.documentDirectory}${gif.id}.gif`;
      await FileSystem.downloadAsync(gif.images.original.url, fileUri);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }: { item: Gif }) => (
    <View style={styles.gifContainer}>
      <TouchableOpacity
        onPress={() => handleShare(item)}
        onLongPress={() => handleDownload(item)}
      >
        <Image
          source={{ uri: item.images.fixed_width.url }}
          style={[styles.gif, {
            height: (ITEM_WIDTH * parseInt(item.images.fixed_width.height)) / 
                    parseInt(item.images.fixed_width.width)
          }]}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? COLORS.background.dark : COLORS.background.light }
    ]}>
      <TextInput
        style={[
          styles.searchInput,
          { 
            backgroundColor: isDark ? '#333' : '#eee',
            color: isDark ? COLORS.text.dark : COLORS.text.light 
          }
        ]}
        placeholder="Search GIFs..."
        placeholderTextColor={isDark ? '#999' : '#666'}
        onChangeText={handleSearch}
      />
      
      {loading && <ActivityIndicator size="large" color={COLORS.primary} />}
      
      <FlatList
        data={gifs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={COLUMN_COUNT}
        onEndReached={() => loadGifs()}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  searchInput: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    fontSize: 16,
  },
  listContainer: {
    padding: 4,
  },
  gifContainer: {
    flex: 1,
    padding: 4,
  },
  gif: {
    width: ITEM_WIDTH,
    borderRadius: 8,
  },
});