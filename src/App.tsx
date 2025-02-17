import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [estadoContado, setEstadoContador] = useState(0);
  let variavelContador = 0;

  return (
    <>
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
    </>
  )
}

export default App
