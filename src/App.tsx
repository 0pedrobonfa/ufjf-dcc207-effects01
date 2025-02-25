import { useRef, useState } from 'react'
import './App.css'
import Prompt from './Prompt';
import Tela from './Tela';
//ref faz atualizar quando o estado muda. A variável mostra a mudança na tela com o redesenho do estado
//não dispara redesenho; ele atualiza o valor da variável

function App() {
  const [estadoContado, setEstadoContador] = useState(0);
  const [posicao, setPosicao] = useState({x:150,y:75});
  let variavelContador = 0;
  const refContador = useRef(0);


  return (
    <>

      <Prompt onPosicaoChange={setPosicao}></Prompt>
      <Tela posicao={posicao}></Tela>

      <div className="card">
        <button onClick={() => {
          setEstadoContador((estadoContado) => estadoContado + 1)
          console.log(estadoContado);
          }}>
          estadoContado {estadoContado}
        </button>
      </div>

      <div>        
        <button onClick={() => {
          variavelContador = variavelContador+1;
          console.log("variavelContador", variavelContador);
          }}>
        variavelContador {variavelContador}
        </button>    
        <button onClick={() => {
          refContador.current = refContador.current+1;
          console.log("refContador", refContador.current);
          }}>
        refContador {refContador.current}(!)
        </button>
      </div>
    </>
  )
}

export default App
