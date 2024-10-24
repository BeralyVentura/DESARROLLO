function calcularDistanciaOrigen(x,y){
    return Math.sqrt(x**2+y**2);
}

console.log(calcularDistanciaOrigen(5,5))

const calcularDistanciaEntrePuntos=(x1,y1,x2,y2)=>
    Math.sqrt((x2-x1)**2+(y2-y1)**2);
    

console.log(calcularDistanciaEntrePuntos(5,5,0,0))

function calcularEcuacionPuntoPendiente(x,y,m){
    return `y=${m}()`;
}
console.log(calcularEcuacionPuntoPendiente(5,5,1))