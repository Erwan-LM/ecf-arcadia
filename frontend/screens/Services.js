import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import Container from '../components/Container';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      console.log('Fetching services...');
      try {
        // Change this to your machine's IP address
        const response = await axios.get('http://10.0.2.2:3000/api/services'); 
        console.log('Services fetched successfully:', response.data);
        setServices(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        if (error.response) {
          console.error('Response error:', error.response);
        } else if (error.request) {
          console.error('Request error:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const renderServiceItem = ({ item }) => (
    <View style={styles.serviceItem}>
      <Text style={styles.serviceName}>{item.nom}</Text>
      <Text style={styles.serviceDescription}>{item.description}</Text>
    </View>
  );

  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.title}>Nos Services</Text>
        <Text style={styles.subtitle}>Découvrez tous les services proposés par le parc Arcadia</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#2E8B57" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={services}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderServiceItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
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
