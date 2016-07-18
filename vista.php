<?php
session_start();
require_once('init.php');
$conexion=conectar();

 ?>
 <!DOCTYPE html>
<html>
 <head>
   <title>Notes view</title>
   <script src="alertify/lib/alertify.min.js"></script>
   <link rel="stylesheet" href="alertify/themes/alertify.core.css" />
   <link rel="stylesheet" href="alertify/themes/alertify.default.css" />
   <script src= "jQuery/jquery-1.12.0.js"></script>
   <link rel="stylesheet" href="bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
   <link rel="stylesheet" href="bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
   <link rel="stylesheet" href="bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
   <link rel="stylesheet" href="css/font-awesome.css">
    <link rel="stylesheet" href="estilost.css">
    <link rel="stylesheet" href="estilos2.css">
    <script>
      $(document).on('ready',function(){
        function mostrar(){
        $.get("tabla.php", function(data){
          $('#tabla').html(data);
        });
       }
       favorito = function (idnotas){
         var datos={
           'idnotas':idnotas,
           'accion':'favorito'
         };
          $.ajax(
            {
            url:'gestiones.php',
            type:'post',
            datatype:'json',
            data:datos,
            beforeSend:function()
            {

            }
          }
        ).done(function(respuesta){
          if (respuesta=='favorito-success'){
          alertify.alert("Nota Agregada a favoritos");
        }else if(respuesta=='favorito-faill'){
          alertify.alert("Error al marcarg como favoritos");
        }else{
          alertify.alert("Solo puedes guardar una nota como favorito ");

        }
      });
    };
    borrar = function(idnotas){
      alert(idnotas);
      var datos={
        'idnotas':idnotas,
        'accion':'borrar'
      };
      $.ajax(
        {
        url:'gestiones.php',
        type:'post',
        datatype:'json',
        data:datos,
        beforeSend:function()
        {

        }
      }
    ).done(function(respuesta){
      if (respuesta=='guardar-success'){
        alertify.alert("Note deleted");
      }else if(respuesta=='fail-guardar'){
        alertify.alert("Ocurrio un error deleted");
      }alertify.alert(respuesta);

    });
    }
   mostrar();
      });
   </script>
 </head>
  <body>
    <a href = "contenido.php" class="btn btn-default alejar2" >Home</a>
    <a href = "nfavorito.php" class="btn btn-warning alejar2" >View my favorites</a>

    <div class="container text-center table-responsive">
     <h1>Notes</h1>
     <table id="tabla" class = "table"></table>
   </div>
  </body>
</html>
