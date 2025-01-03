import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, Image, Animated, TouchableOpacity, ImageBackground } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing the Leaf icon

const API_KEY = 'f70a9633506e756b3dd29d888787928e'; // Replace with your actual API key

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  // Animated button scale
  const [scale] = useState(new Animated.Value(1));

  const fetchWeather = async () => {
    if (!city) {
      Alert.alert('Error', 'Please enter a city name.');
      return;
    }

    setLoading(true);

    try {
      const encodedCity = encodeURIComponent(city); // Automatically encode city name
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${API_KEY}&units=metric`
      );

      console.log(response.data); // Log the API response for debugging

      if (response.status === 200) {
        setWeather(response.data);
      } else {
        throw new Error('Failed to fetch weather data');
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Could not fetch weather data. Please check your city name or try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (iconCode) => {
    // OpenWeatherMap icons, prefix with 'http://openweathermap.org/img/wn/'
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  // Button animation effect on press
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ImageBackground
      source={require('../assets/farmers.png')} // Background image
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Weather Information</Text>

        {/* City input and fetch button */}
        <TextInput
          style={styles.input}
          placeholder="Enter City"
          value={city}
          onChangeText={setCity}
          placeholderTextColor="#fff"
        />
        <Animated.View style={{ transform: [{ scale }] }}>
          <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={fetchWeather}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Get Weather</Text>
              <Icon name="leaf" size={20} color="#fff" style={styles.buttonIcon} />
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Weather Info */}
        {loading && <Text style={styles.loadingText}>Loading...</Text>}

        {weather && !loading && (
          <View style={styles.weatherInfo}>
            <Text style={styles.city}>{weather?.name || 'Unknown City'}</Text>
            {weather.weather && weather.weather[0] && (
              <Image
                source={{ uri: getWeatherIcon(weather.weather[0].icon) }}
                style={styles.icon}
              />
            )}
            <Text style={styles.temperature}>
              {weather.main?.temp !== undefined ? `${weather.main.temp}°C` : 'N/A'}
            </Text>
            <Text style={styles.description}>
              {weather.weather && weather.weather[0]?.description || 'No description available'}
            </Text>
          </View>
        )}
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
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    backgroundColor: '#ffffff90',
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'sans-serif',
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    fontStyle: 'italic',
  },
  weatherInfo: {
    alignItems: 'center',
    backgroundColor: '#ffffff90',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  city: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#388E3C', // Green color for consistency with button style
    fontFamily: 'sans-serif',
  },
  temperature: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#388E3C',
    marginTop: 10,
    fontFamily: 'sans-serif',
  },
  description: {
    fontSize: 18,
    color: '#388E3C',
    marginTop: 10,
    fontFamily: 'sans-serif',
  },
  icon: {
    width: 80,
    height: 80,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#388E3C',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginLeft: 10,
  },
});

export default WeatherApp;
