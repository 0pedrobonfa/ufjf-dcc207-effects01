import { useEffect, useRef, useState } from "react";

export default function Tela()
{
    const [posicao, setPosicao] = useState({x:150,y:75});
    const refCanvas = useRef<HTMLCanvasElement|null>(null);
    const refAnimation = useRef<number | null>(null);
    const refMov = useRef({
        x:0,
        vx:0,
        ax:0,
        t0:0,
        dt:0
    })
    useEffect(()=>{
        refAnimation.current = requestAnimationFrame(desenhaQuadro);
        return () => {
            if(refAnimation.current){
                cancelAnimationFrame(refAnimation.current);
            };
        };
    }
    ,[]);

    function desenhaQuadro(t:number){
        const m = refMov.current;
        m.dt = Math.min(t-m.t0, 32)/1000;
        m.ax = 10;
        m.vx +=m.ax*m.dt;
        m.x += m.vx*m.dt;
        const canvas = refCanvas.current;
        if(!canvas) return;
        const ctx = canvas.getContext("2d");
        if(!ctx) return;
        ctx.fillStyle = "lightblue";
        ctx.fillRect(0,0,canvas.width, canvas.height);
        ctx.fillStyle = "lightgreen";
        ctx.beginPath()
        ctx.ellipse(m.x, posicao.y, 5,5,0,0,2*Math.PI,false);
        ctx.closePath();
        ctx.ellipse(m.x,posicao.y,5,5,0,0,2*Math.PI,false);
        ctx.stroke();
        ctx.fill();
        m.t0 = t;
        refAnimation.current = requestAnimationFrame(desenhaQuadro);
    }


    return (<canvas ref={refCanvas} onClick={()=>{
        setPosicao({...posicao, x:posicao.x + 5});
    }}>

        
    </canvas>
    )
}