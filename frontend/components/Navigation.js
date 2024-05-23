import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Navigation = () => {
  const [selectedTab, setSelectedTab] = useState('Home'); // État pour suivre l'onglet sélectionné
  const [showSubTabs, setShowSubTabs] = useState(false); // État pour afficher les sous-onglets
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;

  const navigateToScreen = (screenName) => {
    setSelectedTab(screenName); // Mettre à jour l'onglet sélectionné
    setShowSubTabs(false); // Masquer les sous-onglets après navigation
    navigation.navigate(screenName);
  };

  const getNavItemStyle = (tabName) => {
    return {
      ...styles.navItem,
      fontSize: selectedTab === tabName ? 24 : 18, // Agrandir l'onglet sélectionné
      color: selectedTab === tabName ? '#8B4513' : '#2E8B57', // Changer la couleur de l'onglet sélectionné
    };
  };

  const renderNavItem = (label, iconName, tabName, subTabs = null) => {
    const isSelected = selectedTab === tabName;
    return (
      <TouchableOpacity
        onPress={() => {
          if (subTabs) {
            setSelectedTab(tabName);
            setShowSubTabs(!showSubTabs); // Toggle sous-onglets
          } else {
            navigateToScreen(tabName);
          }
        }}
        style={styles.navItemContainer}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        {screenWidth < 500 ? (
          <Icon name={iconName} size={24} color={isSelected ? '#8B4513' : '#2E8B57'} />
        ) : (
          <Text style={getNavItemStyle(tabName)}>{label}</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#D3E0C2" barStyle="dark-content" />
      <View style={styles.navigation}>
        {renderNavItem('Accueil', 'home', 'Home')}
        {renderNavItem('Services', 'cogs', 'Services')}
        {renderNavItem('Habitats', 'tree', 'Habitats', ['Aqua', 'Monts', 'Prairie', 'Savane', 'Tropic'])}
        {renderNavItem('Connexion', 'sign-in', 'Connexion')}
        {renderNavItem('Contact', 'envelope', 'Contact')}
      </View>
      {showSubTabs && (
        <View style={styles.subTabsContainer}>
          {['Aqua', 'Montage', 'Prairie', 'Savane', 'Tropic'].map((subTab) => (
            <TouchableOpacity key={subTab} onPress={() => navigateToScreen(subTab)} style={styles.subTabItem}>
              <Text style={styles.subTabText}>{subTab}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 1000,
    elevation: 5,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#D3E0C2',
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
  navItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  navItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  subTabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Répartir les sous-onglets sur toute la largeur de l'écran
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 5,
    paddingBottom: 10,
    marginTop: 5,
    zIndex: 999,
  },
  subTabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#D3E0C2',
    borderRadius: 5,
    marginHorizontal: 2, // Ajouter un petit espace entre les sous-onglets
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  subTabText: {
    fontSize: 16,
    color: '#2E8B57',
    textAlign: 'center',
  },
});

export default Navigation;
