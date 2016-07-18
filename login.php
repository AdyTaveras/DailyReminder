<html>
  <head>
    <meta charset="utf-8">
    <script src="alertify/lib/alertify.min.js"></script>
    <link rel="stylesheet" href="alertify/themes/alertify.core.css"/>
    <link rel="stylesheet" href="alertify/themes/alertify.default.css"/>
    <script src= "jQuery/jquery-1.12.0.js"></script>
    <link rel="stylesheet" href="bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
    <link rel="stylesheet" href="bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="css/font-awesome.css">
    <link rel="stylesheet" href="estilos.css">
    <title>Daily Reminder</title>
  </head>
   <body>
    <div class="container text-center bg-primary">
        <h1 class=>Log in<h1>
    </div>
    <ul class= "container list-unstyled list-inline  text-center">
        <li><a href ="index.php">Main</a></li>
        <li><a href ="contact.php">Contact us</a></li>
        <li><a href ="register.php">Register</a></li>
        <li><a href ="login.php">Log In</a></li>
    </ul>
   <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>" method="POST" id="logf">
     <div class = "container text-center">
        <i class="fa fa-user fa-2x" aria-hidden="true"></i><input type ="text" class = "alejar" name="usuario" placeholder="Enter your user"></br>
        <i class="fa fa-lock fa-2x" aria-hidden="true"></i><input type="password" class = "alejar" name="clave" placeholder="Enter your password"></br>
        <input type="submit" class="btn btn-success" name="boton" id="boton" value="Log in">
     </div>
     <?php
     session_start();
     require_once('init.php');
     $conexion=conectar();
     if (isset($_POST['usuario']) && $_POST['usuario']!="" &&
         isset($_POST['clave']) && $_POST['clave']!=""){
           $resultado=login($conexion,$_POST['usuario'],$_POST['clave']);
           $contador=0;
           $usuario="";
           foreach($resultado as $dato){
             $contador++;
             $usuario=$dato['usuario'];
             $id=$dato['idusuarios'];
           }
           if($contador==1){
           $_SESSION['usuario']=$usuario;
           $_SESSION['id_usuario']=$id;
           header("location:contenido.php");
           }else{
    ?>
  <script>
   $(document).on('ready',function(){
    alertify.alert("It seems like the information is wrong, please try again.");
   });
  </script>
   <?php
   }
 }
?>
   </body>
  </html>
