import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { WebView } from 'react-native-webview';

const CropRecommendationScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/farmers.png')} // Background image
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Crop Recommendation</Text>

        <View style={styles.webviewContainer}>
          <WebView
            source={{ uri: 'https://crop-rec-6fkmdgznldijaqkynlhayu.streamlit.app/' }}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    fontFamily: 'sans-serif', // Sans-serif font for consistency
  },
  webviewContainer: {
    width: '80%',
    height: '80%', // Adjust the height of the WebView container
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white', // Makes the WebView container visually distinct
    opacity: 0.2, // Adjust opacity here (less than 1 to make it more transparent)

  },
});

export default CropRecommendationScreen;
