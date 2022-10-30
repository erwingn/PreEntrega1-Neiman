const min = 1
const max = 13
let totalPartidas = 0
let partidasGanadas = 0
let winRate = 0
let seguirJugando = true


function cartaAleatoria(min, max) {
    return Math.trunc(Math.random() * (max - min) + min)
  }

  while(seguirJugando===true){
    carta1 = cartaAleatoria(min,max)

    do{
        prediccion = parseInt(prompt(`La carta actual es ${carta1}. Indicar si la proxima carta sera: 1-mayor, 2-igual o 3-menor`))
        if(prediccion>=1 && prediccion<=3 ){

        } else {
            alert('Error de datos. Por favor ingrese un valor entre 1 y 3')
        }
    } while(prediccion<1 || prediccion>3 || isNaN(prediccion)) 
    
    carta2 = cartaAleatoria(min,max)
    totalPartidas++

    if(prediccion===1){
        if(carta2>carta1){
            partidasGanadas++
            alert(`Correcto. La carta ${carta1} es mayor a la ${carta2}`)
        } else {
            alert(`Incorrecto. La carta ${carta1} NO es mayor a la ${carta2}`)
        }
    } else if (prediccion===2){
        if(carta2===carta1){
            partidasGanadas++
            alert(`Correcto. La carta ${carta1} es igual a la ${carta2}`)
        } else {
            alert(`Incorrecto. La carta ${carta1} NO es igual a la ${carta2}`)
        }
    } else {
        if(carta2<carta1){
            partidasGanadas++
            alert(`Correcto. La carta ${carta1} es menor a la ${carta2}`)
        } else {
            alert(`Incorrecto. La carta ${carta1} NO es menor a la ${carta2}`)
        }
    }


    do{
        desicion = parseInt(prompt(`Desea seguir jugando: 1-Si o 2-No`))
        if (desicion===1 ){
            seguirJugando = true
        } else if (desicion===2 ) {
            seguirJugando = false
            winRate = totalPartidas/partidasGanadas
            alert(`Felicitaciones la partida ha finalizado. Usted jugo ${totalPartidas} partidas y su winrate es de ${winRate}`)
        } else{ 
            alert('Error de ingreso de datos. Por favor ingrese un valor entre 1 y 2')
        }
    } while(desicion>2 || desicion<1 || isNaN(desicion))
    
}
