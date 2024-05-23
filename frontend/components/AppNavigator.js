import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Importez vos écrans ici
import HomeScreen from '../screens/Home';
import ServicesScreen from '../screens/Services';
import ConnexionScreen from '../screens/Connexion';
import ContactScreen from '../screens/Contact';
import AquaScreen from '../screens/Aqua';
import MontsScreen from '../screens/Monts';
import PrairieScreen from '../screens/Prairie';
import SavaneScreen from '../screens/Savane';
import TropicScreen from '../screens/Tropic';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Services" component={ServicesScreen} />
        <Stack.Screen name="Connexion" component={ConnexionScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="Aqua" component={AquaScreen} />
        <Stack.Screen name="Montage" component={MontsScreen} />
        <Stack.Screen name="Prairie" component={PrairieScreen} />
        <Stack.Screen name="Savane" component={SavaneScreen} />
        <Stack.Screen name="Tropic" component={TropicScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
