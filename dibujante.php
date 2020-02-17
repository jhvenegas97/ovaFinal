<!DOCTYPE html>
<html>
<head>
    <title>Invasión Espacial!</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Press+Start+2P">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/crono.css">
    <link href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" rel="stylesheet">
    <link rel="icon" type="image/png" href="/ovaFinal/img/iconoMarciano.png"/>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
</head>

<body class="container-fluid squares-bg">
    <div align="center" class="row">
        <div class="col-md-12 col-xs-12">
            <h2 class="titulo">¡Invasión Espacial!</h2>
        </div>
        
    </div>
    <div class="row">
        <div align="center" class="col-lg-8 col-xs-12">
        <div class="cronometro">
                <div id="hms"></div>
            </div>
            <br>
            <div id="mallaCanvas" >
                <table id="pixelCanvas" class="flyItIn"></table>
            </div>
        </div>

        <div align="center" class="col-lg-4 col-xs-12">
            
            
            <div class="row">
                <div class="col-xs-6">
                    <div id="modo">
                        <button id="paintBtn" class="buttonIni btn-warning" title="Pintar pixeles" type="button">
                            <i class="fas fa-paint-brush paint"></i>
                        </button>
                        <button id="eraseBtn" class="buttonIni btn-warning" title="Borrar pixeles" type="button">
                            <i class="fas fa-eraser erase"></i>
                        </button>
                        
                    </div> <!--end mode div: for mode button listener -->
                    <h2>Modo: </h2><span id="vistaModo" class="paintOrErase"> Pintar</span>
                </div>
                <div class="col-xs-6">
                    <h3>Escoge un color:</h3>
            <h3><input type="color" id="selectorColor" value="#ff0000" title="Escoge el color para pintar"></h3>
                </div>
            </div>

            <form id="selectorTamaño" name="juego">
                <div class="btn-group">
                    <input class="buttonIni paint  btn-danger" type="submit" id="crearMalla" value="Empezar" name="enviarMalla" title="Crea la cuadricula.">
                <input class="buttonIni paint  btn-info " type="button" id="limpiarMalla" value="Limpiar" title="Borra los colores de la cuadriculara  para que puedas empezar otra vez.">
                <input class="buttonIni paint  btn-success " type="button" id="verificarMalla" value="Verificar" title="Verifica si el Pixel Art esta correcto.">
                <a href="/ovaPixelArt">
                <button  id="inicio" class="buttonIni paint" title="Inicio" type="button">
                    <i>Inicio</i>
                </button>
            </a>
                </div>
            </form>
            <br><br>
        </div>
    </div>
</body>
<script src="js/nuevo.js"></script>
<script src="js/crono.js"></script>
</body>
</html>
