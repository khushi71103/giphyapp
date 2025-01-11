const GifItem = ({ gif }) => {
  const { theme } = useTheme(); // Access theme from ThemeContext
  const isDark = theme === 'dark'; // Determine if the theme is dark
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <View style={styles.gifContainer}>
      {/* Play/Pause Toggle */}
      <TouchableOpacity onPress={togglePlayPause}>
        <Image
          source={{
            uri: isPlaying
              ? gif.images.fixed_width.url
              : gif.images.fixed_width_still?.url || gif.images.fixed_width.url,
          }}
          style={[
            styles.gif,
            {
              height:
                (ITEM_WIDTH * parseInt(gif.images.fixed_width.height)) /
                parseInt(gif.images.fixed_width.width),
            },
          ]}
        />
      </TouchableOpacity>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        {/* Share Button */}
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: isDark ? '#fff' : 'rgba(0, 0, 0, 0.6)', // White background in dark mode
            },
          ]}
          onPress={() => handleShare(gif)}
        >
          <Image
            source={require('../../src/assets/share-icon.png')}
            style={[
              styles.icon,
              { tintColor: isDark ? '#000' : '#fff' }, // Dynamic tint color
            ]}
          />
        </TouchableOpacity>

        {/* Download Button */}
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: isDark ? '#fff' : 'rgba(0, 0, 0, 0.6)', // White background in dark mode
            },
          ]}
          onPress={() => handleDownload(gif)}
        >
          <Image
            source={require('../../src/assets/download-icon.png')}
            style={[
              styles.icon,
              { tintColor: isDark ? '#000' : '#fff' }, // Dynamic tint color
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
