'use client'

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function Home() {
  const [respondeuSim, setRespondeuSim] = useState(false);
  const [fugindo, setFugindo] = useState(false);
  const [tempoJuntos, setTempoJuntos] = useState({
    meses: 0,
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  const buttonRef = useRef(null);

  // 🎵 Música de fundo
  useEffect(() => {
    const audio = new Audio('/musica.mp3');
    audio.volume = 0.1;
    audio.loop = true;

    if (respondeuSim) {
      audio.play().catch(() => {});
    }

    return () => {
      audio.pause();
    };
  }, [respondeuSim]);

  // ⏳ Contador de tempo juntos
  useEffect(() => {
    const dataInicio = new Date('2024-10-25T00:00:00');

    const atualizarTempo = () => {
      const agora = new Date();
      const diff = agora - dataInicio;

      const meses = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
      const dias = Math.floor(diff / (1000 * 60 * 60 * 24)) % 30;
      const horas = agora.getHours();
      const minutos = agora.getMinutes();
      const segundos = agora.getSeconds();

      setTempoJuntos({ meses, dias, horas, minutos, segundos });
    };

    const intervalo = setInterval(atualizarTempo, 1000);
    atualizarTempo();

    return () => clearInterval(intervalo);
  }, []);

  // 🎉 Confete
  const explodirConfete = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <main
      style={{ minHeight: '100vh' }}
      className="bg-pink-100 flex flex-col items-center justify-center p-4 text-center"
    >
      {!respondeuSim ? (
        <>
          <h1 className="text-4xl font-bold text-pink-600 mb-6">
            Quer casar comigo? 💍
          </h1>
          <div className="flex gap-6">
            <button
              onClick={() => {
                setRespondeuSim(true);
                explodirConfete();
              }}
              className="bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-xl shadow"
            >
              Sim ❤️
            </button>

            <motion.button
              ref={buttonRef}
              onMouseEnter={() => setFugindo(true)}
              animate={
                fugindo
                  ? {
                      x: Math.random() * 200 - 100,
                      y: Math.random() * 200 - 100,
                    }
                  : {}
              }
              transition={{ type: 'spring', stiffness: 200 }}
              className="bg-red-400 text-white font-semibold px-6 py-3 rounded-xl shadow relative"
            >
              Não 😢
            </motion.button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-pink-600 mb-4">
            Sim!!! ❤️
          </h1>
          <img
  src="/nossa-foto-princesa.jpg"
  alt="Nós dois hehehe"
  className="rounded-full w-60 h-60 object-cover shadow-lg mx-auto mb-4"
/>
          <p className="text-lg text-pink-700 max-w-md mb-4">
            Só vamos nos casar futuramente, mas já estamos conectados pro resto da vida 🥭👅
          </p>
          <div className="bg-white p-4 rounded-xl shadow text-pink-700 mb-4 max-w-md">
            <p className="italic">
              Não quero apenas ser alguém que te ama, quero ser aquele que te faz sorrir mesmo nos dias difíceis, que te ajuda a carregar o peso do mundo quando ele parecer demais. 
              Quero ser aquele que te lembra, sempre, que o que vivemos vale cada tentativa, cada obstáculo superado, cada batalha vencida. <br /><br />
              Se encontrar um tesouro exige paciência e dedicação, então que assim seja. Porque, para mim, você é o maior tesouro que a vida poderia me dar. Te amo.
            </p>
          </div>
          <p className="text-pink-800 font-semibold">
            Estamos juntos há: {tempoJuntos.meses} meses, {tempoJuntos.dias} dias,{" "}
            {tempoJuntos.horas} horas, {tempoJuntos.minutos} minutos e{" "}
            {tempoJuntos.segundos} segundos ⏳💞
          </p>
        </>
      )}
    </main>
  );
}
