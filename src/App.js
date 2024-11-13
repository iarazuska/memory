import Cards from './componets/Cards';
import React, {useState, useEffect} from 'react';
import './App.css';

import {pokemons} from './importarimg';

function App() {

  const[cards, setCards] = useState([1, 2, 3, 4]);

  useEffect(() => {
    setCards(pokemons);
  },[])

  return (
    <div className="App">
      <div className="cards-container">
      {
        cards.map((card, index) => (
          <Cards name={card.player} number={index} urlImagen={card.src}/>
      ))
    }
    </div>
    </div>
  );
}

export default App;
