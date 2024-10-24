console.log("-------------------- Number --------------------");
console.log(Number(""));
console.log(Number(true));
console.log(Number(false))
console.log(Number("false"))
console.log(Number([]))//0
console.log(Number(null))//0
console.log(Number(undefined))//NaN

console.log(1+null)
console.log(1+undefined)

console.log("--------BOOLEAN--------")
console.log(Boolean(""))//False
console.log(Boolean([]))//false
console.log(Boolean(""))//false
console.log(Boolean(0))//false
console.log(Boolean(100))//true
console.log(Boolean("Hola"))//true
console.log(Boolean(null))//false
console.log(Boolean(undefined))//NaN

console.log("---INCOGNITAS---")
console.log(NaN==NaN)
console.log(false==0)//true
console.log(" "==" ")//false
console.log(true==100)//?
console.log('100'==100)//true
console.log(Number("hola")==Number(undefined))//true
console.log(null==undefined)//false
console.log(null==0)//true
console.log([]==null)