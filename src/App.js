import React, { useState, useEffect } from 'react';
import Card from './componets/Cards';
import './App.css';

import { imagenes } from './importarimg.js';

function App() {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState({});
  const [secondCard, setSecondCard] = useState({});
  const [unflippedCards, setUnflippedCards] = useState([]);
  const [disabledCards, setDisabledCards] = useState([]);
  const [attempts, setAttempts] = useState(0);

  const shuffleArray = (array) => {
    if (!array || !Array.isArray(array)) {
      console.error("shuffleArray: El argumento no es un arreglo válido.");
      return [];
    }
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  const resetGame = () => {
    setUnflippedCards([...Array(cards.length).keys()]);
    setTimeout(() => {
      const shuffledCards = shuffleArray(imagenes);
      setCards(shuffledCards); 
      setAttempts(0); 
      setFirstCard({});
      setSecondCard({});
      setUnflippedCards([...Array(shuffledCards.length).keys()]);
      setDisabledCards([]);
      setTimeout(() => {
        setUnflippedCards([]);
      }, 1000);
    }, 500); 
  };

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    shuffleArray(imagenes);
    setCards(imagenes);
  }, []);

  useEffect(() => {
    if (secondCard.name) {
      checkForMatch();
    }
  }, [secondCard]);

  const flipCard = (name, number) => {
    if (firstCard.name && firstCard.number === number) return;
    if (!firstCard.name) {
      setFirstCard({ name, number });
    } else if (!secondCard.name) {
      setSecondCard({ name, number });
      setAttempts((prev) => prev + 1);
    }
  };

  const checkForMatch = () => {
    if (firstCard.name && secondCard.name) {
      const match = firstCard.name === secondCard.name;
      match ? disableCards() : unflipCards();
    }
  }

  const disableCards = () => {
    setDisabledCards([...disabledCards, firstCard.number, secondCard.number]);
    resetCards();
  };

  const unflipCards = () => {
    setUnflippedCards([firstCard.number, secondCard.number]);
    setTimeout(() => {
      setUnflippedCards([]);
    }, 1000);
    resetCards();
  };

  const resetCards = () => {
    setFirstCard({});
    setSecondCard({});
  }

  return (
    <div className="app">
      <div className="header">
        <h1>Juego de Memory</h1>
        <p>Intentos: {attempts}</p>
      </div>
      <div className="cards-container">
        {cards.map((card, index) => (
          <Card
            key={index}
            name={card.player}
            number={index}
            frontFace={card.src}
            flipCard={flipCard}
            unflippedCards={unflippedCards}
            disabledCards={disabledCards}
          />
        ))}
      </div>
    </div>
  );
}

export default App;