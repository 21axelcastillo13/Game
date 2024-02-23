import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Animated } from 'react-native';

const CARD_BACK_IMAGE = require('./assets/card_back.jpg');
const CARD_IMAGES = [
  require('./assets/card1.jpg'),
  require('./assets/card2.jpg'),
  require('./assets/card3.jpg'),
  require('./assets/card4.jpg'),
  require('./assets/card5.jpg'),
  require('./assets/card6.png'),
];

const NUM_PAIRS = 6;

const GameScreen = () => {
  const [cards, setCards] = useState<number[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    let initialCards: number[] = [];
    for (let i = 0; i < NUM_PAIRS; i++) {
      initialCards.push(i);
      initialCards.push(i);
    }
    initialCards = shuffleArray(initialCards);
    setCards(initialCards);
    setSelectedCards([]);
    setAttempts(0);
  };

  const shuffleArray = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleCardPress = (index: number) => {
    if (selectedCards.length < 2 && !selectedCards.includes(index)) {
      setSelectedCards([...selectedCards, index]);
      if (selectedCards.length === 1) {
        const firstIndex = selectedCards[0];
        const secondIndex = index;
        const firstCard = cards[firstIndex];
        const secondCard = cards[secondIndex];

        if (firstCard === secondCard) {
          // Las cartas son iguales, dejarlas descubiertas
          setTimeout(() => {
            setCards(prevCards => prevCards.map((card, idx) => (idx === firstIndex || idx === secondIndex ? -1 : card)));
            setSelectedCards([]);
          }, 1000);
        } else {
          // Las cartas no son iguales, volver a esconderlas
          setTimeout(() => {
            setSelectedCards([]);
          }, 1000);
        }
        setAttempts(prevAttempts => prevAttempts + 1);
      }
    }
  };

  const renderCard = (index: number) => {
    const imageIndex = cards[index];
    const isCardSelected = selectedCards.includes(index);

    return (
      <TouchableOpacity key={index} onPress={() => handleCardPress(index)}>
        <View style={styles.cardContainer}>
          {isCardSelected || imageIndex === -1 ? (
            <Animated.Image source={CARD_IMAGES[imageIndex]} style={styles.cardImage} />
          ) : (
            <Image source={CARD_BACK_IMAGE} style={styles.cardImage} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.gameBoard}>
        {cards.map((_, index) => (
          <View key={index} style={styles.cardWrapper}>
            {renderCard(index)}
          </View>
        ))}
      </View>
      <Text>Intentos: {attempts}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameBoard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardWrapper: {
    width: '25%',
    aspectRatio: 0.75,
    padding: 5,
  },
  cardContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});


export default GameScreen;