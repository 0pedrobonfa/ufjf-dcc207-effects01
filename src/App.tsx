import { useRef, useState } from 'react'
import './App.css'
import Prompt from './Prompt';
import Tela from './Tela';

function App() {
  const [estadoContado, setEstadoContador] = useState(0);
  let variavelContador = 0;
  const refContador = useRef(0);

  //ref faz atualizar quando o estado muda. A variável mostra a mudança na tela com o redesenho do estado
  //não dispara redesenho; ele atualiza o valor da variável
  return (
    <>

      <Prompt></Prompt>
      <Tela></Tela>

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
      </div>

      <div>        
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
