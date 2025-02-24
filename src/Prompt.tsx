import { useRef, useState } from "react";

type PromptProps={
    onPosicaoChange: (posicao:{x:number;y:number})=>void;
    
}

export default function Prompt({onPosicaoChange}:PromptProps){
    const [entrada, setEntrada] = useState("");
    const [saida, setSaida] = useState("");
    const refInput = useRef<HTMLInputElement>(null);
    const [lista, setLista] = useState<string[]>([]);


    function onEntradaChange(e: React.ChangeEvent<HTMLInputElement>){
        setEntrada(e.target.value);
        //e.target.select();
    }

    function executaLista(){
        console.log(lista);
        for(let i=0;i<lista.length;i++)
        {
            //executa um comando por vez
            let entradaAtual = structuredClone(entrada);
            entradaAtual = lista[i];

            setSaida(entradaAtual);

            const tokens = entradaAtual.split(" ");
            if(tokens[0] === "mover"){
                const x  = Number(tokens[1]);
                const y  = Number(tokens[2]);
                console.log(`Movendo para ${x} ${y}`);
                onPosicaoChange({x,y});
    
            }
            if(!refInput.current) return;
            refInput.current.select();
        }
        setTimeout(()=>5000);
    }

    function onExecutarClick()
    {
        setLista(prevLista => [...prevLista, entrada]);

    }
    return (<div>
        <input  ref={refInput} value={entrada} onChange={onEntradaChange} />
        <button onClick={onExecutarClick}>Executar</button>
        <p>{saida}</p>

        <ol className="listaDeComandos">{lista}</ol>

        <button onClick={executaLista}>play</button>
    </div>
    )
}