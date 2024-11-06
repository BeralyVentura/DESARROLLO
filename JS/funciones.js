function calcularDistanciaOrigen(x,y){
    return Math.sqrt(x*2+y*2);
}

console.log(calcularDistanciaOrigen(5,5))

const calcularDistanciaEntrePuntos=(x1,y1,x2,y2)=>
    Math.sqrt((x2-x1)*2+(y2-y1)*2);

console.log(calcularDistanciaEntrePuntos(5,5,0,0))

function calcularEcuacionPuntoPendiente(x,y,m){
    let terminoIndependiente=m*x+y;
    return `y=${m}x+${terminoIndependiente}⁠;
}

console.log(calcularEcuacionPuntoPendiente(2,4,2))

function sumar(...numeros){
    let resultado=0;
    for(num of numeros){
        resultado+=num;
    }
}

console.log(sumar(7,3))
console.log(sumar(7,3,4))
console.log(sumar(7,3,))