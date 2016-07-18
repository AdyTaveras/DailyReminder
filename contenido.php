<?php
session_start();
require_once('init.php');
$conexion=conectar();

 ?>
<html>
 <head>
   <title>Bienvenido</title>
   <script src="alertify/lib/alertify.min.js"></script>
   <link rel="stylesheet" href="alertify/themes/alertify.core.css" />
   <link rel="stylesheet" href="alertify/themes/alertify.default.css" />
   <script src= "jQuery/jquery-1.12.0.js"></script>
   <link rel="stylesheet" href="bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
   <link rel="stylesheet" href="bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
   <link rel="stylesheet" href="bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
   <link rel="stylesheet" href="css/font-awesome.css">
    <link rel="stylesheet" href="estilosc.css">
    <script>
      $(document).on('ready',function(){
        $('#btn').on('click',function(){
          var data=$($('#formulario')).serializeArray();
          if ($('#btn').html()=="Guardar Nota"){
            data.push({name:'accion',value:'guardar'});
          }
          $.ajax(
            {
              url:'gestiones.php',
              type:'post',
              datatype:'json',
              data:data,
              beforeSend: function()
              {

              }
            }
          )
          .done(function(respuesta){
          if (respuesta=="guardar-success"){
            alertify.alert('Nota guardada correctamente');
            $('#nota').html('');
          }else if(respuesta=="guardar-fail"){
            alertify.alert("Hubo un problema al guardar su nota mamaguevo");
          }else if(respuesta=="Error-0"){
            alertify.alert("Debe introducir una nota");
          }else{
            alertify.alert("Error no identificado");
          }
          console.log(respuesta);
        });
        });
      });

  </script>
 </head>
 <body>
   <div id="header ">
     <ul class="nav alejar2">
        <li><a href="">Welcome <?php echo $_SESSION['usuario']; ?></a>
         <ul>
            <li><a href="vista.php">My Notes</a>
            <li><a href="nfavorito.php">My Favorites</a>
            <li><a href="logout.php">Log out</a>
         </ul>
     </ul>
  </div>
 <h1 id ="titulo" style="position:absolute;left:0;"><?php echo $_SESSION['usuario']; ?> Notes</h1>
  <script>
    $(document).on('ready',function(){
       $('#titulo').animate({
          opacity : 0.5,
          left:100
      },500,function(){
         $('#titulo').animate({
           opacity : 100,
           left:20
          });
        });
     });
 </script>
 <div class ="container text-center"><br>
   <i  class="fa fa-sticky-note fa-3x" aria-hidden="true"></i> <h1>New note</h1>
   <form action ="#" method="POST" id = "formulario">
     <textarea class =" noresize form-control" id = "nota" name="nota"></textarea><br>
     <button id="btn" type="button" class="btn btn-success" name = "nota" >Guardar Nota</button>
   </form>
 </div>
 </body>
</html>
