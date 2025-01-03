import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/farmers.png')} // Corrected for local image
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to KRISHISUVIDHA</Text>

        {/* Leaf Button for Weather */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Weather')}
        >
          <Text style={styles.buttonText}>Weather</Text>
          <Icon name="leaf" size={20} color="#fff" style={styles.buttonIcon} />
        </TouchableOpacity>

        {/* Leaf Button for Disease Identification */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Disease Identification')}
        >
          <Text style={styles.buttonText}>Disease Identification</Text>
          <Icon name="leaf" size={20} color="#fff" style={styles.buttonIcon} />
        </TouchableOpacity>

        {/* Leaf Button for Crop Recommendation */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Crop Recommendation')}
        >
          <Text style={styles.buttonText}>Crop Recommendation</Text>
          <Icon name="leaf" size={20} color="#fff" style={styles.buttonIcon} />
        </TouchableOpacity>

        {/* Adding Leaf and Tree Images */}
        <Image
          source={{ uri: 'https://source.unsplash.com/featured/?tree' }}
          style={styles.treeImage}
        />
        <Image
          source={{ uri: 'https://source.unsplash.com/featured/?leaf' }}
          style={styles.leafImage}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
  button: {
    backgroundColor: '#2c6e49', // Greenish color for nature vibe
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    flexDirection: 'row', // Ensures the leaf icon appears next to the text
    justifyContent: 'center', // Centers both text and icon
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'sans-serif', // Sans-serif font
  },
  buttonIcon: {
    marginLeft: 10, // Space between the text and the leaf icon
  },
  treeImage: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    width: 100,
    height: 100,
    opacity: 0.5,
  },
  leafImage: {
    position: 'absolute',
    top: 20,
    right: 30,
    width: 80,
    height: 80,
    opacity: 0.5,
  },
});

export default HomeScreen;
