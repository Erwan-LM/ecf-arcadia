import React, { useState } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Container from '../components/Container';
import useLocalIpAddress from '@config';

const Contact = ({ isVisible, onClose }) => {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');

  const ip = useLocalIpAddress();

  const handleSubmit = () => {
    // Créez un objet avec les données du formulaire
    const formData = {
      titre: titre,
      description: description,
      email: email
    };

    // Envoie des données du formulaire au backend
    fetch(`http://${ip}:3000/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      // Afficher une confirmation à l'utilisateur ou effectuer une autre action en cas de succès
    })
    .catch(error => {
      console.error('Error sending contact form data:', error);
      // Gérer les erreurs ici
    });
  };

  return (
    <Modal visible={isVisible} transparent={true} onRequestClose={onClose}>
      <Container>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Contact</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Titre" 
              value={titre}
              onChangeText={text => setTitre(text)}
            />
            <TextInput 
              style={styles.input} 
              placeholder="Description" 
              multiline={true} 
              numberOfLines={4} 
              value={description}
              onChangeText={text => setDescription(text)}
            />
            <TextInput 
              style={styles.input} 
              placeholder="Votre e-mail" 
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Envoyer</Text>
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E8B57',
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
    backgroundColor: '#2E8B57',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Contact;
