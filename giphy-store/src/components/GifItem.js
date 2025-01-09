import React, { useState } from 'react';
import { TouchableOpacity, Image, Share, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';

const GifItem = ({ gif, onPress }) => {
  const [isPaused, setIsPaused] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        url: gif.images.original.url,
        message: 'Check out this GIF!',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + gif.id + '.gif';
      await FileSystem.downloadAsync(gif.images.original.url, fileUri);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => setIsPaused(!isPaused)}
      onLongPress={handleShare}
    >
      <Image
        source={{ uri: isPaused ? gif.images.still.url : gif.images.original.url }}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
});
