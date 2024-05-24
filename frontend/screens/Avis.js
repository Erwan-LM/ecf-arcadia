import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Container from '../components/Container';

const Avis = () => {
    const [avis, setAvis] = useState([]);
    const [pseudoValue, setPseudoValue] = useState('');
    const [avisValue, setAvisValue] = useState('');
    const [showForm, setShowForm] = useState(true);
    const [confirmationMessage, setConfirmationMessage] = useState('');

    useEffect(() => {
        console.log("Fetching avis data from API...");
        fetch('http://10.0.2.2:3000/api/avis')
        .then(response => response.json())
        .then(data => {
            console.log("Avis data fetched successfully:", data);
            setAvis(data);
        })
        .catch(error => {
            console.error('Error fetching avis data:', error);
        });
    }, []);

    const submitAvis = () => {
        console.log("Submitting avis...");
        fetch('http://10.0.2.2:3000/api/avis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pseudo: pseudoValue,
                avis: avisValue,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Avis submitted successfully:", data);
            setConfirmationMessage('Votre avis a bien été envoyé.');
            setTimeout(() => {
                setConfirmationMessage('');
                setShowForm(false);
            }, 5000);
        })
        .catch(error => {
            console.error('Error submitting avis:', error);
        });
    };

    return (
        <Container>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Avis sur Arcadia</Text>
                <View style={styles.avisContainer}>
                    {avis.map((item, index) => (
                        <View key={index} style={styles.avisCard}>
                            <Text style={styles.avisText}>{item.avis}</Text>
                            <Text style={styles.avisPseudo}>- {item.pseudo}</Text>
                        </View>
                    ))}
                </View>
                {showForm && (
                    <View style={styles.formContainer}>
                        <Text style={styles.formTitle}>Rédigez votre avis :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Votre pseudo"
                            value={pseudoValue}
                            onChangeText={text => setPseudoValue(text)}
                        />
                        <TextInput
                            style={[styles.input, { height: 100 }]}
                            placeholder="Votre avis"
                            multiline={true}
                            value={avisValue}
                            onChangeText={text => setAvisValue(text)}
                        />
                        <TouchableOpacity style={styles.submitButton} onPress={submitAvis}>
                            <Text style={styles.submitButtonText}>Envoyer</Text>
                        </TouchableOpacity>
                        {confirmationMessage !== '' && (
                            <Text style={styles.confirmationMessage}>{confirmationMessage}</Text>
                        )}
                    </View>
                )}
                {!showForm && (
                    <TouchableOpacity style={styles.leaveReviewButton} onPress={() => setShowForm(true)}>
                        <Text style={styles.leaveReviewButtonText}>Laisser votre avis</Text>
                    </TouchableOpacity>
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
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#2E8B57',
    },
    avisContainer: {
        marginBottom: 20,
    },
    avisCard: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    avisText: {
        fontSize: 16,
    },
    avisPseudo: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
    },
    formContainer: {
        backgroundColor: '#586300',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    submitButton: {
        backgroundColor: '#2E8B57',
        padding: 10,
        borderRadius: 5,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    leaveReviewButton: {
        backgroundColor: '#2E8B57',
        padding: 15,
        borderRadius: 10,
        alignSelf: 'center',
    },
    leaveReviewButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    confirmationMessage: {
        marginTop: 10,
        color: 'white',
        textAlign: 'center',
    },
});

export default Avis;
