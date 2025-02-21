import { useEffect, useRef, useState } from "react";

const A = 2.0;
const V = 1.0;

type TelaProps= {
    posicao:{
        x:number;
        y:number;
    }
}
export default function Tela({posicao}:TelaProps){
    const refCanvas = useRef<HTMLCanvasElement|null>(null);
    const refAnimation = useRef<number | null>(null);
    const refMov = useRef({
        x:0,
        vx:0,
        ax:0,
        t0:0,
        dt:0,
        y:0,
        vy:0,
        ay:0
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
        m.ax = A*(posicao.x - m.x) -V*m.vx;
        m.vx +=m.ax*m.dt;
        m.x += m.vx*m.dt;
        m.ay = A*(posicao.y - m.y) -V*m.vy;
        m.vy +=m.ay*m.dt;
        m.y += m.vy*m.dt;
        const canvas = refCanvas.current;
        if(!canvas) return;
        const ctx = canvas.getContext("2d");
        if(!ctx) return;
        ctx.fillStyle = "lightblue";
        ctx.fillRect(0,0,canvas.width, canvas.height);
        ctx.fillStyle = "lightgreen";
        ctx.beginPath()
        ctx.ellipse(m.x, m.y, 5,5,0,0,2*Math.PI,false);
        ctx.closePath();
        ctx.ellipse(m.x,m.y,5,5,0,0,2*Math.PI,false);
        ctx.stroke();
        ctx.fill();
        m.t0 = t;
        refAnimation.current = requestAnimationFrame(desenhaQuadro);
    }


    return (<canvas ref={refCanvas}>
    </canvas>
    )
}