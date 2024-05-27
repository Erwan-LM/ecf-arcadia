import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Importez vos écrans ici
import HomeScreen from '../screens/Home';
import ServicesScreen from '../screens/Services';
import ConnexionScreen from '../screens/Connexion';
import ContactScreen from '../screens/Contact';
import AquaScreen from '../screens/Aqua';
import MontagneScreen from '../screens/Montagne';
import PrairieScreen from '../screens/Prairie';
import SavaneScreen from '../screens/Savane';
import TropicScreen from '../screens/Tropic';
import AvisScreen from '../screens/Avis';
import EmployeScreen from '../screens/Employe';
import AdministrateurScreen from '../screens/Administrateur';
import VeterinaireScreen from '../screens/Veterinaire';

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
        <Stack.Screen name="Montagne" component={MontagneScreen} />
        <Stack.Screen name="Prairie" component={PrairieScreen} />
        <Stack.Screen name="Savane" component={SavaneScreen} />
        <Stack.Screen name="Tropic" component={TropicScreen} />
        <Stack.Screen name="Avis" component={AvisScreen} />
        <Stack.Screen name="Employe" component={EmployeScreen} />
        <Stack.Screen name="Administrateur" component={AdministrateurScreen} />
        <Stack.Screen name="Veterinaire" component={VeterinaireScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
