import React, {useState} from "react";
import ReactCardFlip from "react-card-flip";
import Atras from "../imagenes/Pokeball.jpg";

const Cards = (nombre, numero, urlImagen) => {
    const[estaGirada, setEstaGirada] = useState(false);
    return (
        <div calssName="card">
           <ReactCardFlip isFlipped={estaGirada} >
            <img calssName="ImagenCarta" src={Atras} alt="parte de atras"/>
            <img calssName="ImagenCarta" src={urlImagen} alt="parte de alante"/>
           </ReactCardFlip>
        </div>
    );
}
export default Cards;