window.onload = init;

function init(){
    document.getElementById("crearMalla").addEventListener("click",cronometrar);
    document.getElementById("verificarMalla").addEventListener("click",parar);
    horas = 0;
    minutos = 0;
    segundos = 0;
    document.getElementById("hms").innerHTML="00:00:00";
}         
function cronometrar(){
    escribir();
    id = setInterval(escribir,1000);
    document.getElementById("crearMalla").removeEventListener("click",cronometrar);
}
function escribir(){
    var hAux, mAux, sAux;
    segundos++;
    if (segundos>59){minutos++;segundos=0;}
    if (minutos>59){horas++;minutos=0;}
    if (horas>24){horas=0;}

    if (segundos<10){sAux="0"+segundos;}else{sAux=segundos;}
    if (minutos<10){mAux="0"+minutos;}else{mAux=minutos;}
    if (horas<10){hAux="0"+horas;}else{hAux=horas;}

    document.getElementById("hms").innerHTML = hAux + ":" + mAux + ":" + sAux; 
}

//TODO: se van a utilizar cuando necesite detener el cronometro
function parar(){
    if(gano==true){
        clearInterval(id);
        //document.querySelector(".start").addEventListener("click",cronometrar);
    }
    
}
/*
function reiniciar(){
    clearInterval(id);
    document.getElementById("hms").innerHTML="00:00:00";
    h=0;m=0;s=0;
    document.querySelector(".start").addEventListener("click",cronometrar);
}*/