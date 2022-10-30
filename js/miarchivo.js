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
    prediccion = parseInt(prompt(`La carta es ${carta1}. Indicar si la proxima carta sera: 1-mayor, 2-igual o 3-menor`))
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
    } while(desicion>2 || desicion<1)
    
    if(desicion===1){
        seguirJugando = true
    } else{
        seguirJugando = true
        winRate = totalPartidas/partidasGanadas
        alert(`Felicitaciones la partida ha finalizado. Usted jugo ${totalPartidas} partidas y su winrate es de ${winRate}`)
    }

}
