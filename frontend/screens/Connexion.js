import React, { useState } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Container from '../components/Container';

const Connexion = ({ isVisible, onClose, navigation }) => {
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');

    const handleConnexion = async () => {
        try {
            const response = await fetch('http://10.0.2.2:3000/api/utilisateurs/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    motDePasse: motDePasse,
                }),
            });
            const data = await response.json();

            // Vérification de la réponse du serveur
            if (response.ok) {
                // Redirection en fonction du type d'utilisateur
                switch (data.type) {
                    case 'Administrateur':
                        // Rediriger vers Administrateur.js
                        navigation.navigate('Administrateur');
                        break;
                    case 'Employé':
                        // Rediriger vers Employe.js
                        navigation.navigate('Employe');
                        break;
                    case 'Vétérinaire':
                        // Rediriger vers Veterinaire.js
                        navigation.navigate('Veterinaire');
                        break;
                    default:
                        // Type d'utilisateur non reconnu
                        console.error('Type d\'utilisateur non reconnu');
                }
            } else {
                // Afficher un message d'erreur ou effectuer une action en cas d'échec de connexion
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <Modal visible={isVisible} transparent={true} onRequestClose={onClose}>
            <Container>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>Connexion</Text>
                        <TextInput style={styles.input} placeholder="E-mail" onChangeText={setEmail} />
                        <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry={true} onChangeText={setMotDePasse} />
                        <TouchableOpacity style={styles.button} onPress={handleConnexion}>
                            <Text style={styles.buttonText}>Se connecter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Container>
        </Modal>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: width * 0.8, // 80% de la largeur de l'écran
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2E8B57', // Couleur du titre
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        width: '100%',
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#2E8B57', // Couleur du bouton
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Connexion;
