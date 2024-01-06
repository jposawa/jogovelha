/* eslint-disable react/prop-types */
import Quadrado from "./Quadrado";
import styles from "./Tabuleiro.module.css";



export default function Tabuleiro(props) {
  const { estadoJogo, aplicaValor } = props;

  return (
    <div className={styles.tabuleiro}>
      {estadoJogo?.valorTabuleiro?.map((valor, indice) => {
        return (
          <Quadrado
            key={indice}
            valor={valor}
            indice={indice}
            funcaoAtualizar={aplicaValor}
          />
        )
      })}
    </div>
  )
}