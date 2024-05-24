import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Container from '../components/Container';
import axios from 'axios';
import Swiper from 'react-native-swiper';

const Administrateur = () => {
    // State pour la création de comptes
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accountType, setAccountType] = useState('');
    // State pour la gestion des services
    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState('');
    // State pour la gestion des habitats
    const [habitats, setHabitats] = useState([]);
    const [newHabitat, setNewHabitat] = useState('');
    // State pour la gestion des animaux
    const [animaux, setAnimaux] = useState([]);

    useEffect(() => {
        // Chargement initial des données (services, habitats, animaux, etc.)
        console.log("Fetching services...");
        fetchServices();
        console.log("Fetching habitats...");
        fetchHabitats();
        console.log("Fetching animaux...");
        fetchAnimaux();
    }, []);

    const fetchServices = () => {
        // Récupérer les services depuis le backend
        axios.get('http://10.0.2.2:3000/api/services')
            .then(response => {
                console.log("Services:", response.data);
                setServices(response.data);
            })
            .catch(error => console.error('Erreur lors de la récupération des services :', error));
    };

    const fetchHabitats = () => {
        // Récupérer les habitats depuis le backend
        axios.get('http://10.0.2.2:3000/api/habitats')
            .then(response => {
                console.log("Habitats:", response.data);
                setHabitats(response.data);
            })
            .catch(error => console.error('Erreur lors de la récupération des habitats :', error));
    };

    const fetchAnimaux = () => {
        // Récupérer les animaux depuis le backend
        axios.get('http://10.0.2.2:3000/api/animaux')
            .then(response => {
                console.log("Animaux:", response.data);
                setAnimaux(response.data);
            })
            .catch(error => console.error('Erreur lors de la récupération des animaux :', error));
    };

    const addService = () => {
        // Ajouter un nouveau service
        console.log("Adding new service:", newService);
        axios.post('http://10.0.2.2:3000/api/services', { name: newService })
            .then(response => {
                console.log("New service added successfully:", response.data);
                fetchServices();
                setNewService('');
            })
            .catch(error => console.error('Erreur lors de l\'ajout du service :', error));
    };

    const deleteService = (id) => {
        // Supprimer un service
        console.log("Deleting service with ID:", id);
        axios.delete(`http://10.0.2.2:3000/api/services/${id}`)
            .then(response => {
                console.log("Service deleted successfully.");
                fetchServices();
            })
            .catch(error => console.error('Erreur lors de la suppression du service :', error));
    };

    // Méthode pour créer un compte
    const createAccount = () => {
        // Appel à une API pour créer un compte
        console.log("Creating account with username:", username);
        axios.post('http://10.0.2.2:3000/api/accounts', {
            username,
            password,
            accountType
        })
        .then(response => {
            console.log("Account created successfully:", response.data);
            setUsername('');
            setPassword('');
            setAccountType('');
            alert('Compte créé avec succès');
        })
        .catch(error => console.error('Erreur lors de la création du compte :', error));
    };

    return (
        <Container>
            <View>
                <Text>Espace Administrateur</Text>

                <TextInput
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    placeholder="Mot de passe"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <TextInput
                    placeholder="Type de compte"
                    value={accountType}
                    onChangeText={setAccountType}
                />
                <Button title="Créer un compte" onPress={createAccount} />

                <Text>Gestion des services</Text>
                <TextInput
                    placeholder="Nouveau service"
                    value={newService}
                    onChangeText={setNewService}
                />
                <Button title="Ajouter" onPress={addService} />
                <FlatList
                    data={services}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => deleteService(item.id)}>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />

                <Text>Gestion des habitats</Text>
                <TextInput
                    placeholder="Nouvel habitat"
                    value={newHabitat}
                    onChangeText={setNewHabitat}
                />
                <Button title="Ajouter" onPress={addService} /> {/* Change to addHabitat when implemented */}
                <FlatList
                    data={habitats}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => deleteService(item.id)}>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />

                <Text>Gestion des animaux</Text>
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
                </Container>
            </View>
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
});

export default Administrateur;
