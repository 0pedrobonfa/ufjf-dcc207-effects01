import { useEffect, useRef, useState } from "react";

type PromptProps={
    onPosicaoChange: (posicao:{x:number;y:number})=>void;
    
}

export default function Prompt({onPosicaoChange}:PromptProps){
    const [entrada, setEntrada] = useState("");
    const [saida, setSaida] = useState("");
    const refInput = useRef<HTMLInputElement>(null);
    const [lista, setLista] = useState<string[]>(["mover 10 10","mover 100 100"]);

    const refRelogio = useRef(0);
    const [execucao, setExecucao] = useState(false);
    const [prox, setProx] = useState(0);


    function onEntradaChange(e: React.ChangeEvent<HTMLInputElement>){
        setEntrada(e.target.value);
        //e.target.select();
    }

    function play(){
        setExecucao(true);
        setProx(0);
    }

    useEffect(()=>{
        if(!refRelogio.current && execucao){
            console.log("Inicia relógio");
            refRelogio.current = setInterval(()=>{
                console.log(lista[prox]);
                setProx((p)=>p+1);
            },3000);
        }
        return ()=>{
            if(!execucao){
                console.log("Cancela relógio");
                clearInterval(refRelogio.current);
                refRelogio.current = 0;
            }
        }

    },[execucao, prox])

    function stop(){
        setExecucao(false);
    }


    function executaLista(){
        console.log(lista[prox]);
    
        // for(let i=0;i<lista.length;i++)
        // {
        //     //executa um comando por vez
        //     let entradaAtual = structuredClone(entrada);
        //     entradaAtual = lista[i];

        //     setSaida(entradaAtual);

        //     const tokens = entradaAtual.split(" ");
        //     if(tokens[0] === "mover"){
        //         const x  = Number(tokens[1]);
        //         const y  = Number(tokens[2]);
        //         console.log(`Movendo para ${x} ${y}`);
        //         onPosicaoChange({x,y});
    
        //     }
        //     if(!refInput.current) return;
        //     refInput.current.select();
        //     setTimeout(()=>5000);
        // };
        
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

        <button onClick={play}>play</button>
        <button onClick={stop}>stop</button>
    </div>
    )
}