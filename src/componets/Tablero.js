import React, { useState, usesEffect } from 'react';


const Tablero = () => {
    const [primeraCarta, setPrimeraCarta] = useState([]);
    const [segundaCarta, setSegundaCarta] = useState([]);

    const [disponibles, setDisponibles] = useState([]);
    const [noDisponibles, setNoDisponibles] = useState([]);

    const barajar = (Array) => {
        for (let i = Array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = Array[i];
            Array[i] = Array[j];
            Array[j] = temp;
        }
    }

    usesEffect(() => {
        barajar(imagenes);
        setCarta(imagenes);
    }, [])

    usesEffect(() => {
        pareja();
    }, [segundaCarta]);

    const vuelta = (nombre, numero) => {
        if (primeraCarta.nombre === nombre && primeraCarta.numero === numero) {
            return 0;
        }
        if (!primeraCarta.nombre) {
            setPrimeraCarta({ nombre, numero });
        }
        else if (!segundaCarta.nombre) {
            setSegundaCarta({ nombre, numero })
        }
        return 1;
    }

    const verificarPareja = () => {
        if (primeraCarta.nombre && segundaCarta.nombre) {
            const esPareja = primeraCarta.nombre === segundaCarta.nombre;
            esPareja ? bloquearPareja() : desvoltearCartas();
        }
    };

    const bloquearPareja = () => {
        setNoDisponibles([...noDisponibles, primeraCarta.numero, segundaCarta.numero]);
        reinicio();
    };

    const desvoltearCartas = () => {
        setDisponibles([...disponibles, primeraCarta.numero, segundaCarta.numero]);
        reinicio();
    };

    const reinicio = () => {
        setPrimeraCarta({});
        setSegundaCarta({});
    };

    return (
        <div className='tablero'>
            {cartas.map((carta, index) => (
                <Carta
                    key={index}
                    nombre={carta.nombre}
                    numero={index}
                    frontFace={carta.src}
                    vuelta={vuelta}
                    noDisponibles={noDisponibles}
                    disponibles={disponibles}
                />
            ))}
        </div>
    );
};

export default Tablero;



