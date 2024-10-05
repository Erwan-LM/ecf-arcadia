import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import axios from 'axios';
import Container from '../components/Container'; // Assurez-vous que ce composant existe et est correctement importé

const { width, height } = Dimensions.get('window');

const Services = () => {
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        console.log('Fetching services...');
        const response = await axios.get('http://192.168.1.17:3000/api/services');
        console.log('Services data:', response.data);
        setServicesData(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
  
    fetchServices();
  }, []);

  const ServiceItem = ({ name, description }) => (
    <View style={styles.serviceItem}>
      <Text style={styles.serviceName}>{name}</Text>
      <Text style={styles.serviceDescription}>{description}</Text>
    </View>

  );
  

  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.title}>Nos Services</Text>
        <Text style={styles.subtitle}>Découvrez tous les services proposés par le parc Arcadia</Text>
      </View>
      <FlatList
        data={servicesData}
        keyExtractor={(item) => item.service_id.toString()} // Changez ici si nécessaire
        renderItem={({ item }) => <ServiceItem name={item.nom} description={item.description} />}
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
