import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Container from '../components/Container';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import useLocalIpAddress from '@config';

const Employe = () => {
    const [animaux, setAnimaux] = useState([]);
    const [pendingAvis, setPendingAvis] = useState([]);

    const ip = useLocalIpAddress();

    useEffect(() => {
        fetchAnimaux();
        fetchAvis();
    }, []);

    const fetchAnimaux = () => {
        axios.get(`http://${ip}:3000/api/animaux`)
            .then(response => setAnimaux(response.data))
            .catch(error => console.error('Erreur lors de la récupération des animaux :', error));
    };

    const fetchAvis = () => {
        axios.get(`http://${ip}:3000/api/avis`)
            .then(response => setPendingAvis(response.data))
            .catch(error => console.error('Erreur lors de la récupération des avis :', error));
    };

    const handleAvisValidation = (id, est_valide) => {
        axios.put(`http://${ip}:3000/api/avis/${id}`, { est_valide })
            .then(() => {
                setPendingAvis(pendingAvis.filter(avis => avis.id !== id));
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour de l\'avis :', error);
            });
    };

    return (
        <Container>
            <Swiper style={styles.wrapper} showsButtons={true}>
                {animaux.map((animal) => (
                    <View key={animal.id} style={styles.card}>
                        <Text style={styles.name}>{animal.prenom}</Text>
                        <Text style={styles.race}>{animal.race}</Text>
                        <Image source={{ uri: animal.image_path }} style={styles.image} />
                        <Text style={styles.habitat}>{animal.habitat}</Text>
                    </View>
                ))}
            </Swiper>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Avis en attente de validation</Text>
                {pendingAvis.map((item, index) => (
                    <View key={index} style={styles.avisCard}>
                        <Text style={styles.avisText}>{item.avis}</Text>
                        <Text style={styles.avisPseudo}>- {item.pseudo}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.approveButton]}
                                onPress={() => handleAvisValidation(item.id, true)}
                            >
                                <Text style={styles.buttonText}>Valider</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.rejectButton]}
                                onPress={() => handleAvisValidation(item.id, false)}
                            >
                                <Text style={styles.buttonText}>Rejeter</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        margin: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    race: {
        fontSize: 16,
        marginBottom: 5,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 5,
    },
    habitat: {
        fontSize: 16,
        color: '#555',
    },
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
    avisCard: {
        backgroundColor: '#F5F5F5',
        padding: 20,
        borderRadius: 10,
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
        marginBottom: 20,
    },
    avisText: {
        fontSize: 16,
        marginBottom: 10,
    },
    avisPseudo: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    approveButton: {
        backgroundColor: '#4CAF50',
    },
    rejectButton: {
        backgroundColor: '#F44336',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Employe;
