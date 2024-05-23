import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const BackgroundContainer = ({ children }) => {
  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.container}>
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default BackgroundContainer;
