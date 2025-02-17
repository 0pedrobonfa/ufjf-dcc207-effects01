import { useRef } from "react";

export default function Tela()
{
    const refCanvas = useRef<HTMLCanvasElement|null>(null);



    return (<canvas ref={refCanvas} onClick={()=>{
        const canvas = refCanvas.current;
        if(!canvas) return;
        const ctx = canvas.getContext("2d");
        if(!ctx) return;
        ctx.fillStyle = "lightblue";
        ctx.fillRect(0,0,canvas.width, canvas.height);
        ctx.fillStyle = "lightgreen";
        ctx.ellipse(150,75,5,5,0,0,2*Math.PI,false);
        ctx.stroke();
        ctx.fill();
        
    }}>

        
    </canvas>
    )
}