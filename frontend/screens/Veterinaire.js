import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import Container from '../components/Container';
import axios from 'axios';
import Swiper from 'react-native-swiper';

const VeterinaireScreen = () => {
    const [habitats, setHabitats] = useState([]);
    const [selectedHabitat, setSelectedHabitat] = useState(null);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [compteRendu, setCompteRendu] = useState({
        id_utilisateur: 'veterinaire_id', // Placeholder for veterinarian ID
        id_animal: '',
        date: '',
        rapport: '',
    });

    useEffect(() => {
        fetchHabitats();
    }, []);

    const fetchHabitats = async () => {
        try {
            console.log('Fetching habitats...');
            const response = await axios.get('/api/veterinaire/habitats');
            setHabitats(response.data);
            console.log('Habitats fetched:', response.data);
        } catch (error) {
            console.error('Error fetching habitats:', error);
        }
    };

    const handleHabitatSelect = async (habitatId) => {
        try {
            console.log('Fetching habitat details for ID:', habitatId);
            const response = await axios.get(`/api/veterinaire/habitats/${habitatId}`);
            setSelectedHabitat(response.data);
            console.log('Habitat details:', response.data);
        } catch (error) {
            console.error('Error fetching habitat details:', error);
        }
    };

    const handleAnimalSelect = (animal) => {
        console.log('Selecting animal:', animal);
        setSelectedAnimal(animal);
        setCompteRendu(prevState => ({
            ...prevState,
            id_animal: animal.id,
            date: new Date().toISOString(),
        }));
    };

    const handleCompteRenduSubmit = async () => {
        try {
            console.log('Submitting compte rendu:', compteRendu);
            await axios.post('/api/veterinaire/compterendus', compteRendu);
            setCompteRendu({
                ...compteRendu,
                rapport: '',
            });
            console.log('Compte rendu submitted successfully');
        } catch (error) {
            console.error('Error submitting compte rendu:', error);
        }
    };

    return (
        <Container>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Espace Vétérinaire</Text>
                <Text style={styles.subtitle}>Sélectionnez un habitat :</Text>
                <Swiper style={styles.habitatSwiper} showsButtons>
                    {habitats.map((habitat) => (
                        <TouchableOpacity
                            key={habitat.id}
                            style={styles.habitatButton}
                            onPress={() => handleHabitatSelect(habitat.id)}
                        >
                            <Text style={styles.habitatButtonText}>{habitat.nom}</Text>
                        </TouchableOpacity>
                    ))}
                </Swiper>
                {selectedHabitat && (
                    <View style={styles.selectedHabitatContainer}>
                        <Text style={styles.subtitle}>Détails de l'habitat :</Text>
                        <Text>{selectedHabitat.description}</Text>
                        <Swiper style={styles.animalSwiper} showsButtons>
                            {selectedHabitat.animaux.map((animal) => (
                                <TouchableOpacity
                                    key={animal.id}
                                    onPress={() => handleAnimalSelect(animal)}
                                >
                                    <View style={styles.animalCard}>
                                        <Text>{animal.prenom}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </Swiper>
                    </View>
                )}
                {selectedAnimal && (
                    <View style={styles.selectedAnimalContainer}>
                        <Text style={styles.subtitle}>Détails de l'animal :</Text>
                        <Text>{selectedAnimal.prenom}</Text>
                        <Text>{selectedAnimal.race}</Text>
                        <TextInput
                            placeholder="Rapport"
                            value={compteRendu.rapport}
                            onChangeText={(text) => setCompteRendu({...compteRendu, rapport: text})}
                        />
                        <TouchableOpacity onPress={handleCompteRenduSubmit}>
                            <Text>Envoyer le compte rendu</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    habitatSwiper: {
        height: 200,
        marginBottom: 20,
    },
    habitatButton: {
        backgroundColor: '#2E8B57',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    habitatButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    selectedHabitatContainer: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 5,
    },
    animalSwiper: {
        height: 200,
        marginTop: 10,
    },
    animalCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    selectedAnimalContainer: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 5,
    },
});

export default VeterinaireScreen;
