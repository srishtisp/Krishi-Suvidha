import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import Weather from './screens/Weather';
import DiseaseIdentification from './screens/DiseaseIdentification';
import CropRecommendation from './screens/CropRecommendation';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? 'Home' : isNewUser ? 'Signup' : 'Login'}>
        {/* Signup Screen */}
        <Stack.Screen name="Signup" options={{ headerShown: false }}>
          {(props) => <SignupScreen {...props} setIsNewUser={setIsNewUser} />}
        </Stack.Screen>

        {/* Login Screen */}
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
        </Stack.Screen>

        {/* Main App Screens */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: true, title: 'Home' }}
        />
        <Stack.Screen
          name="Weather"
          component={Weather}
          options={{ headerShown: true, title: 'Weather' }}
        />
        <Stack.Screen
          name="Disease Identification"
          component={DiseaseIdentification}
          options={{ headerShown: true, title: 'Disease Identification' }}
        />

        <Stack.Screen
          name="Crop Recommendation"
          component={CropRecommendation}
          options={{ headerShown: true, title: 'Crop Recommendation' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
