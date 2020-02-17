const filas = 8;
const columnas = 8;
const pintar = 'Pintar';
const borrar = 'Borrar';


//Lo usa para referirse a propiedades del formulario
//Formulario
const tamañoMalla = document.forms.juego;
//Color picker
const colorUsuario = document.getElementById('selectorColor');
//Actualiza el modo donde se encuentra el aplicativo
//Span
const vistaModo = document.getElementById('vistaModo');

var gano = false;

//Tabla
const malla = document.getElementById('pixelCanvas');

//Div contenedor de la tabla pixelCanvas
const mallaCanvas = document.getElementById('mallaCanvas');

//Variable de JS para cambiar el modo entre pintura y borrador
let modoTrabajo = pintar;
let coincidencias = 0;

var matrizInicial = new Array();
var matrizDibujada = new Array();

tamañoMalla.crearMalla.onclick = function crearMalla(event){
    document.getElementById('limpiarMalla').disabled = false;
    
    document.getElementById('crearMalla').disabled = true;
    
    //Iniciar arreglo
    llenarMatrizInicial();

    
    
    //Prevenir que la página recargue cuando el usuario pulse sobre el botón submit o enviar
    event.preventDefault();

    let mouseIsDown = false;

    //Verificar que la tabla pixelCanvas no tenga celdas, si tiene las borra
    while (malla.hasChildNodes()) {
        malla.removeChild(malla.lastChild);
      }

      let filasTabla = '';
      let filasAux = 1;

      while (filasAux <= filas) {
        filasTabla += '<tr>';
        for (let columnasAux =1; columnasAux <= columnas; columnasAux++) {
            filasTabla += '<td style=\"width:40px;\" height=\"40px\"></td>';
        }
        filasTabla += '</tr>';
        filasAux += 1;
    } // fin ciclo while

     
    malla.insertAdjacentHTML('afterbegin', filasTabla);// añadir la malla al DOM

    malla.addEventListener("click", function(event) {
        //Prevenir que la página recargue cuando el usuario pulse sobre el botón submit o enviar
        event.preventDefault();
        //Ejecutar la función
        pintarBorrarCeldas(event.target);
    });

    // malla.on('mousedown', function(event)
    malla.addEventListener('mousedown', function(event) {
        event.preventDefault();
        mouseIsDown = event.which === 1 ? true : false;
    });
    // document.on('mouseup', function() {
    document.addEventListener('mouseup', function(event) {
        event.preventDefault();
        mouseIsDown = false;
    });

    // malla.on('mouseover', 'td', function() {
    malla.addEventListener('mouseover', function(event) {
        // if (mouseIsDown) {paintEraseTiles($(this));}
        event.preventDefault();
        if (mouseIsDown) {pintarBorrarCeldas(event.target);}
    }); // end continuous paint and erase
    if(gano == true){
        matrizDibujada = [];
        coincidencias = 0;
        init();
        gano = false;
    }
    //Llenar matriz de dibujo
    for(let i = 0;i<8;i++){
        for(let j= 0;j<8;j++){
            var celdaNueva = new celda(i,j,false);
            matrizDibujada.push(celdaNueva);
        }
    }

}

function pintarBorrarCeldas(targetCell) {
    if (targetCell.nodeName === 'TD') {
        const numeroFilas = document.getElementById("pixelCanvas").querySelectorAll('tr');
        const arregloFilas = Array.from(numeroFilas);
        const indiceFila = arregloFilas.findIndex(row => row.contains(targetCell));
        const indiceColumna = targetCell.cellIndex;
        
        var celdaAux = new celda(indiceFila,indiceColumna,false);
        var posicionCeldaBuscada = buscarObjetoArrayIndice(celdaAux,false);
        var celdaBuscada = matrizDibujada[posicionCeldaBuscada];

        targetCell.style.backgroundColor = modoTrabajo === pintar ? colorUsuario.value : 'transparent';
        var color;
        if(modoTrabajo === pintar){
            color = true;
        }
        else{
            color = false;
        }

        celdaBuscada.color = color;

        matrizDibujada[posicionCeldaBuscada] = celdaBuscada;

        if(targetCell.style.backgroundColor == 'transparent'){
            eliminarObjetoMatrizDibujada(celdaAux);
        }
        /*else{
            if(descartarCelda(celdaAux)!=true){
                matrizDibujada.push(celdaAux);
            }
        }*/
                
    } else {
        console.log("Nice try: " + targetCell.nodeName + " talk to the hand!");
    }
    
}

function mostrarMensaje(){
    gano = false;
    if(compararMatrices()){
        gano = true;
        document.getElementById('limpiarMalla').disabled = true;
        //document.getElementById('crearMalla').disabled = false;
    }
    if(gano == true){
        alert("Ganaste");
    }
}

document.getElementById("verificarMalla").addEventListener("click",mostrarMensaje);

//eliminarObjetoMatrizDibujada aún en uso
function eliminarObjetoMatrizDibujada(pCelda){
    //matrizDibujada.splice(buscarObjetoArrayIndice(pCelda),1);
    var posicionCelda = buscarObjetoArrayIndice(pCelda,false);
    var celdaNueva = matrizDibujada[posicionCelda];
    celdaNueva.color = false;
    matrizDibujada[posicionCelda] = celdaNueva;
    /*if(eliminarCoincidencias(pCelda)){
        coincidencias--;
    }*/
}

function compararMatrices(){
    coincidencias = 0;
    for(let i=0;i<64;i++){
        var celdaDibujada = matrizDibujada[i];
        var celdaInicial = matrizInicial[i];
        if(celdaDibujada.columna == celdaInicial.columna && celdaDibujada.fila == celdaInicial.fila && celdaDibujada.color == celdaInicial.color){
            coincidencias++;
        }
    }

    if(coincidencias == 64){
        return true;
    }

}
//buscarObjetoArray ya no esta en uso
function buscarObjetoArray(pCelda){
    
    for(let i=0;i<matrizInicial.length;i++){
        var aux = matrizInicial[i];
        if(aux.fila == pCelda.fila && aux.columna == pCelda.columna && aux.color == pCelda.color){
            coincidencias++;
            break;
        }
    }
}
//eliminarCoincidencias ya no esta en uso
function eliminarCoincidencias(pCelda){
    for(let i=0;i<matrizInicial.length;i++){
        var aux = matrizInicial[i];
        if(aux.fila == pCelda.fila && aux.columna == pCelda.columna && aux.color == pCelda.color){
            return true;
        }
    }
}
//descartarCelda ya no esta en uso
function descartarCelda(pCelda){
    for(let i=0;i<matrizDibujada.length;i++){
        var aux = matrizDibujada[i];
        if(aux.fila == pCelda.fila && aux.columna == pCelda.columna && aux.color == pCelda.color){
            return true;
        }
    }
}
//buscarObjetoArrayIndice aún en uso
function buscarObjetoArrayIndice(pCelda,buscarExacto){
    
    for(let i=0;i<matrizDibujada.length;i++){
        var aux = matrizDibujada[i];
        if(buscarExacto){
            if(aux.fila == pCelda.fila && aux.columna == pCelda.columna && aux.color == pCelda.color){
                return i;
            }
        }
        else{
            if(aux.fila == pCelda.fila && aux.columna == pCelda.columna){
                return i;
            }
        }
        
    }
}

colorUsuario.oninput = function (){
    modoTrabajo = pintar;
    vistaModo.innerHTML = ' ' + modoTrabajo;
}; //Se va a utilizar

//Limpiar canvas
//clearGrid es un boton
document.getElementById('limpiarMalla').addEventListener('click', function() {
    mallaCanvas.classList.toggle('rotateCanvas'); // rotate the Design Canvas div
    let celdas = malla.getElementsByTagName('td');
    for(let i = 0; i < celdas.length; i++) {
        celdas[i].style.backgroundColor = 'transparent';
    }
    matrizDibujada = [];
    for(let k = 0;k<8;k++){
        for(let j= 0;j<8;j++){
            var celdaNueva = new celda(k,j,false);
            matrizDibujada.push(celdaNueva);
        }
    }
    coincidencias = 0;
    
});

document.getElementById('modo').addEventListener('click', function(event) {
    modoTrabajo = event.target.className.indexOf('paint') >=0 ? pintar : borrar;
    vistaModo.innerHTML = ' ' + modoTrabajo;
});

class celda {
    constructor(fila, columna,color) {
      this.fila = fila;
      this.columna = columna;
      this.color = color;
    }
  }


function llenarMatrizInicial(){
    matrizInicial = [];
    for (let i = 0;i<8;i++){
        for(let j = 0;j<8;j++){
            if(i == 0){
                if(j >= 3 && j <= 4){
                    cel = new celda(i,j,true);
                    matrizInicial.push(cel);
                }
                else{
                    cel = new celda(i,j,false);
                    matrizInicial.push(cel);
                }
            }
            if(i == 1){
                if(j>=2 && j<=5){
                    cel = new celda(i,j,true);
                    matrizInicial.push(cel);
                }
                else{
                    cel = new celda(i,j,false);
                    matrizInicial.push(cel);
                }
            }
            if(i==2){
                if(j>=1 && j<=6){
                    cel = new celda(i,j,true);
                    matrizInicial.push(cel);
                }
                else{
                    cel = new celda(i,j,false);
                    matrizInicial.push(cel);
                }
            }
            if(i==3){
                if(j==2){
                    cel = new celda(i,j,false);
                    matrizInicial.push(cel);
                }
                if(j==5){
                    cel = new celda(i,j,false);
                    matrizInicial.push(cel);
                }
                if(j>=0 && j<=1){
                    cel = new celda(i,j,true);
                    matrizInicial.push(cel);
                }
                if(j>=3 && j<=4){
                    cel = new celda(i,j,true);
                    matrizInicial.push(cel);
                }
                if(j>=6 && j<=7){
                    cel = new celda(i,j,true);
                    matrizInicial.push(cel);
                }
            }
            if(i==4){
                cel = new celda(i,j,true);
                matrizInicial.push(cel);
            }
            if(i==5){
                if(j>=0 && j<=1){
                    cel = new celda(i,j,false);
                    matrizInicial.push(cel);
                }
                if(j>=3 && j<=4){
                    cel = new celda(i,j,false);
                    matrizInicial.push(cel);
                }
                if(j>=6 && j<=7){
                    cel = new celda(i,j,false);
                    matrizInicial.push(cel);
                }
                if(j==2){
                    cel = new celda(i,j,true);
                    matrizInicial.push(cel);
                }
                if(j==5){
                    cel = new celda(i,j,true);
                    matrizInicial.push(cel);
                }
            }
            if(i==6){
                if(j==0){
                    cel = new celda(i,j,false);
                    matrizInicial.push(cel);
                }
                if(j==1){
                    cel = new celda(i,j,true);
                    matrizInicial.push(cel);
                }
                if(j==2){
                    cel = new celda(i,j,false);
                    matrizInicial.push(cel);
                }
                if(j>=3 && j<=4){
                    cel = new celda(i,j,true);
                    matrizInicial.push(cel);
                }
                if(j==5){
                    cel = new celda(i,j,false);
                    matrizInicial.push(cel);
                }
                if(j==6){
                    cel = new celda(i,j,true);
                    matrizInicial.push(cel);
                }
                if(j==7){
                    cel = new celda(i,j,false);
                    matrizInicial.push(cel);
                }
            }
            if(i==7){
                if(j==0){
                    cel = new celda(i,j,true);
                    matrizInicial.push(cel);
                }
                if(j==1){
                    cel = new celda(i,j,false);
                    matrizInicial.push(cel);
                }
                if(j==2){
                    cel = new celda(i,j,true);
                    matrizInicial.push(cel);
                }
                if(j>=3 && j<=4){
                    cel = new celda(i,j,false);
                    matrizInicial.push(cel);
                }
                if(j==5){
                    cel = new celda(i,j,true);
                    matrizInicial.push(cel);
                }
                if(j==6){
                    cel = new celda(i,j,false);
                    matrizInicial.push(cel);
                }
                if(j==7){
                    cel = new celda(i,j,true);
                    matrizInicial.push(cel);
                }
            }
        }//Fin ciclo columnas
    }//Fin ciclo filas
}