/* eslint-disable react/prop-types */
import styles from "./Quadrado.module.css";

/**
 * "String " + variavel + " resto da string"
 * 
 * `String ${variavel} resto da string`
 */

const mapaMarcadores = {
  [0]: "",
  [1]: "X",
  [2]: "O",
}

export default function Quadrado(props) {
  const { 
    valor,
    quadradoGrande,
    indice,
    funcaoAtualizar,
  } = props;

  return (
    <button
      id={indice}
      className={`${styles.quadrado} ${quadradoGrande ? styles.quadradoGrande : ""}`}
      onClick={() => {
        funcaoAtualizar(indice);
      }}
    >
      {valor ? mapaMarcadores[valor] : <></>}
    </button>
  )
}