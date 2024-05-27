import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios';
import Container from '../components/Container';
import useLocalIpAddress from '@config';

const { width } = Dimensions.get('window');

const Tropic = () => {
  const [data, setData] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const ip = useLocalIpAddress();

  useEffect(() => {
    axios.get(`http://${ip}:3000/api/habitat/tropic`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const renderAnimal = ({ item }) => (
    <TouchableOpacity style={styles.animalContainer} onPress={() => setSelectedAnimal(item)}>
      <Image source={{ uri: `http://${ip}:3000/assets/${item.photo_path}` }} style={styles.animalImage} />
      <Text style={styles.animalName}>{item.animal}</Text>
    </TouchableOpacity>
  );

  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.title}>Tropic</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAnimal}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
      {selectedAnimal && (
        <View style={styles.animalDetail}>
          <Text style={styles.animalDetailTitle}>{selectedAnimal.animal}</Text>
          <Image source={{ uri: `http://${ip}:3000/assets/${selectedAnimal.photo_path}` }} style={styles.animalDetailImage} />
          <Text style={styles.animalDetailText}>Race: {selectedAnimal.race}</Text>
          <Text style={styles.animalDetailText}>État: {selectedAnimal.state}</Text>
          <Text style={styles.animalDetailText}>Nourriture: {selectedAnimal.food} ({selectedAnimal.grammage}g)</Text>
          <Text style={styles.animalDetailText}>Date de passage: {selectedAnimal.visit_date}</Text>
          {selectedAnimal.state_details && (
            <Text style={styles.animalDetailText}>Détails: {selectedAnimal.state_details}</Text>
          )}
          <TouchableOpacity onPress={() => setSelectedAnimal(null)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
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
    marginTop: 20,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  animalContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'rgba(173, 216, 230, 0.6)',
    borderRadius: 10,
    padding: 10,
  },
  animalImage: {
    width: width / 2.5,
    height: width / 2.5,
    borderRadius: 10,
    marginBottom: 10,
  },
  animalName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4682B4',
  },
  animalDetail: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  animalDetailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  animalDetailImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  animalDetailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#2E8B57',
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Tropic;
