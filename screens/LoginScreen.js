import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({ setIsAuthenticated, navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Login Logic
  const handleLogin = async () => {
    try {
      const usersString = await AsyncStorage.getItem('users');
      const users = usersString ? JSON.parse(usersString) : []; // Default to empty array if no users

      if (!Array.isArray(users)) {
        setErrorMessage('An error occurred. Please try again.');
        return;
      }

      // Check if the username exists in the stored users
      const user = users.find(user => user.username === username);

      if (user) {
        if (user.password === password) {
          setIsAuthenticated(true);
          navigation.navigate('Home'); // Navigate to Home screen after successful login
          setErrorMessage(''); // Clear any previous errors
        } else {
          setErrorMessage('Incorrect password. Please try again.');
        }
      } else {
        setErrorMessage('Username does not exist. Please sign up first.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      console.error('Login Error:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/farmers.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
          <Icon name="leaf" size={20} color="#fff" style={styles.buttonIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.signupLink}>
          <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2c6e49',
  },
  title: {
    fontSize: 30,
    fontFamily: 'sans-serif',
    color: '#2c6e49',
    marginBottom: 30,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#2c6e49',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontFamily: 'sans-serif',
  },
  button: {
    backgroundColor: '#2c6e49',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'sans-serif',
    marginRight: 10,
  },
  buttonIcon: {
    marginLeft: 10,
  },
  signupLink: {
    marginTop: 20,
  },
  signupText: {
    color: '#2c6e49',
    fontSize: 16,
    fontFamily: 'sans-serif',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;
