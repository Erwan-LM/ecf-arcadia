import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Container from '../components/Container';
import axios from 'axios';

const { width } = Dimensions.get('window');

const Aqua = () => {
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  useEffect(() => {
    const fetchHabitatData = async () => {
      try {
        const habitatResponse = await axios.get('http://10.0.2.2:3000/api/habitat?nom=Océan');
        const habitatId = habitatResponse.data.habitat_id;

        const animalResponse = await axios.get(`http://10.0.2.2:3000/api/animal/habitat/${habitatId}`);
        setData(animalResponse.data);

        // Récupération des images associées à l'habitat
        const imageResponse = await axios.get(`http://10.0.2.2:3000/api/image/${habitatId}`);
        setImages(imageResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Erreur', 'Une erreur est survenue lors de la récupération des données.');
      }
    };

    fetchHabitatData();
  }, []);

  const renderAnimal = ({ item }) => (
    <TouchableOpacity style={styles.animalContainer} onPress={() => setSelectedAnimal(item)}>
      <Image source={{ uri: `http://10.0.2.2:3000/assets/${item.photo_path}` }} style={styles.animalImage} />
      <Text style={styles.animalName}>{item.animal}</Text>
    </TouchableOpacity>
  );

  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.title}>Aqua</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.animal_id.toString()}
        renderItem={renderAnimal}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
      {selectedAnimal && (
        <View style={styles.animalDetail}>
          <Text style={styles.animalDetailTitle}>{selectedAnimal.animal}</Text>
          <Image source={{ uri: `http://10.0.2.2:3000/assets/${selectedAnimal.photo_path}` }} style={styles.animalDetailImage} />
          <Text style={styles.animalDetailText}>Race: {selectedAnimal.race}</Text>
          <Text style={styles.animalDetailText}>État: {selectedAnimal.state}</Text>
          <Text style={styles.animalDetailText}>Images:</Text>
          <FlatList
            data={images.filter(image => image.habitat_id === selectedAnimal.habitat_id)} // Filtre les images par habitat
            keyExtractor={(item) => item.image_id.toString()}
            renderItem={({ item }) => (
              <Image source={{ uri: `data:image/jpeg;base64,${item.image_data}` }} style={styles.imageThumbnail} />
            )}
            horizontal
          />
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
  imageThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
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

export default Aqua;
