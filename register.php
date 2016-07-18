<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script src="alertify/lib/alertify.min.js"></script>
    <link rel="stylesheet" href="alertify/themes/alertify.core.css" />
    <link rel="stylesheet" href="alertify/themes/alertify.default.css" />
    <script src= "jQuery/jquery-1.12.0.js"></script>
    <link rel="stylesheet" href="bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
    <link rel="stylesheet" href="bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="css/font-awesome.css">
    <link rel="stylesheet" href="estilos.css">
    <title>Daily Reminder</title>
  </head>
    <body>
      <div class="container text-center bg-primary ">
          <h1 class=>Register<h1>
      </div>
      <ul class= "container list-unstyled list-inline text-center">
          <li><a href ="index.php">Main</a></li>
          <li><a href ="contact.php">Contact us</a></li>
          <li><a href ="register.php">Register</a></li>
          <li><a href ="login.php">Log In</a></li>
      </ul>
    <div class="container text-center">
    <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF'])?>" method="POST" id = "form">
        <i class="fa fa-user fa-2x" aria-hidden="true" ></i><input type="text" class = "alejar" name ="usuario" placeholder="Enter your username"><br>
        <i class="fa fa-lock fa-2x" aria-hidden="true"></i><input type="password" class = "alejar" name ="clave" placeholder="Enter your password"><br>
        <input type="button" id="boton" class="btn btn-default" value = "Register"><br>
        <input type="checkbox" id="omg">I Accept the terms and conditions.
    </form>
    </div>
    <script>
     $(document).on('ready',function(){
        $('#boton').on('click',function(){
          if ($('#omg').prop('checked')){
          $('#form').submit();
          }else{
            alertify.alert("You have to accept the terms and conditions to continue");
          }
        });
    });
    </script>
    <?php
    require_once('init.php');
    $conexion=conectar();

    if (isset($_POST['usuario']) && $_POST['usuario']!="" &&
        isset($_POST['clave']) && $_POST['clave']!=""){
          $resultado=insertar($conexion,$_POST['usuario'],$_POST['clave']);
          $filasAfectadas=$resultado->rowCount();

          if ($filasAfectadas>0){
            echo "
            <script>
               alertify.alert('Register was sucessfull');
           </script>
             ";
          }elseif($filasAfectadas==0){
            echo "
            <script>
               alertify.alert('Register was unsucessfull somebody is already using that username');
           </script>
             ";
          } else{
           echo "";
          }
    }
    ?>
    </body>
  </html>
