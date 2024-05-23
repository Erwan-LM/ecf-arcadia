import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import Container from '../components/Container'; // Assurez-vous que ce composant existe et est correctement importé

const { width, height } = Dimensions.get('window');

const servicesData = [
  {
    id: '1',
    name: 'Restauration',
    description: 'Profitez de notre service de restauration avec des plats locaux et bio.',
  },
  {
    id: '2',
    name: 'Visite des habitats avec un guide',
    description: 'Découvrez les habitats des animaux avec un guide expérimenté. (Gratuit)',
  },
  {
    id: '3',
    name: 'Visite du zoo en petit train',
    description: 'Faites le tour du zoo en petit train et admirez les animaux.',
  },
];

const ServiceItem = ({ name, description }) => (
  <View style={styles.serviceItem}>
    <Text style={styles.serviceName}>{name}</Text>
    <Text style={styles.serviceDescription}>{description}</Text>
  </View>
);

const Services = () => {
  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.title}>Nos Services</Text>
        <Text style={styles.subtitle}>Découvrez tous les services proposés par le parc Arcadia</Text>
      </View>
      <FlatList
        data={servicesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ServiceItem name={item.name} description={item.description} />}
        contentContainerStyle={styles.listContainer}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2E8B57',
    textAlign: 'center',
    marginTop: height * 0.05,
  },
  subtitle: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#4682B4',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  serviceItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  serviceName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 10,
  },
  serviceDescription: {
    fontSize: 16,
    color: '#696969',
  },
});

export default Services;
