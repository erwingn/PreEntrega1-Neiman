
const botonJugar = document.getElementById('jugar')
const navJugar = document.getElementById('jugar2')
const divPantallaInicio = document.getElementById('pantallaInicio')
const divPantallaJuego = document.getElementById('pantallaJuego')
const selectBaraja = document.getElementById('selectBaraja')
const regla = document.getElementById('regla')
const arraydiv = [1,2,3,4,5,6,7]
const min = 1
let btnReiniciar
let link
let divAgrupa
let palosCarta
let numerosCarta
let mazo = [];
let mazosCartasSeleccionadas 
    
    
class naipes {
    constructor(palo, numero) {
        this.palo = palo
        this.numero = numero }
}

    
function cartaAleatoria(mi, ma) { return Math.trunc(Math.random() * (ma - mi) + mi) }


function generarCarta(){
    let numeroAleatorio = cartaAleatoria(min, mazo.length+1)
    let carta = new naipes()
    carta = mazo[numeroAleatorio-1]
    mazo.splice(numeroAleatorio-1,1)
    return carta
}

function inicializarMazos (){
    mazosCartasSeleccionadas = [[],[],[],[],[],[],[]];
    let carta = new naipes()
    
    arraydiv.map((n)=>{
        let m = n - 1
        carta = generarCarta()
        mazosCartasSeleccionadas[m].push(carta)
    })

    mostrarCarta()
}

function mostrarCarta(){
    for (let i = 0; i < arraydiv.length; i++) {
        let parrafoCarta = document.getElementById(`parrafoPosicion${i+1}`)
        let ultimaCarta = mazosCartasSeleccionadas[i].length-1
        parrafoCarta.innerHTML = `${mazosCartasSeleccionadas[i][ultimaCarta].numero} ${mazosCartasSeleccionadas[i][ultimaCarta].palo}`
        }
}

function empiezaPartida (bs, tipoCarta) {
    localStorage.clear()
    let totalJugado = 0
    let aciertos= 0
    let winRate = 0
    let posicion = 1

    console.log(tipoCarta)
    palosCarta = tipoCarta[bs].palosCarta
    numerosCarta = tipoCarta[bs].numerosCarta
    console.log(tipoCarta)
    palosCarta.forEach(p=>{
        numerosCarta.forEach(n=>{
            let naipe = new naipes(p,n)
            mazo.push(naipe)
        })
    })


    mostrarPantallaJuego()

    inicializarMazos()

    logicaJuego(totalJugado,aciertos,winRate,posicion,bs,tipoCarta)

}

function logicaJuego(totalJugado,aciertos,winRate,posicion,bs,tipoCarta){
    const botonIgual = document.getElementById('btnIgual')
    const botonMayor = document.getElementById('btnMayor')
    const botonMenor = document.getElementById('btnMenor')

    pEstadistico.innerHTML = `Total jugado: ${totalJugado} - Aciertos: ${aciertos} - Winrate: ${winRate.toFixed(2)}%`

    let spanFlecha = document.getElementById(`span${posicion}`)
    spanFlecha.style.color = 'black'

    botonIgual.onclick = () => { 
            let tipo = 1  
            juego(tipo)   
    }

    botonMayor.onclick = () => {
            let tipo = 2  
            juego(tipo)
    }

    botonMenor.onclick = () => {
            let tipo = 3 
            juego(tipo)     
    }


    function juego(t){
        console.log(mazo)
        let carta1 = new naipes()
        spanFlecha.style.color = 'rgb(61, 120, 131)'

        carta1 = generarCarta()
        
        mazosCartasSeleccionadas[posicion-1].push(carta1)
        let ultCarta = mazosCartasSeleccionadas[posicion-1].length - 1;
        let parrafoCarta = document.getElementById(`parrafoPosicion${posicion}`)
        parrafoCarta.innerHTML = `${mazosCartasSeleccionadas[posicion-1][ultCarta].numero} ${mazosCartasSeleccionadas[posicion-1][ultCarta].palo}`

        console.log (`Carta Aleatoria: ${carta1.numero} => Carta Anterior: ${mazosCartasSeleccionadas[posicion-1][ultCarta-1].numero}`)
        
        let resultado
        if (t===1) {
            if(carta1.numero===mazosCartasSeleccionadas[posicion-1][ultCarta-1].numero){
                resultado = true
            } else {
                resultado = false
            }
        } else if (t===2) {
            if(carta1.numero>mazosCartasSeleccionadas[posicion-1][ultCarta-1].numero){
                resultado = true
            } else {
                resultado = false
            }
        } else if (t===3) {
            if(carta1.numero<mazosCartasSeleccionadas[posicion-1][ultCarta-1].numero){
                resultado = true
            } else {
                resultado = false
            }
        }
        obtenerResultado(resultado)

        
        
        let datosPartida = {
            totalJugado: totalJugado,
            aciertos: aciertos,
            winRate: winRate,
            posicion: posicion,
            mazo: mazo,
            mazosCartasSeleccionadas: mazosCartasSeleccionadas,
            barajaSeleccionada: bs,
            tipoCarta: tipoCarta
        }
        localStorage.setItem('datosPartida',JSON.stringify(datosPartida))

        finalizarPartida(posicion,resultado)
        
    }

    function finalizarPartida(posicion,resultado) {
        console.log(`${posicion}, ${arraydiv.length}, ${resultado}`)
        if(mazo.length===0){
            Swal.fire({
                title: 'Derrota',
                text: 'No hay mas cartas en el mazo. Penalidad: Fondo blanco!!',
                icon: 'info',
                confirmButtonText: 'Comenzar Nueva Partida'
            })
            .then(ok => {
                if(ok) {
                    localStorage.clear()
                    location.reload()
                }
            })
           
        } else if (posicion-1===arraydiv.length && resultado===true) {
            Swal.fire({
                title: 'Victoria!!',
                text: 'Felicidades. Ha superado el desafio',
                icon: 'info',
                confirmButtonText: 'Comenzar Nueva Partida'
            })
            .then(ok => {
                if(ok) {
                    localStorage.clear()
                    location.reload()
                }
            })
            
        } else {

            spanFlecha = document.getElementById(`span${posicion}`)
            spanFlecha.style.color = 'black'
            pEstadistico.innerHTML = `Total jugado: ${totalJugado} - Aciertos: ${aciertos} - Winrate: ${winRate.toFixed(2)}%`
        }
    }

    function obtenerResultado (r) {
        totalJugado++
        if(r){
            posicion++
            aciertos++
            Swal.fire({
                title: 'Correcto',
                text: 'Se avanza una posicion',
                icon: 'success',
                confirmButtonText: 'Continuar'
            })
        } else{
            if(posicion===1){ } 
                else { posicion--}
            let texto
            posicion===2 || posicion=== 5 ? texto = 'TOMA DOS Tragos' : texto = 'TOMA UN Trago'
            Swal.fire({
                title: 'Incorrecto',
                text: `Se retrocede una posicion y ${texto}`,
                icon: 'error',
                confirmButtonText: 'Continuar'
            })
        }
        winRate = aciertos/totalJugado*100
        
    }
}

function mostrarPantallaJuego(){
    divPantallaInicio.remove()

    divAgrupa = document.createElement('div')
    const divEstadisticos = document.createElement('div')
    const divBotones = document.createElement('div')
    const divTablero = document.createElement('div')
    const divReiniciar = document.createElement('div')
    divTablero.setAttribute('class','divTablero')
    
    divAgrupa.append(divEstadisticos, divBotones, divTablero, divReiniciar)
    
    divPantallaJuego.append(divAgrupa)

    const botonReiniciar = document.createElement('button') 
    const botonPantallaInicio = document.createElement('button') 
    const botonIgual = document.createElement('button')
    const botonMayor = document.createElement('button')
    const botonMenor = document.createElement('button')
    
    botonReiniciar.setAttribute('id','btnReiniciar')
    botonReiniciar.innerText = 'Reiniciar partida'

    botonPantallaInicio.innerText = 'Ir a la Pantalla de Inicio'

    botonIgual.setAttribute('id','btnIgual')
    botonIgual.innerText = 'Igual'
 
    botonMayor.setAttribute('id','btnMayor')
    botonMayor.innerText = 'Mayor'
 
    botonMenor.setAttribute('id','btnMenor')
    botonMenor.innerText = 'Menor'
   
    divBotones.append(botonIgual,botonMayor,botonMenor)
    divReiniciar.append(botonReiniciar,botonPantallaInicio)
    
    const pEstadistico = document.createElement('p')
    pEstadistico.setAttribute('id','pEstadistico')
    divEstadisticos.append(pEstadistico)
    

    arraydiv.map((i) => {
        const divCard = document.createElement('div')
        divCard.setAttribute('class','divCard')
        divCard.setAttribute('id',`cartaPosicion${i}`) 
        const parrafoCarta = document.createElement('p')
        parrafoCarta.setAttribute('id',`parrafoPosicion${i}`)
        

        const divPuntero = document.createElement('div')
        divPuntero.setAttribute('class','divPuntero')
        divPuntero.setAttribute('id', `puntero${i}`)

        const spanFlecha = document.createElement('span')
        spanFlecha.setAttribute('id', `span${i}`)
        spanFlecha.setAttribute('class','spanFlecha')

        divPuntero.append(spanFlecha)
        divCard.append(divPuntero,parrafoCarta)
        divTablero.append(divCard)
        
    })

    botonReiniciar.onclick = () => {
        divAgrupa.remove()       
        
        let datosPartida = JSON.parse(localStorage.getItem('datosPartida'))
        if(datosPartida){ 
            empiezaPartida(datosPartida.barajaSeleccionada,datosPartida.tipoCarta)
        }else{
            location.reload()
         }
    }
    
    botonPantallaInicio.onclick = () => {
        localStorage.clear()
        location.reload()
    }

}


let datosPartida = JSON.parse(localStorage.getItem('datosPartida'))
if(datosPartida){ 
    mostrarPantallaJuego()
    mazo = datosPartida.mazo
    mazosCartasSeleccionadas = datosPartida.mazosCartasSeleccionadas
    mostrarCarta()
    logicaJuego(datosPartida.totalJugado,datosPartida.aciertos,datosPartida.winRate,datosPartida.posicion,datosPartida.barajaSeleccionada,datosPartida.tipoCarta)
} else {
    const consultarCartas = async() => {
        const response = await fetch('./json/cartas.json')
        const tipoCartas = await response.json()
        return tipoCartas
    }
    
    consultarCartas().then(tipoCarta => {
        tipoCarta.forEach((tp) => {
            const opcion = document.createElement('option')
            opcion.setAttribute('value',`${tp.id}`)
            opcion.innerText= `${tp.descripcion}`
            selectBaraja.append(opcion)
        })
        
        botonJugar.onclick = () => empiezaPartida(selectBaraja.value,tipoCarta)
        navJugar.onclick = () => empiezaPartida(selectBaraja.value,tipoCarta)
       
    })
   
   
}


regla.onclick = () => {
    const textoRegla = 'Objetivo del juego: Superar el puente de 7 niveles de cartas acertando si la próxima carta es mayor, igual o menor a la carta del nivel en el que te encuentres. \n Penalidad: \n1-	Por cada error, se retrocede un nivel y se debe tomar un trago. \n 2- Si el jugador no alcanza a superar los 7 niveles antes de que el mazo se quede sin cartas, el mismo deberá realizar un fondo blanco a un trago. \n Por cada acierto se pasa al próximo nivel.'
    Swal.fire({
        title: 'Regla',
        text: `${textoRegla}`,
        icon: 'info',
        confirmButtonText: 'Cerrar'
    })
}



