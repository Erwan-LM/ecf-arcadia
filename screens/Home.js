import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import Container from '../components/Container';
import 'react-native-gesture-handler';


const { width, height } = Dimensions.get('window');

const Home = () => {
  // État pour stocker les données des diapositives
  const [data, setData] = useState([]);

  // Effet pour charger les données des diapositives
  useEffect(() => {
    // Données de test
    const dummyData = [
      {
        title: "Présentation du zoo",
        description: "Depuis 1960, Arcadia est un zoo situé en France, en Bretagne, près de la forêt de Brocéliande. Nous nous engageons à offrir un environnement sain et naturel à nos animaux, répartis par habitat (savane, jungle, marais)."
      },
      {
        title: "Nos engagements écologiques",
        description: "Arcadia est fier d'être entièrement indépendant au niveau des énergies. Nous veillons à réduire notre empreinte environnementale et à sensibiliser nos visiteurs à la protection de la nature."
      },
      {
        title: "Services",
        description: "Découvrez nos services variés, de la restauration aux visites guidées, pour vivre une expérience inoubliable au sein du zoo Arcadia."
      },
      {
        title: "Nos Habitats",
        description: "Explorez nos différents habitats où vivent nos animaux : savane, jungle, marais. Chaque habitat est conçu pour reproduire au mieux les conditions naturelles de vie des espèces qui y résident."
      },
      {
        title: "Avis du Zoo",
        description: "Découvrez ce que nos visiteurs pensent de leur expérience à Arcadia. Nous sommes ravis de partager leurs retours et de continuer à améliorer nos services."
      }
    ];
    // Mise à jour des données d'état
    setData(dummyData);
  }, []);

  // Fonction pour rendre chaque diapositive
  const renderSlides = () => {
    // Parcourir les données et créer une diapositive pour chaque élément
    return data.map((item, index) => (
      <View style={styles.slide} key={index}>
        <Text style={styles.slideTitle}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    ));
  };

  return (
    <Container>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Bienvenue à Arcadia</Text>
        </View>
        <Text style={styles.subtitle}>Le zoo écologique près de la forêt de Brocéliande</Text>
        <Image source={require('../assets/test.jpg')} style={styles.image} />
      </View>
      <Swiper loop={false} showsButtons={false} autoplay={true} autoplayTimeout={5}>
        {renderSlides()}
      </Swiper>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    marginTop: height * 0.10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2E8B57',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#4682B4',
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    width: '80%',  // Ajustement pour bien centrer l'image
    height: 200,
    resizeMode: 'cover',  // Garde les proportions de l'image
    marginBottom: 10,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  slideTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E8B57',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  dotStyle: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDotStyle: {
    backgroundColor: '#000',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  }
});

export default Home;
