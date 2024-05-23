import React from 'react';
import { View } from 'react-native';
import BackgroundContainer from './BackgroundContainer';
import Navigation from './Navigation';

const Container = ({ children }) => {
  return (
    <BackgroundContainer>
      <Navigation />
      {children}
    </BackgroundContainer>
  );
};

export default Container;
