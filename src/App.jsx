import React from 'react';
import './App.css';
import styles from "./App.module.css";
import Tabuleiro from './componentes/Tabuleiro';

const sequenciasVitoria = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [estadoJogo, atualizaEstadoJogo] = React.useState({});

  const aplicaValor = (indice) => {
    const novoEstado = JSON.parse(JSON.stringify(estadoJogo));

    if (novoEstado.valorTabuleiro[indice] == 0) {
      novoEstado.valorTabuleiro[indice] = (novoEstado.contadorVez % 2) + 1;

      novoEstado.contadorVez += 1;

      atualizaEstadoJogo(novoEstado);
    }
  }

  const checaVitoria = (valorTabuleiro, numeroJogador) => {
    const valorJogador = numeroJogador % 2 + 1;
    let resultadoSequencias = [];

    const arrayIndiceJogadas = valorTabuleiro?.map((valor, indiceQuadrado) => {
      if (valor === valorJogador) {
        return indiceQuadrado;
      }

      return null;
    })
      .filter((valor) => valor !== null);

    if (arrayIndiceJogadas?.length > 2) {
      resultadoSequencias = sequenciasVitoria.map((sequencia) => {
        let sequenciaVencedora = true;

        sequencia.forEach((indiceQuadrado) => {
          if (!arrayIndiceJogadas.includes(indiceQuadrado)) {
            sequenciaVencedora = false;
          }
        });

        return sequenciaVencedora;
      });
    }

    return resultadoSequencias.some((sequencia) => sequencia == true);
  }

  const novoJogo = () => {
    const estruturaInicialJogo = {
      jogadores: {
        jogador1: {
          nome: "Jog 1",
        },
        jogador2: {
          nome: "Jog 2",
        },
        jogador3: {
          nome: "Empate",
        }
      },
      valorTabuleiro: [],
      numeroPosicoes: 9,
      contadorVez: 1,
      idGanhador: "" //Pode ser jogador1 ou jogador2
    }

    for (let i = 0; i < estruturaInicialJogo.numeroPosicoes; i++) {
      estruturaInicialJogo.valorTabuleiro.push(0);
    }

    atualizaEstadoJogo(estruturaInicialJogo);
  }

  // useEffect é chamado sempre que algum elemento dentro de ArrayReferencia muda
  React.useEffect(() => {
    const novoEstado = JSON.parse(JSON.stringify(estadoJogo));
    //Jogador1 marca valor 2 (O)

    if (novoEstado.valorTabuleiro?.length && novoEstado.idGanhador == "") {
      const jogador1Venceu = checaVitoria(novoEstado.valorTabuleiro, 1);
      const jogador2Venceu = checaVitoria(novoEstado.valorTabuleiro, 2);
      const quadradosRestantes = novoEstado.valorTabuleiro.filter((valor) => valor == 0);

      if (jogador1Venceu) {
        novoEstado.idGanhador = 1;
      } else if (jogador2Venceu) {
        novoEstado.idGanhador = 2;
      } else if (!quadradosRestantes.length) {
        novoEstado.idGanhador = 3;
      }

      if (estadoJogo && novoEstado.idGanhador != estadoJogo.idGanhador) {
        atualizaEstadoJogo(novoEstado);
      }
    }

  }, [estadoJogo])
  // Esse array no final é o ArrayReferencia

  // useEffect é chamado sempre que algum elemento dentro de ArrayReferencia muda 
  React.useEffect(() => {
    novoJogo();
  }, []);
  // Esse array no final é o ArrayReferencia

  return (
    <>
      <div className={styles.painelJogo}>
        <h3>Jogo da velha</h3>
      </div>

      <Tabuleiro
        estadoJogo={estadoJogo}
        aplicaValor={aplicaValor}
      />

      {estadoJogo?.idGanhador > 0 ? (
        <>
          <p>
            Vencedor: &nbsp;
            <b>
              {estadoJogo?.jogadores[`jogador${estadoJogo?.idGanhador}`].nome}
            </b>
          </p>
          <button onClick={novoJogo}>Novo jogo</button>
        </>
      ) : ""}
    </>
  )
}

export default App
