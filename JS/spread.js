// USOS DEL OPERADOR SPREAD

//1- PARACLONAR (GENERAR COPIAS) ARREGLOS

const numeros=[1,2,3,4,5,6];
const copia=numeros;
console.log(numeros);

// 2- PAra concatenar arreglos

const arreglo1=[1,2,3];
const arreglo2=[4,5,6];
const mezcla=[... arreglo1,...arreglo2];
console.log(mezcla)

//3- para extender objetos

const persona=(nombre:"Beraly", apellido:"Parada")
const empleado={...personalbar,carnet:"AA1111"}
console.log(empleado)

// 4- Pasar elementos como argumentos a funciones

console.log(Math.max(...valores))


